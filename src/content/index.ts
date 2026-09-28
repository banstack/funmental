import { buildChoices, parseNum } from '../lib/answers'
import { pick, sample, shuffle } from '../lib/random'
import { MAX_TIER } from '../lib/tiers'
import type { Context, Question, SubjectId } from '../types'
import type { TierBank } from './bank'
import { mathItem, type MathItem } from './math'
import { reading } from './reading'
import { science } from './science'

const MAX_TRIES = 12

// ---------- math ----------

function mathChoice(item: MathItem, tier: number): Question {
  return { id: item.prompt, tier, kind: 'choice', prompt: item.prompt, explanation: item.explanation, ...buildChoices(item.answer, item.distractors) }
}

function mathInput(item: MathItem, tier: number): Question {
  return { id: item.prompt, tier, kind: 'input', prompt: item.prompt, answer: item.answer, explanation: item.explanation }
}

/** Draws `n` math items at a tier with distinct prompts and answers. */
function distinctMathItems(tier: number, n: number, filter: (m: MathItem) => boolean = () => true): MathItem[] {
  const items: MathItem[] = []
  for (let i = 0; i < n * 20 && items.length < n; i++) {
    const m = mathItem(tier)
    if (!filter(m)) continue
    if (items.some((x) => x.prompt === m.prompt || parseNum(x.answer) === parseNum(m.answer) || x.answer === m.answer)) continue
    items.push(m)
  }
  return items
}

function mathPuzzle(tier: number): Question {
  const kind = pick(['match', 'order', 'input'] as const)
  if (kind === 'match') {
    const items = distinctMathItems(tier, 4)
    if (items.length === 4) {
      return {
        id: `match:${items.map((m) => m.prompt).join('|')}`,
        tier,
        kind: 'match',
        prompt: 'Match each problem to its answer.',
        pairs: items.map((m) => [m.prompt, m.answer]),
      }
    }
  }
  if (kind === 'order') {
    const items = distinctMathItems(tier, 4, (m) => parseNum(m.answer) !== null)
    if (items.length === 4) {
      const sorted = [...items].sort((a, b) => parseNum(a.answer)! - parseNum(b.answer)!)
      return {
        id: `order:${sorted.map((m) => m.prompt).join('|')}`,
        tier,
        kind: 'order',
        prompt: 'Order these from smallest to largest value.',
        items: sorted.map((m) => m.prompt),
      }
    }
  }
  let item = mathItem(tier)
  for (let i = 0; i < MAX_TRIES && item.choiceOnly; i++) item = mathItem(tier)
  return item.choiceOnly ? mathChoice(item, tier) : mathInput(item, tier)
}

function mathQuestion(tier: number, context: Context): Question {
  if (context === 'puzzle') return mathPuzzle(tier)
  const item = mathItem(tier)
  if (context === 'rapid' && !item.choiceOnly) return mathInput(item, tier)
  return mathChoice(item, tier)
}

// ---------- question banks (reading, science) ----------

const BANKS: Record<Exclude<SubjectId, 'math'>, TierBank[]> = { reading, science }

/** Terms at a tier, topped up from neighboring tiers when there are too few. */
function termPool(banks: TierBank[], tier: number, min: number): [string, string][] {
  const pool = [...banks[tier].terms]
  for (let d = 1; pool.length < min && d <= MAX_TIER; d++) {
    for (const t of [tier - d, tier + d]) if (banks[t]) pool.push(...banks[t].terms)
  }
  return pool
}

/** The order puzzles at a tier, or the nearest tier that has some. */
function nearestOrders(banks: TierBank[], tier: number) {
  for (let d = 0; d <= MAX_TIER; d++) {
    for (const t of [tier - d, tier + d]) {
      const orders = banks[t]?.orders
      if (orders?.length) return { orders, tier: t }
    }
  }
  return null
}

function bankChoice(banks: TierBank[], tier: number): Question {
  const bank = banks[tier]
  const useMcq = Math.random() < bank.mcq.length / (bank.mcq.length + bank.terms.length * 2)
  if (useMcq) {
    const i = Math.floor(Math.random() * bank.mcq.length)
    const [prompt, answer, ...rest] = bank.mcq[i]
    const explanation = rest[3]
    return { id: `mcq:${tier}:${i}`, tier, kind: 'choice', prompt, explanation, ...buildChoices(answer, rest.slice(0, 3) as string[]) }
  }
  const pool = termPool(banks, tier, 4)
  const [term, def] = pick(bank.terms)
  const others = pool.filter(([t]) => t !== term)
  if (Math.random() < 0.5) {
    return {
      id: `def:${tier}:${term}`,
      tier,
      kind: 'choice',
      prompt: `What does "${term}" mean?`,
      ...buildChoices(def, others.map(([, d]) => d)),
    }
  }
  return {
    id: `term:${tier}:${term}`,
    tier,
    kind: 'choice',
    prompt: `Which word means "${def}"?`,
    ...buildChoices(term, others.map(([t]) => t)),
  }
}

function bankPuzzle(banks: TierBank[], tier: number): Question {
  const bank = banks[tier]
  const kinds: ('match' | 'order' | 'blank')[] = ['match', 'match', 'order']
  if (bank.cloze?.length) kinds.push('blank', 'blank')
  const kind = pick(kinds)

  if (kind === 'order') {
    const found = nearestOrders(banks, tier)
    if (found) {
      const i = Math.floor(Math.random() * found.orders.length)
      const { prompt, items } = found.orders[i]
      return { id: `order:${found.tier}:${i}`, tier, kind: 'order', prompt, items }
    }
  }
  if (kind === 'blank' && bank.cloze?.length) {
    const i = Math.floor(Math.random() * bank.cloze.length)
    const [sentence, answer] = bank.cloze[i]
    const distractors = sample(
      termPool(banks, tier, 4).map(([t]) => t).filter((t) => t !== answer),
      3,
    )
    return {
      id: `blank:${tier}:${i}`,
      tier,
      kind: 'blank',
      prompt: 'Fill in the blank.',
      sentence,
      answer,
      options: shuffle([answer, ...distractors]),
    }
  }
  const pairs = sample(termPool(banks, tier, 4), 4)
  return {
    id: `match:${tier}:${pairs.map(([t]) => t).sort().join('|')}`,
    tier,
    kind: 'match',
    prompt: 'Match each word to its meaning.',
    pairs,
  }
}

// ---------- public API ----------

function generate(subject: SubjectId, tier: number, context: Context): Question {
  if (subject === 'math') return mathQuestion(tier, context)
  const banks = BANKS[subject]
  return context === 'puzzle' ? bankPuzzle(banks, tier) : bankChoice(banks, tier)
}

/** A question for the subject and tier, avoiding ids in `seen` when possible. */
export function nextQuestion(subject: SubjectId, tier: number, context: Context, seen: Set<string> = new Set()): Question {
  let q = generate(subject, tier, context)
  for (let i = 0; i < MAX_TRIES && seen.has(q.id); i++) q = generate(subject, tier, context)
  return q
}
