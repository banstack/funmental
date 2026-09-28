import type { Mode, SubjectId } from '../types'
import { tierSlug } from './tiers'

export interface SubjectMeta {
  id: SubjectId
  name: string
  tagline: string
  glyph: string
}

export const SUBJECTS: SubjectMeta[] = [
  { id: 'math', name: 'Math', tagline: 'Arithmetic to calculus', glyph: 'π' },
  { id: 'reading', name: 'Reading', tagline: 'Vocabulary, grammar & rhetoric', glyph: 'Aa' },
  { id: 'science', name: 'Science', tagline: 'Life, earth & physical science', glyph: '⚛︎' },
]

export const subjectMeta = (id: SubjectId) => SUBJECTS.find((s) => s.id === id)!

export const isSubject = (s: string | undefined): s is SubjectId => SUBJECTS.some((m) => m.id === s)

export interface ModeMeta {
  id: Mode
  name: string
  blurb: string
  /** Questions per session; rapid fire is timed instead. */
  length?: number
  seconds?: number
}

export const MODES: ModeMeta[] = [
  { id: 'rapid', name: 'Rapid Fire', blurb: '60 seconds. Answer as many as you can.', seconds: 60 },
  { id: 'quiz', name: 'Quiz', blurb: '10 questions, no clock. Accuracy is what counts.', length: 10 },
  { id: 'puzzle', name: 'Puzzles', blurb: '5 puzzles: match, put in order, fill the blank.', length: 5 },
]

export const modeMeta = (id: Mode) => MODES.find((m) => m.id === id)!

export const isMode = (s: string | undefined): s is Mode => MODES.some((m) => m.id === s)

export const learnPath = (subject: SubjectId, tier: number) => `/learn/${subject}/${tierSlug(tier)}`
