import { describe, expect, it } from 'vitest'
import {
  advancePlacement,
  applyAnswer,
  newProgress,
  placementDone,
  placementResult,
  startPlacement,
  type PlacementState,
} from './leveling'
import { MAX_TIER } from './tiers'
import type { SubjectProgress } from '../types'

function answerMany(p: SubjectProgress, results: boolean[]) {
  const changes: number[] = []
  for (const r of results) {
    const out = applyAnswer(p, r)
    p = out.progress
    changes.push(out.change)
  }
  return { p, changes }
}

describe('adaptive leveling', () => {
  it('promotes after 8 correct within the last 10', () => {
    const start = { ...newProgress(), tier: 3, placed: true }
    const { p, changes } = answerMany(start, [true, false, true, true, false, true, true, true, true, true])
    expect(changes.at(-1)).toBe(1)
    expect(p.tier).toBe(4)
    expect(p.window).toEqual([])
    expect(p.bestTier).toBe(4)
  })

  it('demotes after 6 wrong within the last 10', () => {
    const start = { ...newProgress(), tier: 5, bestTier: 5, placed: true }
    const { p } = answerMany(start, Array(6).fill(false))
    expect(p.tier).toBe(4)
    expect(p.bestTier).toBe(5)
  })

  it('never leaves the tier range', () => {
    const top = answerMany({ ...newProgress(), tier: MAX_TIER }, Array(20).fill(true)).p
    expect(top.tier).toBe(MAX_TIER)
    const bottom = answerMany(newProgress(), Array(20).fill(false)).p
    expect(bottom.tier).toBe(0)
  })
})

describe('placement', () => {
  const run = (answers: (tier: number) => boolean) => {
    let s: PlacementState = startPlacement()
    while (!placementDone(s)) s = advancePlacement(s, answers(s.tier))
    return placementResult(s)
  }

  it('places a perfect scorer at the top and a zero scorer at the bottom', () => {
    expect(run(() => true)).toBe(MAX_TIER)
    expect(run(() => false)).toBe(0)
  })

  it('lands near the true ability level', () => {
    for (const ability of [2, 6, 10]) {
      expect(Math.abs(run((t) => t <= ability) - ability)).toBeLessThanOrEqual(1)
    }
  })
})
