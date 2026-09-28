import type { SubjectProgress } from '../types'
import { MAX_TIER } from './tiers'

/** How many recent answers at the current tier are considered. */
export const WINDOW = 10
/** Correct answers within the window needed to move up a tier. */
export const PROMOTE_AT = 8
/** Wrong answers within the window that move you down a tier. */
export const DEMOTE_AT = 6

export type TierChange = -1 | 0 | 1

export function newProgress(): SubjectProgress {
  return { tier: 0, placed: false, window: [], bestTier: 0, answered: 0, correct: 0 }
}

export function applyAnswer(
  p: SubjectProgress,
  correct: boolean,
): { progress: SubjectProgress; change: TierChange } {
  const window = [...p.window, correct].slice(-WINDOW)
  const next: SubjectProgress = {
    ...p,
    window,
    answered: p.answered + 1,
    correct: p.correct + (correct ? 1 : 0),
  }
  const rights = window.filter(Boolean).length
  const wrongs = window.length - rights

  let change: TierChange = 0
  if (rights >= PROMOTE_AT && p.tier < MAX_TIER) change = 1
  else if (wrongs >= DEMOTE_AT && p.tier > 0) change = -1

  if (change !== 0) {
    next.tier = p.tier + change
    next.window = []
    next.bestTier = Math.max(p.bestTier, next.tier)
  }
  return { progress: next, change }
}

/** 0..1 progress toward the next tier. */
export function mastery(p: SubjectProgress): number {
  if (p.tier >= MAX_TIER && p.window.filter(Boolean).length >= PROMOTE_AT) return 1
  return Math.min(1, p.window.filter(Boolean).length / PROMOTE_AT)
}

// Placement uses a staircase: jump by `step` tiers after each answer,
// halving the step each time, then settle on the average of the last few tiers.
export const PLACEMENT_QUESTIONS = 8
const PLACEMENT_START = 7
const PLACEMENT_STEP = 4

export interface PlacementState {
  tier: number
  step: number
  asked: number[]
}

export function startPlacement(): PlacementState {
  return { tier: PLACEMENT_START, step: PLACEMENT_STEP, asked: [] }
}

export function advancePlacement(s: PlacementState, correct: boolean): PlacementState {
  const tier = Math.max(0, Math.min(MAX_TIER, s.tier + (correct ? s.step : -s.step)))
  return { tier, step: Math.max(1, Math.floor(s.step / 2)), asked: [...s.asked, s.tier] }
}

export function placementDone(s: PlacementState): boolean {
  return s.asked.length >= PLACEMENT_QUESTIONS
}

export function placementResult(s: PlacementState): number {
  const recent = [...s.asked.slice(-3), s.tier]
  return Math.round(recent.reduce((a, b) => a + b, 0) / recent.length)
}
