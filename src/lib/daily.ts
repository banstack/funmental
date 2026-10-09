import { picturePool, type PictureKind } from '../content/pictures'
import { ask, pool, type AskedQuestion } from '../content/questions'
import type { Difficulty } from '../content/topics/types'
import { addDays, dateKey, daysBetween } from './dates'
import { MAX_HEIGHT, ZONES, formatAltitude } from './space'
import { seeded, shuffle } from './rng'
import { TOPICS, type TopicId } from './topics'

/** Apogee #1 is this date. */
export const EPOCH = '2026-10-09'

export const DAILY_LENGTH = 7

/** Difficulty of each daily question, easiest first. */
export const DAILY_DIFFICULTY: Difficulty[] = [1, 1, 2, 3, 3, 4, 5]

/** Ocean zone each daily question sits in. */
export const DAILY_ZONE = DAILY_DIFFICULTY.map((d) => ZONES.findIndex((z) => z.difficulty === d))

export const dailyNumber = (key = dateKey()) => daysBetween(EPOCH, key) + 1
export const dailyDate = (n: number) => addDays(EPOCH, n - 1)

/** The topics take turns, one per day. */
export const dailyTopic = (n: number): TopicId => TOPICS[(((n - 1) % TOPICS.length) + TOPICS.length) % TOPICS.length].id

/**
 * Geography days swap two of their questions for pictures: a flag at question 3
 * and a country outline at question 5.
 */
export const GEOGRAPHY_PICTURES: Partial<Record<number, PictureKind>> = { 2: 'flag', 4: 'outline' }

/**
 * The seven questions for launch `n`, the same on every device. Everyone gets
 * the same topic each day, and each topic's questions are dealt from a fixed
 * shuffled deck per difficulty (and per picture kind), so a topic doesn't
 * repeat a question until it has used every one in that deck.
 */
export function dailyQuestions(n: number): AskedQuestion[] {
  const topic = dailyTopic(n)
  const turn = Math.floor((n - 1) / TOPICS.length) // how many times this topic has come up before
  const slots = DAILY_DIFFICULTY.map((difficulty, i) => {
    const kind = topic === 'geography' ? GEOGRAPHY_PICTURES[i] : undefined
    return { difficulty, kind, deck: kind ? `deck:${kind}:${difficulty}` : `deck:${topic}:${difficulty}` }
  })
  const needed = new Map<string, number>()
  for (const s of slots) needed.set(s.deck, (needed.get(s.deck) ?? 0) + 1)

  const dealt = new Map<string, number>()
  const rand = seeded(`daily:${n}`)
  return slots.map(({ difficulty, kind, deck }) => {
    const bank = kind ? picturePool(kind, difficulty) : pool(topic, difficulty)
    const i = dealt.get(deck) ?? 0
    dealt.set(deck, i + 1)
    const slot = turn * needed.get(deck)! + i
    const round = Math.floor(slot / bank.length)
    return ask(shuffle(bank, seeded(`${deck}:${round}`))[slot % bank.length], rand)
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
  return `Apogee #${n} · ${topicName}\n${squares}  ${dailyPoints(answers)}/${MAX_POINTS} pts · ${formatAltitude(dailyHeight(answers))}`
}
