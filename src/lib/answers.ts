import { shuffle } from './random'

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[−–]/g, '-')
    .replace(/pi/g, 'π')
    .replace(/sqrt/g, '√')
    .replace(/[\s,()]/g, '')
    .replace(/\.$/, '')
}

/** Parses integers, decimals and simple fractions ("3/4"). Returns null otherwise. */
export function parseNum(s: string): number | null {
  const t = normalize(s)
  if (/^-?\d+(\.\d+)?$/.test(t) || /^-?\.\d+$/.test(t)) return Number(t)
  const m = t.match(/^(-?\d+)\/(-?\d+)$/)
  if (m && Number(m[2]) !== 0) return Number(m[1]) / Number(m[2])
  return null
}

export function equivalent(a: string, b: string): boolean {
  const x = parseNum(a)
  const y = parseNum(b)
  if (x !== null && y !== null) return Math.abs(x - y) < 1e-9
  return normalize(a) === normalize(b)
}

export function checkInput(response: string, answer: string, accept: string[] = []): boolean {
  if (!response.trim()) return false
  return [answer, ...accept].some((a) => equivalent(response, a))
}

/** Plausible wrong answers derived from a numeric or fractional answer. */
export function autoDistractors(answer: string): string[] {
  const value = parseNum(answer)
  if (value === null) return []
  const t = normalize(answer)
  let cands: string[] = []

  const frac = t.match(/^(-?\d+)\/(\d+)$/)
  if (frac) {
    const a = Number(frac[1])
    const b = Number(frac[2])
    cands = [`${a + 1}/${b}`, `${a}/${b + 1}`, `${b}/${a}`, `${a}/${b * 2}`, `${a + 2}/${b}`]
    if (a > 1) cands.push(`${a - 1}/${b}`)
  } else if (Number.isInteger(value)) {
    const offsets = [1, -1, 2, -2, 10, -10, 5, -5]
    cands = offsets.map((o) => String(value + o))
    if (value !== 0) cands.push(String(-value), String(value * 2))
    if (value >= 0) cands = cands.filter((c) => Number(c) >= 0)
  } else {
    const dp = t.split('.')[1]?.length ?? 1
    const step = 10 ** -dp
    cands = [1, -1, 2, 10, -10, 5].map((o) => (value + o * step).toFixed(dp))
    cands.push((value * 10).toFixed(dp))
    if (value >= 0) cands = cands.filter((c) => Number(c) >= 0)
  }
  return cands.filter((c) => !equivalent(c, answer))
}

/**
 * Builds up to 4 unique choices: the answer, preferred distractors, then
 * auto-generated ones. Returns the shuffled choices and the answer's index.
 */
export function buildChoices(
  answer: string,
  distractors: string[] = [],
): { choices: string[]; answerIndex: number } {
  const picked: string[] = []
  const add = (c: string) => {
    if (picked.length >= 3) return
    if (equivalent(c, answer) || picked.some((p) => equivalent(p, c))) return
    picked.push(c)
  }
  shuffle(distractors).forEach(add)
  shuffle(autoDistractors(answer)).forEach(add)
  const choices = shuffle([answer, ...picked])
  return { choices, answerIndex: choices.indexOf(answer) }
}
