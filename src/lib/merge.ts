import type { AppData, SubjectId, SubjectProgress } from '../types'
import { migrate } from './data'
import type { GradeMastery, MasteryData } from './mastery'

const MAX_SESSIONS = 500

function pickProgress(a: SubjectProgress, b: SubjectProgress): SubjectProgress {
  if (!a.placed && b.placed) return b
  if (!b.placed) return a
  // Prefer the higher level; on a tie, the copy that has seen more play.
  const pick = a.tier !== b.tier ? (a.tier > b.tier ? a : b) : a.answered >= b.answered ? a : b
  return { ...pick, placed: true, bestTier: Math.max(a.bestTier, b.bestTier) }
}

function earliest<T extends { at?: number; earnedAt?: number }>(a: T | undefined, b: T | undefined, key: 'at' | 'earnedAt'): T | undefined {
  if (!a) return b
  if (!b) return a
  return (b[key] ?? Infinity) < (a[key] ?? Infinity) ? b : a
}

/**
 * Combines two copies of training progress (e.g. this browser and the account)
 * without losing anything: sessions, active days and badges are unioned, levels
 * keep the higher copy, and starting points keep the earliest placement.
 */
export function mergeAppData(local: AppData, remote: AppData): AppData {
  const subjects = { ...local.subjects }
  for (const id of Object.keys(subjects) as SubjectId[]) {
    subjects[id] = pickProgress(local.subjects[id], remote.subjects[id] ?? local.subjects[id])
  }

  const placements: AppData['placements'] = {}
  for (const id of new Set([...Object.keys(local.placements), ...Object.keys(remote.placements)]) as Set<SubjectId>) {
    placements[id] = earliest(local.placements[id], remote.placements[id], 'at')
  }

  const badges: AppData['badges'] = {}
  for (const id of new Set([...Object.keys(local.badges), ...Object.keys(remote.badges)])) {
    badges[id] = earliest(local.badges[id], remote.badges[id], 'earnedAt')!
  }

  const byId = new Map([...remote.sessions, ...local.sessions].map((s) => [s.id, s]))
  const sessions = [...byId.values()].sort((x, y) => y.startedAt - x.startedAt).slice(0, MAX_SESSIONS)

  // Lifetime counts can't be summed (both copies may include the same play), so take the
  // larger of the chosen copy and what the merged session history adds up to.
  for (const id of Object.keys(subjects) as SubjectId[]) {
    const mine = sessions.filter((s) => s.subject === id)
    const answered = mine.reduce((n, s) => n + s.answered, 0)
    const correct = mine.reduce((n, s) => n + s.correct, 0)
    subjects[id] = { ...subjects[id], answered: Math.max(subjects[id].answered, answered), correct: Math.max(subjects[id].correct, correct) }
  }

  return migrate({
    version: 1,
    profile: {
      name: local.profile.name || remote.profile.name,
      createdAt: Math.min(local.profile.createdAt, remote.profile.createdAt),
    },
    subjects,
    placements,
    badges,
    sessions,
    activeDays: [...new Set([...local.activeDays, ...remote.activeDays])].sort(),
  })
}

function mergeGrade(a: GradeMastery | undefined, b: GradeMastery | undefined): GradeMastery {
  if (!a) return b!
  if (!b) return a
  const mastered = [a.masteredAt, b.masteredAt].filter((t): t is number => t !== undefined)
  return {
    attempts: Math.max(a.attempts, b.attempts),
    bestScore: Math.max(a.bestScore, b.bestScore),
    lastScore: (a.attempts >= b.attempts ? a : b).lastScore,
    masteredAt: mastered.length ? Math.min(...mastered) : undefined,
  }
}

/** Mastery is never lost: best scores and attempts take the max, first mastery date wins. */
export function mergeMastery(local: MasteryData, remote: MasteryData): MasteryData {
  const grades: MasteryData['grades'] = {}
  for (const key of new Set([...Object.keys(local.grades), ...Object.keys(remote.grades)])) {
    grades[key] = mergeGrade(local.grades[key], remote.grades[key])
  }
  return { version: 1, grades }
}
