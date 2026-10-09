export type TopicId = 'general' | 'science' | 'history' | 'geography' | 'screen' | 'music' | 'sports' | 'food'

export interface TopicMeta {
  id: TopicId
  name: string
}

/** Also the order the Daily Dive rotates through, one topic per day. */
export const TOPICS: TopicMeta[] = [
  { id: 'general', name: 'General Knowledge' },
  { id: 'history', name: 'History' },
  { id: 'science', name: 'Science & Nature' },
  { id: 'screen', name: 'Movies & TV' },
  { id: 'geography', name: 'Geography' },
  { id: 'music', name: 'Music' },
  { id: 'sports', name: 'Sports' },
  { id: 'food', name: 'Food & Drink' },
]

export type PracticeTopic = TopicId | 'mixed'

export const MIXED = { id: 'mixed' as const, name: 'Mixed' }

export const topicMeta = (id: PracticeTopic) => (id === 'mixed' ? MIXED : TOPICS.find((t) => t.id === id)!)

export const isTopic = (s: string | undefined): s is TopicId => TOPICS.some((t) => t.id === s)
export const isPracticeTopic = (s: string | undefined): s is PracticeTopic => s === 'mixed' || isTopic(s)
