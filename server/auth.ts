import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { Db } from './db.ts'

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>

const KEY_LENGTH = 64
export const SESSION_DAYS = 30

/** "scrypt$<salt hex>$<hash hex>" */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password, salt, KEY_LENGTH)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, hashHex] = stored.split('$')
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  const actual = await scryptAsync(password, Buffer.from(saltHex, 'hex'), expected.length)
  return timingSafeEqual(actual, expected)
}

/** Session tokens are random; only their SHA-256 is stored, so a DB leak can't be replayed. */
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export async function createSession(db: Db, userId: string): Promise<string> {
  const token = randomBytes(32).toString('base64url')
  await db.query(`INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, now() + make_interval(days => $3))`, [
    hashToken(token),
    userId,
    SESSION_DAYS,
  ])
  return token
}

export interface SessionUser {
  id: string
  email: string
}

export async function userForSession(db: Db, token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null
  const { rows } = await db.query<SessionUser>(
    `SELECT u.id, u.email FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [hashToken(token)],
  )
  return rows[0] ?? null
}

export async function deleteSession(db: Db, token: string | undefined) {
  if (token) await db.query('DELETE FROM sessions WHERE token_hash = $1', [hashToken(token)])
}

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null
  const e = email.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254 ? e : null
}

export const MIN_PASSWORD = 8
export const MAX_PASSWORD = 200

/** Fixed-window limiter per key (e.g. IP), kept in memory; fine for a single instance. */
export function rateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>()
  return (key: string, now = Date.now()): boolean => {
    if (hits.size > 10_000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k)
    const entry = hits.get(key)
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      return true
    }
    entry.count++
    return entry.count <= limit
  }
}
