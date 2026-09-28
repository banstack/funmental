import { useSyncExternalStore } from 'react'
import type { AppData, SessionRecord, SubjectId, SubjectProgress } from '../types'
import { newlyEarned } from './badges'
import { emptyData, migrate } from './data'
import { applyAnswer, type TierChange } from './leveling'
import { todayKey } from './stats'

const KEY = 'funmental:v1'
const MAX_SESSIONS = 500

function load(): AppData {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? migrate(JSON.parse(raw)) : emptyData()
  } catch {
    return emptyData()
  }
}

let data: AppData = load()
const listeners = new Set<() => void>()

// Badges earned during this visit, waiting to be shown as toasts.
let toasts: string[] = []
const toastListeners = new Set<() => void>()

/**
 * Saves the next state, awarding any badges it now qualifies for. Pass
 * `announce: false` when the caller shows the new badges itself.
 */
function commit(next: AppData, { announce = true } = {}): string[] {
  const awards = newlyEarned(next)
  const earned = Object.keys(awards)
  if (earned.length) next = { ...next, badges: { ...next.badges, ...awards } }
  data = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable (private mode, quota); keep in-memory state.
  }
  listeners.forEach((l) => l())
  if (announce && earned.length) {
    toasts = [...toasts, ...earned]
    toastListeners.forEach((l) => l())
  }
  return earned
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

/** Notified after every change; used by cloud sync. */
export const subscribeAppData = subscribe

/** Replace local data with a merged copy from sync. Badges earned by the merge aren't announced. */
export function replaceAppData(next: AppData) {
  commit(next, { announce: false })
}

export function useBadgeToasts(): string[] {
  return useSyncExternalStore(
    (l) => {
      toastListeners.add(l)
      return () => toastListeners.delete(l)
    },
    () => toasts,
  )
}

export function dismissBadgeToast(id: string) {
  toasts = toasts.filter((t) => t !== id)
  toastListeners.forEach((l) => l())
}

function updateSubject(subject: SubjectId, progress: SubjectProgress, extra: Partial<AppData> = {}) {
  return commit({ ...data, ...extra, subjects: { ...data.subjects, [subject]: progress } })
}

export function recordAnswer(subject: SubjectId, correct: boolean): TierChange {
  const { progress, change } = applyAnswer(data.subjects[subject], correct)
  const today = todayKey()
  const activeDays = data.activeDays.includes(today) ? data.activeDays : [...data.activeDays, today]
  updateSubject(subject, progress, { activeDays })
  return change
}

/**
 * Sets the subject's level from a placement test. The first placement is kept
 * as the subject's starting point; retakes move the level but not the start.
 * Returns ids of badges earned, which the caller is expected to show.
 */
export function setPlacement(subject: SubjectId, tier: number): string[] {
  const prev = data.subjects[subject]
  const placements = data.placements[subject] ? data.placements : { ...data.placements, [subject]: { tier, at: Date.now() } }
  return commit(
    {
      ...data,
      placements,
      subjects: {
        ...data.subjects,
        [subject]: { ...prev, tier, placed: true, window: [], bestTier: Math.max(prev.placed ? prev.bestTier : 0, tier) },
      },
    },
    { announce: false },
  )
}

export function addSession(session: SessionRecord) {
  commit({ ...data, sessions: [session, ...data.sessions].slice(0, MAX_SESSIONS) })
}

export function setProfileName(name: string) {
  commit({ ...data, profile: { ...data.profile, name: name.trim().slice(0, 40) } })
}

export function resetAll() {
  toasts = []
  commit(emptyData(), { announce: false })
}
