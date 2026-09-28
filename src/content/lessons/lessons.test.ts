import { describe, expect, it } from 'vitest'
import { parseTierSlug, TIERS, tierSlug } from '../../lib/tiers'
import type { SubjectId } from '../../types'
import { lessonsFor, slug, vocabularyFor } from '.'

const SUBJECTS: SubjectId[] = ['math', 'reading', 'science']

describe('study guide lessons', () => {
  for (const subject of SUBJECTS) {
    it(`${subject} has a lesson for every tier`, () => {
      expect(lessonsFor(subject)).toHaveLength(TIERS.length)
    })

    it(`${subject} lessons have unique, non-reserved section ids`, () => {
      for (const lesson of lessonsFor(subject)) {
        expect(lesson.title.length).toBeGreaterThan(0)
        expect(lesson.topics.length).toBeGreaterThanOrEqual(3)
        const ids = lesson.topics.map((t) => slug(t.title))
        expect(new Set(ids).size).toBe(ids.length)
        for (const id of ids) expect(['key-formulas', 'key-vocabulary', 'practice']).not.toContain(id)
        for (const t of lesson.topics) expect(t.body.length).toBeGreaterThan(0)
      }
    })
  }

  it('reading and science pages share vocabulary with the practice bank', () => {
    for (const tier of TIERS) {
      expect(vocabularyFor('reading', tier).length).toBeGreaterThan(0)
      expect(vocabularyFor('science', tier).length).toBeGreaterThan(0)
    }
  })
})

describe('tier slugs', () => {
  it('round-trips every tier', () => {
    for (const tier of TIERS) expect(parseTierSlug(tierSlug(tier))).toBe(tier)
  })

  it('rejects out-of-range slugs', () => {
    for (const bad of ['grade-0', 'grade-13', 'college-0', 'college-4', 'level-3', undefined]) expect(parseTierSlug(bad)).toBeNull()
  })
})
