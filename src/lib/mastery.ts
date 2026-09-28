import { useSyncExternalStore } from 'react'
import type { SubjectId } from '../types'

/**
 * Grade mastery quizzes on /learn. Deliberately separate from training: this
 * has its own storage key and never touches levels, sessions, stats or badges.
 */

export const MASTERY_QUESTIONS = 10
export const MASTERY_PASS = 8

export interface GradeMastery {
  attempts: number
  bestScore: number
  lastScore: number
  /** Set the first time the grade is passed; mastery is never lost. */
  masteredAt?: number
}

export interface MasteryData {
  version: 1
  /** Keyed by `${subject}:${tier}`. */
  grades: Record<string, GradeMastery>
}

const KEY = 'funmental:learn:v1'

export const masteryKey = (subject: SubjectId, tier: number) => `${subject}:${tier}`

export function isPassing(score: number): boolean {
  return score >= MASTERY_PASS
}

/** Pure update for one finished quiz. */
export function applyQuizResult(data: MasteryData, subject: SubjectId, tier: number, score: number, now = Date.now()): MasteryData {
  const key = masteryKey(subject, tier)
  const prev = data.grades[key]
  const next: GradeMastery = {
    attempts: (prev?.attempts ?? 0) + 1,
    bestScore: Math.max(prev?.bestScore ?? 0, score),
    lastScore: score,
    masteredAt: prev?.masteredAt ?? (isPassing(score) ? now : undefined),
  }
  return { ...data, grades: { ...data.grades, [key]: next } }
}

export function masteredCount(data: MasteryData, subject: SubjectId): number {
  return Object.entries(data.grades).filter(([k, g]) => k.startsWith(`${subject}:`) && g.masteredAt).length
}

function empty(): MasteryData {
  return { version: 1, grades: {} }
}

function load(): MasteryData {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...empty(), ...JSON.parse(raw) } : empty()
  } catch {
    return empty()
  }
}

let data = load()
const listeners = new Set<() => void>()

function commit(next: MasteryData) {
  data = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable; keep in-memory state.
  }
  listeners.forEach((l) => l())
}

export function useMastery(): MasteryData {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => data,
  )
}

export function recordQuizResult(subject: SubjectId, tier: number, score: number) {
  commit(applyQuizResult(data, subject, tier, score))
}

export function resetMastery(subject: SubjectId) {
  const grades = Object.fromEntries(Object.entries(data.grades).filter(([k]) => !k.startsWith(`${subject}:`)))
  commit({ ...data, grades })
}
