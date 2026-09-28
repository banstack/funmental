import { describe, expect, it } from 'vitest'
import type { SessionRecord } from '../types'
import { emptyData } from './data'
import type { MasteryData } from './mastery'
import { mergeAppData, mergeMastery } from './merge'

function session(id: string, startedAt: number, over: Partial<SessionRecord> = {}): SessionRecord {
  return { id, subject: 'math', mode: 'quiz', startedAt, endedAt: startedAt + 1000, answered: 10, correct: 6, tierStart: 3, tierEnd: 3, ...over }
}

describe('mergeAppData', () => {
  it('unions sessions, active days and badges without duplicates', () => {
    const a = emptyData(100)
    const b = emptyData(50)
    a.sessions = [session('s2', 200), session('s1', 100)]
    b.sessions = [session('s3', 300), session('s1', 100)]
    a.activeDays = ['2026-09-01', '2026-09-02']
    b.activeDays = ['2026-09-02', '2026-09-03']
    a.badges = { x: { earnedAt: 10 } }
    b.badges = { x: { earnedAt: 5 }, y: { earnedAt: 7 } }

    const m = mergeAppData(a, b)
    expect(m.sessions.map((s) => s.id)).toEqual(['s3', 's2', 's1'])
    expect(m.activeDays).toEqual(['2026-09-01', '2026-09-02', '2026-09-03'])
    expect(m.badges).toMatchObject({ x: { earnedAt: 5 }, y: { earnedAt: 7 } })
    expect(m.profile.createdAt).toBe(50)
  })

  it('keeps the higher level per subject and the earliest starting point', () => {
    const a = emptyData()
    const b = emptyData()
    a.subjects.math = { ...a.subjects.math, placed: true, tier: 9, bestTier: 9, answered: 40, correct: 30 }
    b.subjects.math = { ...b.subjects.math, placed: true, tier: 7, bestTier: 10, answered: 90, correct: 50 }
    b.subjects.reading = { ...b.subjects.reading, placed: true, tier: 3, bestTier: 3 }
    a.placements = { math: { tier: 8, at: 500 } }
    b.placements = { math: { tier: 6, at: 100 }, reading: { tier: 3, at: 200 } }

    const m = mergeAppData(a, b)
    expect(m.subjects.math.tier).toBe(9)
    expect(m.subjects.math.bestTier).toBe(10)
    expect(m.subjects.reading).toMatchObject({ placed: true, tier: 3 })
    expect(m.subjects.science.placed).toBe(false)
    expect(m.placements.math).toEqual({ tier: 6, at: 100 })
    expect(m.placements.reading).toEqual({ tier: 3, at: 200 })
  })

  it("never counts the same play twice, but doesn't lose play either", () => {
    const a = emptyData()
    const b = emptyData()
    const shared = session('s1', 100, { answered: 10, correct: 6 })
    a.sessions = [shared, session('a1', 200, { answered: 5, correct: 5 })]
    b.sessions = [shared, session('b1', 300, { answered: 8, correct: 2 })]
    a.subjects.math = { ...a.subjects.math, placed: true, tier: 4, answered: 15, correct: 11 }
    b.subjects.math = { ...b.subjects.math, placed: true, tier: 4, answered: 18, correct: 8 }

    const m = mergeAppData(a, b)
    expect(m.subjects.math.answered).toBe(23) // 10 + 5 + 8, not 15 + 18
    expect(m.subjects.math.correct).toBe(13)
  })

  it('awards badges the merged data now qualifies for', () => {
    const a = emptyData()
    const b = emptyData()
    b.subjects.science = { ...b.subjects.science, placed: true, tier: 5 }
    b.placements = { science: { tier: 5, at: 42 } }
    expect(mergeAppData(a, b).badges['placement-science']).toEqual({ earnedAt: 42 })
  })

  it('is stable when merging a copy with itself', () => {
    const a = emptyData(1)
    a.sessions = [session('s1', 100)]
    a.subjects.math = { ...a.subjects.math, placed: true, tier: 2, answered: 10, correct: 6 }
    a.placements = { math: { tier: 2, at: 1 } }
    const once = mergeAppData(a, a)
    expect(mergeAppData(once, once)).toEqual(once)
  })
})

describe('mergeMastery', () => {
  it('keeps best scores and the first mastery date', () => {
    const a: MasteryData = { version: 1, grades: { 'math:0': { attempts: 3, bestScore: 7, lastScore: 7 }, 'math:1': { attempts: 1, bestScore: 9, lastScore: 9, masteredAt: 50 } } }
    const b: MasteryData = { version: 1, grades: { 'math:0': { attempts: 1, bestScore: 8, lastScore: 8, masteredAt: 90 }, 'reading:2': { attempts: 1, bestScore: 4, lastScore: 4 } } }
    const m = mergeMastery(a, b)
    expect(m.grades['math:0']).toEqual({ attempts: 3, bestScore: 8, lastScore: 7, masteredAt: 90 })
    expect(m.grades['math:1'].masteredAt).toBe(50)
    expect(m.grades['reading:2'].bestScore).toBe(4)
  })
})
