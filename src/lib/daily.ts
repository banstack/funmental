import { picturePool, type PictureKind } from '../content/pictures'
import { ask, pool, type AskedQuestion } from '../content/questions'
import type { Difficulty } from '../content/topics/types'
import { addDays, dateKey, daysBetween } from './dates'
import { MAX_HEIGHT, ZONES, formatAltitude } from './space'
import { seeded, shuffle } from './rng'
import { TOPICS, topicMeta, type PracticeTopic, type TopicId } from './topics'

/** Apogee #1 is this date. */
export const EPOCH = '2026-10-09'

export const DAILY_LENGTH = 7

/** Difficulty of each daily question, easiest first. */
export const DAILY_DIFFICULTY: Difficulty[] = [1, 1, 2, 3, 3, 4, 5]

/** Ocean zone each daily question sits in. */
export const DAILY_ZONE = DAILY_DIFFICULTY.map((d) => ZONES.findIndex((z) => z.difficulty === d))

export const dailyNumber = (key = dateKey()) => daysBetween(EPOCH, key) + 1
export const dailyDate = (n: number) => addDays(EPOCH, n - 1)

/**
 * From this launch on, every question has its own category. Earlier launches
 * kept one topic for the whole day and are dealt exactly as they were, so
 * results already played still line up with their questions.
 */
export const THEMED_FROM = 3

/** One-topic days took turns in this order. */
const LEGACY_ROTATION: TopicId[] = ['general', 'history', 'science', 'screen', 'geography', 'music', 'sports', 'food']

/** The day's topic: one topic per day before THEMED_FROM, a mix of categories after. */
export const dailyTopic = (n: number): DailyTopic =>
  n >= THEMED_FROM ? 'mixed' : LEGACY_ROTATION[(((n - 1) % LEGACY_ROTATION.length) + LEGACY_ROTATION.length) % LEGACY_ROTATION.length]

/** 'mixed' for a launch with a different category per question. */
export type DailyTopic = PracticeTopic

/** What the launch is called next to its number: its topic, or "Daily Mix". */
export const dailyTopicName = (n: number) => (dailyTopic(n) === 'mixed' ? 'Daily Mix' : topicMeta(dailyTopic(n)).name)

/** A question's category: a topic's bank, or a picture question. */
export interface Category {
  id: TopicId | PictureKind
  name: string
}

const topic = (id: TopicId): Category => ({ id, name: TOPICS.find((t) => t.id === id)!.name })

/** Every themed launch has these six categories... */
const CORE: Category[] = [topic('science'), topic('math'), topic('history'), topic('geography'), { id: 'flag', name: 'Flags' }, { id: 'outline', name: 'Countries' }]

/** ...plus one of these, taking turns. */
const EXTRA: Category[] = [topic('screen'), topic('music'), topic('sports'), topic('food'), topic('general')]

const themedCache: Category[][] = []

/**
 * The category of each question in themed launch `n`. The order is reshuffled
 * every day, so each category takes its turn at every difficulty.
 */
export function dailyCategories(n: number): Category[] {
  if (n < THEMED_FROM) return Array<Category>(DAILY_LENGTH).fill(topic(dailyTopic(n) as TopicId))
  const i = n - THEMED_FROM
  themedCache[i] ??= shuffle([...CORE, EXTRA[i % EXTRA.length]], seeded(`themes:${n}`))
  return themedCache[i]
}

const isPicture = (id: Category['id']): id is PictureKind => id === 'flag' || id === 'outline'
const bankFor = (id: Category['id'], d: Difficulty) => (isPicture(id) ? picturePool(id, d) : pool(id, d))

/** Deals card `index` from a deck that is reshuffled each time it runs out. */
function deal(bank: readonly AskedQuestion['question'][], deck: string, index: number) {
  const round = Math.floor(index / bank.length)
  return shuffle(bank, seeded(`${deck}:${round}`))[index % bank.length]
}

/**
 * The seven questions for launch `n`, the same on every device. Questions are
 * dealt from a fixed shuffled deck per category and difficulty, so nothing
 * repeats until its deck has been used up.
 */
export function dailyQuestions(n: number): AskedQuestion[] {
  const rand = seeded(`daily:${n}`)
  if (n < THEMED_FROM) return legacyQuestions(n, rand)

  // How many cards each deck has dealt on earlier themed days.
  const used = new Map<string, number>()
  for (let m = THEMED_FROM; m < n; m++) {
    dailyCategories(m).forEach((c, i) => {
      const key = `${c.id}:${DAILY_DIFFICULTY[i]}`
      used.set(key, (used.get(key) ?? 0) + 1)
    })
  }
  return dailyCategories(n).map((c, i) => {
    const d = DAILY_DIFFICULTY[i]
    return ask(deal(bankFor(c.id, d), `themed:${c.id}:${d}`, used.get(`${c.id}:${d}`) ?? 0), rand)
  })
}

/** Geography days before THEMED_FROM had a flag at question 3 and a country outline at question 5. */
const GEOGRAPHY_PICTURES: Partial<Record<number, PictureKind>> = { 2: 'flag', 4: 'outline' }

/** One-topic launches, dealt exactly as they were when they were played. */
function legacyQuestions(n: number, rand: () => number): AskedQuestion[] {
  const topic = dailyTopic(n) as TopicId
  const turn = Math.floor((n - 1) / LEGACY_ROTATION.length) // how many times this topic had come up before
  const slots = DAILY_DIFFICULTY.map((difficulty, i) => {
    const kind = topic === 'geography' ? GEOGRAPHY_PICTURES[i] : undefined
    return { difficulty, kind, deck: kind ? `deck:${kind}:${difficulty}` : `deck:${topic}:${difficulty}` }
  })
  const needed = new Map<string, number>()
  for (const s of slots) needed.set(s.deck, (needed.get(s.deck) ?? 0) + 1)

  const dealt = new Map<string, number>()
  return slots.map(({ difficulty, kind, deck }) => {
    const i = dealt.get(deck) ?? 0
    dealt.set(deck, i + 1)
    return ask(deal(bankFor(kind ?? topic, difficulty), deck, turn * needed.get(deck)! + i), rand)
  })
}

/** Each right answer climbs one milestone, so seven reach the Galactic Center. */
export function dailyHeight(answers: readonly boolean[]): number {
  return Math.min(MAX_HEIGHT, answers.filter(Boolean).length)
}

/** Each right answer scores its difficulty in points (Easy 1 to Expert 5), so the Expert question is worth five Easy ones. */
export const DAILY_POINTS: readonly number[] = DAILY_DIFFICULTY

export const MAX_POINTS = DAILY_POINTS.reduce((a, b) => a + b, 0)

export function dailyPoints(answers: readonly boolean[]): number {
  return answers.reduce((sum, ok, i) => sum + (ok ? DAILY_POINTS[i] : 0), 0)
}

/** Wordle-style result to paste into a chat. */
export function shareText(n: number, topicName: string, answers: readonly boolean[]): string {
  const squares = answers.map((ok, i) => (ok ? ZONES[DAILY_ZONE[i]].square : '⬛')).join('')
  const title = dailyTopic(n) === 'mixed' ? `Apogee #${n}` : `Apogee #${n} · ${topicName}`
  return `${title}\n${squares}  ${dailyPoints(answers)}/${MAX_POINTS} pts · ${formatAltitude(dailyHeight(answers))}`
}
