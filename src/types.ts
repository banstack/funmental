export type SubjectId = 'math' | 'reading' | 'science'

export type Mode = 'rapid' | 'quiz' | 'puzzle'

/** Where a question is being asked; decides which question formats are allowed. */
export type Context = Mode | 'placement'

interface QuestionBase {
  id: string
  tier: number
  prompt: string
  explanation?: string
}

export interface ChoiceQuestion extends QuestionBase {
  kind: 'choice'
  choices: string[]
  answerIndex: number
}

export interface InputQuestion extends QuestionBase {
  kind: 'input'
  answer: string
  accept?: string[]
}

export interface MatchQuestion extends QuestionBase {
  kind: 'match'
  pairs: [string, string][]
}

export interface OrderQuestion extends QuestionBase {
  kind: 'order'
  /** Items in the correct order. */
  items: string[]
}

export interface BlankQuestion extends QuestionBase {
  kind: 'blank'
  /** Sentence containing "___" where the answer goes. */
  sentence: string
  answer: string
  options: string[]
}

export type Question =
  | ChoiceQuestion
  | InputQuestion
  | MatchQuestion
  | OrderQuestion
  | BlankQuestion

export interface SubjectProgress {
  tier: number
  placed: boolean
  /** Recent results at the current tier, newest last. Cleared on tier change. */
  window: boolean[]
  bestTier: number
  answered: number
  correct: number
}

export interface SessionRecord {
  id: string
  subject: SubjectId
  mode: Mode
  startedAt: number
  endedAt: number
  answered: number
  correct: number
  tierStart: number
  tierEnd: number
}

export interface AppData {
  version: 1
  subjects: Record<SubjectId, SubjectProgress>
  sessions: SessionRecord[]
  /** Local dates (YYYY-MM-DD) with at least one answered question. */
  activeDays: string[]
}
