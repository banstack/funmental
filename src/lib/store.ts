import { useSyncExternalStore } from 'react'
import type { AppData, SessionRecord, SubjectId, SubjectProgress } from '../types'
import { applyAnswer, newProgress, type TierChange } from './leveling'

const KEY = 'funmental:v1'
const MAX_SESSIONS = 500

function emptyData(): AppData {
  return {
    version: 1,
    subjects: { math: newProgress(), reading: newProgress(), science: newProgress() },
    sessions: [],
    activeDays: [],
  }
}

function load(): AppData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyData()
    const parsed = JSON.parse(raw) as AppData
    const base = emptyData()
    return {
      ...base,
      ...parsed,
      subjects: { ...base.subjects, ...parsed.subjects },
    }
  } catch {
    return emptyData()
  }
}

let data: AppData = load()
const listeners = new Set<() => void>()

function commit(next: AppData) {
  data = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable (private mode, quota); keep in-memory state.
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAppData(): AppData {
  return useSyncExternalStore(subscribe, () => data)
}

export function getData(): AppData {
  return data
}

export function todayKey(d = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function updateSubject(subject: SubjectId, progress: SubjectProgress, extra: Partial<AppData> = {}) {
  commit({ ...data, ...extra, subjects: { ...data.subjects, [subject]: progress } })
}

export function recordAnswer(subject: SubjectId, correct: boolean): TierChange {
  const { progress, change } = applyAnswer(data.subjects[subject], correct)
  const today = todayKey()
  const activeDays = data.activeDays.includes(today) ? data.activeDays : [...data.activeDays, today]
  updateSubject(subject, progress, { activeDays })
  return change
}

export function setPlacement(subject: SubjectId, tier: number) {
  const prev = data.subjects[subject]
  updateSubject(subject, {
    ...prev,
    tier,
    placed: true,
    window: [],
    bestTier: Math.max(prev.placed ? prev.bestTier : 0, tier),
  })
}

export function addSession(session: SessionRecord) {
  commit({ ...data, sessions: [session, ...data.sessions].slice(0, MAX_SESSIONS) })
}

export function resetAll() {
  commit(emptyData())
}

/** Consecutive active days ending today (or yesterday, if not yet played today). */
export function streak(activeDays: string[]): number {
  const days = new Set(activeDays)
  const d = new Date()
  if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1)
  let count = 0
  while (days.has(todayKey(d))) {
    count++
    d.setDate(d.getDate() - 1)
  }
  return count
}
