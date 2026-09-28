import { describe, expect, it } from 'vitest'
import { checkInput, equivalent, parseNum } from '../lib/answers'
import { TIERS } from '../lib/tiers'
import type { Context, Question, SubjectId } from '../types'
import { nextQuestion } from '.'
import { reading } from './reading'
import { science } from './science'

const SUBJECTS: SubjectId[] = ['math', 'reading', 'science']
const CONTEXTS: Context[] = ['rapid', 'quiz', 'puzzle', 'placement']

function validate(q: Question) {
  expect(q.prompt.length).toBeGreaterThan(0)
  switch (q.kind) {
    case 'choice': {
      expect(q.choices.length).toBeGreaterThanOrEqual(3)
      expect(q.answerIndex).toBeGreaterThanOrEqual(0)
      // No two choices may be equivalent, or the question is ambiguous.
      for (let i = 0; i < q.choices.length; i++)
        for (let j = i + 1; j < q.choices.length; j++) expect(equivalent(q.choices[i], q.choices[j])).toBe(false)
      break
    }
    case 'input':
      expect(checkInput(q.answer, q.answer)).toBe(true)
      break
    case 'match':
      expect(q.pairs.length).toBe(4)
      expect(new Set(q.pairs.map(([l]) => l)).size).toBe(4)
      expect(new Set(q.pairs.map(([, r]) => r)).size).toBe(4)
      break
    case 'order':
      expect(q.items.length).toBeGreaterThanOrEqual(3)
      expect(new Set(q.items).size).toBe(q.items.length)
      break
    case 'blank':
      expect(q.sentence).toContain('___')
      expect(q.options).toContain(q.answer)
      expect(new Set(q.options).size).toBe(q.options.length)
      break
  }
}

describe('question generation', () => {
  for (const subject of SUBJECTS) {
    for (const tier of TIERS) {
      it(`${subject} tier ${tier} produces valid questions in every context`, () => {
        for (const context of CONTEXTS) {
          for (let i = 0; i < 60; i++) validate(nextQuestion(subject, tier, context))
        }
      })
    }
  }

  it('every tier has a bank for reading and science', () => {
    expect(reading).toHaveLength(TIERS.length)
    expect(science).toHaveLength(TIERS.length)
    for (const bank of [...reading, ...science]) {
      expect(bank.mcq.length).toBeGreaterThanOrEqual(4)
      expect(bank.terms.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('cloze sentences contain a blank', () => {
    for (const bank of reading) for (const [sentence] of bank.cloze ?? []) expect(sentence).toContain('___')
  })
})

describe('answer checking', () => {
  it('parses numbers and fractions', () => {
    expect(parseNum('3/4')).toBe(0.75)
    expect(parseNum(' -12 ')).toBe(-12)
    expect(parseNum('1,000')).toBe(1000)
    expect(parseNum('abc')).toBeNull()
  })

  it('accepts equivalent forms', () => {
    expect(checkInput('0.75', '3/4')).toBe(true)
    expect(checkInput('6/8', '3/4')).toBe(true)
    expect(checkInput('49 pi', '49π')).toBe(true)
    expect(checkInput('−5', '-5')).toBe(true)
    expect(checkInput('5', '-5')).toBe(false)
    expect(checkInput('', '0')).toBe(false)
  })
})
