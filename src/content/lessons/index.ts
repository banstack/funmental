import type { SubjectId } from '../../types'
import { reading } from '../reading'
import { science } from '../science'
import { mathLessons } from './math'
import { readingLessons } from './reading'
import { scienceLessons } from './science'
import type { Lesson } from './types'

export type { Example, Lesson, Topic } from './types'

const LESSONS: Record<SubjectId, Lesson[]> = { math: mathLessons, reading: readingLessons, science: scienceLessons }

export function lessonsFor(subject: SubjectId): Lesson[] {
  return LESSONS[subject]
}

export function getLesson(subject: SubjectId, tier: number): Lesson | undefined {
  return LESSONS[subject][tier]
}

/** Key vocabulary for a tier, shared with the practice question bank. */
export function vocabularyFor(subject: SubjectId, tier: number): [string, string][] {
  if (subject === 'reading') return reading[tier]?.terms ?? []
  if (subject === 'science') return science[tier]?.terms ?? []
  return []
}

export function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
