import type { AppData, Mode, SessionRecord, SubjectId } from '../types'

export function todayKey(d = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** Consecutive active days ending today (or yesterday, if not yet played today). */
export function streak(activeDays: string[], now = new Date()): number {
  const days = new Set(activeDays)
  const d = new Date(now)
  if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1)
  let count = 0
  while (days.has(todayKey(d))) {
    count++
    d.setDate(d.getDate() - 1)
  }
  return count
}

export function longestStreak(activeDays: string[]): number {
  const days = new Set(activeDays)
  let best = 0
  for (const key of days) {
    const d = new Date(`${key}T12:00:00`)
    d.setDate(d.getDate() - 1)
    if (days.has(todayKey(d))) continue // not the start of a run
    let run = 0
    const cur = new Date(`${key}T12:00:00`)
    while (days.has(todayKey(cur))) {
      run++
      cur.setDate(cur.getDate() + 1)
    }
    best = Math.max(best, run)
  }
  return best
}

export interface Totals {
  answered: number
  correct: number
  accuracy: number
  sessions: number
  minutes: number
}

export function totals(data: AppData): Totals {
  const subjects = Object.values(data.subjects)
  const answered = subjects.reduce((s, p) => s + p.answered, 0)
  const correct = subjects.reduce((s, p) => s + p.correct, 0)
  const ms = data.sessions.reduce((s, x) => s + (x.endedAt - x.startedAt), 0)
  return {
    answered,
    correct,
    accuracy: answered ? correct / answered : 0,
    sessions: data.sessions.length,
    minutes: Math.round(ms / 60000),
  }
}

/** Best single session per subject and mode: most correct for rapid fire, best accuracy otherwise. */
export function personalBest(sessions: SessionRecord[], subject: SubjectId, mode: Mode): SessionRecord | null {
  let best: SessionRecord | null = null
  for (const s of sessions) {
    if (s.subject !== subject || s.mode !== mode || s.answered === 0) continue
    if (!best) best = s
    else if (mode === 'rapid' ? s.correct > best.correct : s.correct / s.answered > best.correct / best.answered) best = s
  }
  return best
}

/** Questions answered per local day, keyed YYYY-MM-DD. */
export function answeredByDay(sessions: SessionRecord[]): Map<string, number> {
  const out = new Map<string, number>()
  for (const s of sessions) {
    const key = todayKey(new Date(s.startedAt))
    out.set(key, (out.get(key) ?? 0) + s.answered)
  }
  return out
}
