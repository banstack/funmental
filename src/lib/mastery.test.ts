import { describe, expect, it } from 'vitest'
import { applyQuizResult, isPassing, MASTERY_PASS, MASTERY_QUESTIONS, masteredCount, type MasteryData } from './mastery'

const empty = (): MasteryData => ({ version: 1, grades: {} })

describe('grade mastery', () => {
  it('passes at 8 of 10', () => {
    expect(MASTERY_QUESTIONS).toBe(10)
    expect(MASTERY_PASS).toBe(8)
    expect(isPassing(7)).toBe(false)
    expect(isPassing(8)).toBe(true)
  })

  it('records attempts and best score without mastering on a fail', () => {
    const d = applyQuizResult(empty(), 'math', 3, 6, 100)
    expect(d.grades['math:3']).toEqual({ attempts: 1, bestScore: 6, lastScore: 6, masteredAt: undefined })
  })

  it('masters on the first passing attempt and never un-masters', () => {
    let d = applyQuizResult(empty(), 'reading', 5, 8, 100)
    expect(d.grades['reading:5'].masteredAt).toBe(100)
    d = applyQuizResult(d, 'reading', 5, 3, 200)
    expect(d.grades['reading:5']).toEqual({ attempts: 2, bestScore: 8, lastScore: 3, masteredAt: 100 })
    d = applyQuizResult(d, 'reading', 5, 10, 300)
    expect(d.grades['reading:5'].masteredAt).toBe(100)
    expect(d.grades['reading:5'].bestScore).toBe(10)
  })

  it('counts mastered grades per subject', () => {
    let d = empty()
    d = applyQuizResult(d, 'math', 0, 9)
    d = applyQuizResult(d, 'math', 1, 5)
    d = applyQuizResult(d, 'math', 2, 10)
    d = applyQuizResult(d, 'science', 0, 8)
    expect(masteredCount(d, 'math')).toBe(2)
    expect(masteredCount(d, 'science')).toBe(1)
    expect(masteredCount(d, 'reading')).toBe(0)
  })
})
