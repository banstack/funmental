import { describe, expect, it } from 'vitest'
import type { SessionRecord } from '../types'
import { BADGES, newlyEarned } from './badges'
import { emptyData, migrate } from './data'
import { answeredInLastDays, longestStreak, personalBest, streak } from './stats'

const DAY = 86_400_000

function session(over: Partial<SessionRecord>): SessionRecord {
  return {
    id: Math.random().toString(36),
    subject: 'math',
    mode: 'quiz',
    startedAt: 0,
    endedAt: 60_000,
    answered: 10,
    correct: 5,
    tierStart: 3,
    tierEnd: 3,
    ...over,
  }
}

describe('badges', () => {
  it('have unique ids', () => {
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(BADGES.length)
  })

  it('awards a placement badge dated to the placement, once', () => {
    const data = emptyData()
    expect(newlyEarned(data)).toEqual({})
    data.placements.math = { tier: 8, at: 1234 }
    expect(newlyEarned(data)).toEqual({ 'placement-math': { earnedAt: 1234 } })
    data.badges['placement-math'] = { earnedAt: 1234 }
    expect(newlyEarned(data)).toEqual({})
  })

  it('placement badge describes where the subject began', () => {
    const data = emptyData()
    data.placements.reading = { tier: 12, at: 0 }
    const badge = BADGES.find((b) => b.id === 'placement-reading')!
    expect(badge.detail!(data)).toBe('Began at College I · College')
  })
})

describe('migrating older saves', () => {
  it('fills in new fields for an empty save', () => {
    const data = migrate({})
    expect(data.placements).toEqual({})
    expect(data.badges).toEqual({})
    expect(data.profile.name).toBe('')
  })

  it('recovers starting tiers from the oldest session and awards badges retroactively', () => {
    const base = emptyData()
    const saved = {
      ...base,
      subjects: {
        ...base.subjects,
        math: { ...base.subjects.math, placed: true, tier: 10 },
        reading: { ...base.subjects.reading, placed: true, tier: 4 },
      },
      sessions: [
        session({ subject: 'math', startedAt: 5 * DAY, tierStart: 9 }),
        session({ subject: 'math', startedAt: 2 * DAY, tierStart: 7 }),
      ],
    } as Partial<typeof base>
    delete saved.placements
    delete saved.badges
    delete saved.profile

    const data = migrate(saved, 10 * DAY)
    expect(data.placements.math).toEqual({ tier: 7, at: 2 * DAY })
    // No sessions for reading, so its current tier is the best guess.
    expect(data.placements.reading?.tier).toBe(4)
    expect(data.placements.science).toBeUndefined()
    expect(data.badges['placement-math']).toEqual({ earnedAt: 2 * DAY })
    expect(data.badges['placement-reading']).toBeDefined()
    expect(data.profile.createdAt).toBe(2 * DAY)
  })

  it('never overwrites an existing placement record', () => {
    const base = emptyData()
    const data = migrate({
      ...base,
      subjects: { ...base.subjects, math: { ...base.subjects.math, placed: true, tier: 11 } },
      placements: { math: { tier: 2, at: 99 } },
    })
    expect(data.placements.math).toEqual({ tier: 2, at: 99 })
  })
})

describe('stats', () => {
  const keys = (...offsets: number[]) =>
    offsets.map((o) => {
      const d = new Date(2026, 8, 28 - o, 12)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    })
  const now = new Date(2026, 8, 28, 15)

  it('counts the current streak through today or yesterday', () => {
    expect(streak(keys(0, 1, 2, 5), now)).toBe(3)
    expect(streak(keys(1, 2), now)).toBe(2)
    expect(streak(keys(2, 3), now)).toBe(0)
  })

  it('finds the longest streak anywhere in history, across month boundaries', () => {
    expect(longestStreak(keys(0, 1, 10, 11, 12, 13, 30, 31))).toBe(4)
    expect(longestStreak(keys(27, 28, 29))).toBe(3) // Aug 30 – Sep 1
    expect(longestStreak([])).toBe(0)
  })

  it('picks personal bests by correct count for rapid fire and accuracy otherwise', () => {
    const sessions = [
      session({ mode: 'rapid', correct: 12, answered: 20 }),
      session({ mode: 'rapid', correct: 15, answered: 30 }),
      session({ mode: 'quiz', correct: 9, answered: 10 }),
      session({ mode: 'quiz', correct: 4, answered: 4 }),
    ]
    expect(personalBest(sessions, 'math', 'rapid')?.correct).toBe(15)
    expect(personalBest(sessions, 'math', 'quiz')?.correct).toBe(4)
    expect(personalBest(sessions, 'reading', 'quiz')).toBeNull()
  })

  it('sums questions answered over the last 7 days, including today', () => {
    const now = new Date(2026, 8, 28, 15)
    const at = (day: number, hour = 10) => new Date(2026, 8, day, hour).getTime()
    const sessions = [
      session({ startedAt: at(28), answered: 10 }),
      session({ startedAt: at(22, 0), answered: 5 }), // 6 days ago, just after midnight
      session({ startedAt: at(21, 23), answered: 99 }), // 7 days ago: outside the window
    ]
    expect(answeredInLastDays(sessions, 7, now)).toBe(15)
  })
})
