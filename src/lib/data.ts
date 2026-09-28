import type { AppData, SubjectId } from '../types'
import { newlyEarned } from './badges'
import { newProgress } from './leveling'

export function emptyData(now = Date.now()): AppData {
  return {
    version: 1,
    profile: { name: '', createdAt: now },
    subjects: { math: newProgress(), reading: newProgress(), science: newProgress() },
    placements: {},
    badges: {},
    sessions: [],
    activeDays: [],
  }
}

/**
 * Fills in fields added after a user's data was first saved. Older saves have no
 * placement records, so each placed subject's start is recovered from its oldest
 * session, falling back to the current tier.
 */
export function migrate(saved: Partial<AppData>, now = Date.now()): AppData {
  const sessions = saved.sessions ?? []
  const oldest = sessions.reduce((min, s) => Math.min(min, s.startedAt), now)
  const base = emptyData(oldest)
  const data: AppData = {
    ...base,
    ...saved,
    profile: { ...base.profile, ...saved.profile },
    subjects: { ...base.subjects, ...saved.subjects },
    placements: { ...saved.placements },
    badges: { ...saved.badges },
    sessions,
    activeDays: saved.activeDays ?? [],
  }

  for (const id of Object.keys(data.subjects) as SubjectId[]) {
    const p = data.subjects[id]
    if (!p.placed || data.placements[id]) continue
    const first = sessions.filter((s) => s.subject === id).sort((a, b) => a.startedAt - b.startedAt)[0]
    data.placements[id] = first ? { tier: first.tierStart, at: first.startedAt } : { tier: p.tier, at: data.profile.createdAt }
  }

  data.badges = { ...data.badges, ...newlyEarned(data, now) }
  return data
}
