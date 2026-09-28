import { pick, ri } from '../lib/random'

export interface MathItem {
  prompt: string
  answer: string
  distractors?: string[]
  explanation?: string
  /** Answer is awkward to type (π, √, i), so always ask it as multiple choice. */
  choiceOnly?: boolean
}

type Gen = () => MathItem

// ---------- formatting helpers ----------

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}

/** Simplified fraction string; whole numbers come back without a denominator. */
export function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d]
  const g = gcd(n, d)
  n /= g
  d /= g
  return d === 1 ? String(n) : `${n}/${d}`
}

const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
}
const SUB: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
}
const sup = (n: number) => String(n).split('').map((c) => SUP[c]).join('')
const sub = (n: number) => String(n).split('').map((c) => SUB[c]).join('')

/** Wraps negatives in parentheses for use inside expressions. */
const p = (n: number) => (n < 0 ? `(${n})` : String(n))

/** Formats a polynomial from [coefficient, power] terms, e.g. 3x² − 2x + 1. */
function poly(terms: [number, number][], v = 'x'): string {
  let out = ''
  for (const [c, pow] of terms) {
    if (c === 0) continue
    const abs = Math.abs(c)
    const body = pow === 0 ? String(abs) : `${abs === 1 ? '' : abs}${v}${pow === 1 ? '' : sup(pow)}`
    if (!out) out = c < 0 ? `-${body}` : body
    else out += c < 0 ? ` − ${body}` : ` + ${body}`
  }
  return out || '0'
}

const lin = (a: number, b: number) => poly([[a, 1], [b, 0]])

function nonZero(min: number, max: number): number {
  let n = 0
  while (n === 0) n = ri(min, max)
  return n
}

function radians(deg: number): string {
  const f = frac(deg, 180)
  const [n, d] = f.split('/')
  const num = n === '1' ? 'π' : `${n}π`
  return d ? `${num}/${d}` : num
}

const TRIG_VALUES = ['0', '1/2', '√2/2', '√3/2', '1']

// ---------- generators by tier ----------

const tiers: Gen[][] = [
  // 0 · Grade 1: addition and subtraction within 20
  [
    () => {
      const a = ri(1, 10), b = ri(1, 10)
      return { prompt: `${a} + ${b}`, answer: `${a + b}` }
    },
    () => {
      const a = ri(5, 20), b = ri(1, a)
      return { prompt: `${a} − ${b}`, answer: `${a - b}` }
    },
    () => {
      const a = ri(2, 9)
      return { prompt: `What number is 10 more than ${a}?`, answer: `${a + 10}` }
    },
  ],
  // 1 · Grade 2: two-digit addition/subtraction, place value
  [
    () => {
      const a = ri(10, 79), b = ri(10, 99 - a)
      return { prompt: `${a} + ${b}`, answer: `${a + b}` }
    },
    () => {
      const a = ri(30, 99), b = ri(10, a)
      return { prompt: `${a} − ${b}`, answer: `${a - b}` }
    },
    () => {
      const n = ri(100, 999)
      const digits = String(n).split('')
      return {
        prompt: `What digit is in the tens place of ${n}?`,
        answer: digits[1],
        distractors: [digits[0], digits[2], String((Number(digits[1]) + 1) % 10)],
      }
    },
  ],
  // 2 · Grade 3: times tables, division facts, three-digit addition
  [
    () => {
      const a = ri(2, 10), b = ri(2, 10)
      return { prompt: `${a} × ${b}`, answer: `${a * b}`, distractors: [`${a * (b + 1)}`, `${a + b}`] }
    },
    () => {
      const b = ri(2, 10), q = ri(2, 10)
      return { prompt: `${b * q} ÷ ${b}`, answer: `${q}` }
    },
    () => {
      const a = ri(100, 499), b = ri(100, 499)
      return { prompt: `${a} + ${b}`, answer: `${a + b}`, distractors: [`${a + b - 100}`, `${a + b + 10}`] }
    },
  ],
  // 3 · Grade 4: multi-digit multiplication, long division, rounding
  [
    () => {
      const a = ri(12, 99), b = ri(3, 9)
      return { prompt: `${a} × ${b}`, answer: `${a * b}` }
    },
    () => {
      const b = ri(3, 9), q = ri(20, 150)
      return { prompt: `${b * q} ÷ ${b}`, answer: `${q}` }
    },
    () => {
      const n = ri(1001, 9999)
      const r = Math.round(n / 100) * 100
      return {
        prompt: `Round ${n} to the nearest hundred.`,
        answer: `${r}`,
        distractors: [`${Math.round(n / 10) * 10}`, `${Math.round(n / 1000) * 1000}`, `${r === Math.floor(n / 100) * 100 ? r + 100 : r - 100}`],
      }
    },
  ],
  // 4 · Grade 5: fractions, decimals, 2×2-digit multiplication, volume
  [
    () => {
      const d = ri(3, 12), a = ri(1, d - 1), b = ri(1, d - 1)
      return {
        prompt: `${a}/${d} + ${b}/${d} (simplify)`,
        answer: frac(a + b, d),
        distractors: [`${a + b}/${2 * d}`, frac(a + b + 1, d)],
        explanation: `Same denominator, so add the numerators: ${a} + ${b} = ${a + b}, giving ${a + b}/${d} = ${frac(a + b, d)}.`,
      }
    },
    () => {
      const a = ri(11, 99), b = ri(11, 99)
      return { prompt: `${a / 10} + ${b / 10}`, answer: ((a + b) / 10).toFixed(1) }
    },
    () => {
      const a = ri(11, 40), b = ri(11, 30)
      return { prompt: `${a} × ${b}`, answer: `${a * b}` }
    },
    () => {
      const l = ri(2, 10), w = ri(2, 10), h = ri(2, 10)
      return {
        prompt: `A box is ${l} × ${w} × ${h} cm. What is its volume in cm³?`,
        answer: `${l * w * h}`,
        distractors: [`${l + w + h}`, `${2 * (l * w + w * h + l * h)}`],
        explanation: 'Volume = length × width × height.',
      }
    },
  ],
  // 5 · Grade 6: percents, negatives, ratios, order of operations
  [
    () => {
      const pct = pick([10, 20, 25, 50, 75])
      const step = 100 / gcd(pct, 100)
      const n = step * ri(1, Math.floor(200 / step))
      return { prompt: `What is ${pct}% of ${n}?`, answer: `${(pct * n) / 100}` }
    },
    () => {
      const a = ri(-20, 20), b = ri(-20, -1)
      return { prompt: `${a} + (${b})`, answer: `${a + b}`, distractors: [`${a - b}`] }
    },
    () => {
      const u = ri(2, 9), a = ri(2, 6), b = ri(a + 1, 12)
      return {
        prompt: `If ${a} notebooks cost $${a * u}, how many dollars do ${b} notebooks cost?`,
        answer: `${b * u}`,
        explanation: `Each notebook costs $${a * u} ÷ ${a} = $${u}, so ${b} cost ${b} × ${u} = $${b * u}.`,
      }
    },
    () => {
      const a = ri(2, 20), b = ri(2, 9), c = ri(2, 9)
      return {
        prompt: `${a} + ${b} × ${c}`,
        answer: `${a + b * c}`,
        distractors: [`${(a + b) * c}`],
        explanation: 'Multiply before you add.',
      }
    },
  ],
  // 6 · Grade 7: one-step equations, integer operations, percent change
  [
    () => {
      const x = ri(-12, 12), a = ri(2, 20)
      return { prompt: `Solve for x: x + ${a} = ${x + a}`, answer: `${x}`, distractors: [`${x + 2 * a}`] }
    },
    () => {
      const a = ri(2, 12), x = nonZero(-12, 12)
      return { prompt: `Solve for x: ${a}x = ${a * x}`, answer: `${x}` }
    },
    () => {
      const a = ri(2, 12), b = ri(2, 12), bothNeg = Math.random() < 0.5
      return bothNeg
        ? { prompt: `(-${a}) × (-${b})`, answer: `${a * b}` }
        : { prompt: `(-${a}) × ${b}`, answer: `${-a * b}` }
    },
    () => {
      const price = ri(1, 10) * 20, pct = pick([10, 20, 25, 50])
      return {
        prompt: `A $${price} jacket's price rises ${pct}%. What is the new price in dollars?`,
        answer: `${price + (price * pct) / 100}`,
        distractors: [`${(price * pct) / 100}`, `${price + pct}`],
      }
    },
  ],
  // 7 · Grade 8: two-step equations, exponents, roots
  [
    () => {
      const a = ri(2, 9), x = ri(-10, 10), b = nonZero(-15, 15)
      return {
        prompt: `Solve for x: ${lin(a, b)} = ${a * x + b}`,
        answer: `${x}`,
        explanation: `Subtract ${b} from both sides, then divide by ${a}.`,
      }
    },
    () => {
      if (Math.random() < 0.6) {
        const b = ri(2, 15)
        return { prompt: `${b}²`, answer: `${b * b}`, distractors: [`${b * 2}`] }
      }
      const b = ri(2, 6)
      return { prompt: `${b}³`, answer: `${b ** 3}`, distractors: [`${b * 3}`, `${b * b}`] }
    },
    () => {
      const n = ri(2, 20)
      return { prompt: `√${n * n}`, answer: `${n}`, distractors: [`${(n * n) / 2}`] }
    },
    () => {
      const a = ri(2, 5), c = ri(1, 9), x = nonZero(-5, 5)
      return {
        prompt: `Evaluate ${a}x² − ${c} when x = ${x}`,
        answer: `${a * x * x - c}`,
        distractors: [`${a * x * 2 - c}`, `${(a * x) ** 2 - c}`],
      }
    },
  ],
  // 8 · Grade 9 (Algebra I): slope, systems, distribution, functions
  [
    () => {
      const x1 = ri(-5, 5), dx = ri(1, 5) * pick([1, -1]), m = ri(-5, 5), y1 = ri(-10, 10)
      return {
        prompt: `What is the slope of the line through (${x1}, ${y1}) and (${x1 + dx}, ${y1 + m * dx})?`,
        answer: `${m}`,
        explanation: 'Slope = (change in y) ÷ (change in x).',
      }
    },
    () => {
      const x = ri(-9, 9), y = ri(-9, 9)
      return {
        prompt: `If x + y = ${x + y} and x − y = ${x - y}, what is x?`,
        answer: `${x}`,
        distractors: [`${y}`],
        explanation: 'Add the two equations: 2x = sum, so x = half the sum.',
      }
    },
    () => {
      const a = ri(2, 9), b = ri(1, 9), x = ri(-6, 10)
      return { prompt: `Solve for x: ${a}(x + ${b}) = ${a * (x + b)}`, answer: `${x}` }
    },
    () => {
      const a = ri(1, 4), b = ri(-6, 6), c = ri(-9, 9), x = ri(-4, 4)
      return {
        prompt: `If f(x) = ${poly([[a, 2], [b, 1], [c, 0]])}, what is f(${x})?`,
        answer: `${a * x * x + b * x + c}`,
      }
    },
  ],
  // 9 · Grade 10 (Geometry)
  [
    () => {
      const [a0, b0, c0] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]])
      const k = a0 === 3 ? ri(1, 4) : ri(1, 2)
      const [a, b, c] = [a0 * k, b0 * k, c0 * k]
      return Math.random() < 0.5
        ? { prompt: `A right triangle has legs ${a} and ${b}. How long is the hypotenuse?`, answer: `${c}`, distractors: [`${a + b}`] }
        : { prompt: `A right triangle has hypotenuse ${c} and one leg ${a}. How long is the other leg?`, answer: `${b}`, distractors: [`${c - a}`] }
    },
    () => {
      const A = ri(20, 100), B = ri(20, 170 - A)
      return { prompt: `A triangle has angles of ${A}° and ${B}°. What is the third angle in degrees?`, answer: `${180 - A - B}`, distractors: [`${360 - A - B}`] }
    },
    () => {
      const r = ri(2, 12)
      return {
        prompt: `What is the area of a circle with radius ${r}?`,
        answer: `${r * r}π`,
        distractors: [`${2 * r}π`, `${r}π`, `${r * r * 2}π`],
        explanation: `Area = πr² = π × ${r}² = ${r * r}π.`,
        choiceOnly: true,
      }
    },
    () => {
      const n = ri(5, 12)
      return {
        prompt: `What is the sum of the interior angles of a ${n}-sided polygon, in degrees?`,
        answer: `${(n - 2) * 180}`,
        distractors: [`${n * 180}`, `${(n - 1) * 180}`, '360'],
        explanation: `Sum = (n − 2) × 180° = ${n - 2} × 180°.`,
      }
    },
  ],
  // 10 · Grade 11 (Algebra II): quadratics, logs, exponent rules, complex numbers
  [
    () => {
      let r1 = ri(-9, 9), r2 = ri(-9, 9)
      while (r2 === r1) r2 = ri(-9, 9)
      const big = Math.max(r1, r2)
      return {
        prompt: `What is the larger root of ${poly([[1, 2], [-(r1 + r2), 1], [r1 * r2, 0]])} = 0?`,
        answer: `${big}`,
        distractors: [`${-big}`, `${Math.min(r1, r2)}`, `${-Math.min(r1, r2)}`],
        explanation: `It factors as (x − ${p(r1)})(x − ${p(r2)}), so the roots are ${r1} and ${r2}.`,
      }
    },
    () => {
      const b = pick([2, 3, 5, 10])
      const k = ri(1, b === 2 ? 10 : b === 3 ? 5 : b === 5 ? 4 : 6)
      return { prompt: `log${sub(b)}(${b ** k})`, answer: `${k}`, explanation: `${b}${sup(k)} = ${b ** k}` }
    },
    () => {
      const a = ri(2, 9), b = ri(2, 9), kind = ri(0, 2)
      if (kind === 0) return { prompt: `x${sup(a)} · x${sup(b)} = xⁿ. What is n?`, answer: `${a + b}`, distractors: [`${a * b}`] }
      if (kind === 1) return { prompt: `(x${sup(a)})${sup(b)} = xⁿ. What is n?`, answer: `${a * b}`, distractors: [`${a + b}`] }
      return { prompt: `x${sup(a + b)} ÷ x${sup(b)} = xⁿ. What is n?`, answer: `${a}`, distractors: [`${a + 2 * b}`] }
    },
    () => {
      const n = ri(2, 40)
      const vals = ['1', 'i', '-1', '-i']
      return {
        prompt: `What is i${sup(n)}? (i = √-1)`,
        answer: vals[n % 4],
        distractors: vals.filter((_, i) => i !== n % 4),
        explanation: 'Powers of i repeat every 4: i, -1, -i, 1.',
        choiceOnly: true,
      }
    },
  ],
  // 11 · Grade 12 (Precalculus): trig, sequences, composition, radians
  [
    () => {
      const angle = pick([0, 30, 45, 60, 90]), fn = pick(['sin', 'cos'])
      const idx = [0, 30, 45, 60, 90].indexOf(angle)
      const answer = TRIG_VALUES[fn === 'sin' ? idx : 4 - idx]
      return { prompt: `${fn}(${angle}°)`, answer, distractors: TRIG_VALUES.filter((v) => v !== answer), choiceOnly: true }
    },
    () => {
      const a = ri(1, 10), d = ri(1, 6), n = ri(5, 12)
      return {
        prompt: `What is the sum of the first ${n} terms of ${a}, ${a + d}, ${a + 2 * d}, …?`,
        answer: `${(n * (2 * a + (n - 1) * d)) / 2}`,
        explanation: 'Sum = n × (first + last) ÷ 2.',
      }
    },
    () => {
      const a = ri(1, 5), r = ri(2, 3), n = ri(4, 7)
      return {
        prompt: `The sequence ${a}, ${a * r}, ${a * r * r}, … is geometric. What is term #${n}?`,
        answer: `${a * r ** (n - 1)}`,
        distractors: [`${a * r ** n}`, `${a * r ** (n - 2)}`],
      }
    },
    () => {
      const a = nonZero(-4, 4), b = ri(-5, 5), c = nonZero(-4, 4), d = ri(-5, 5), x = ri(-3, 3)
      return {
        prompt: `If f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}, what is f(g(${x}))?`,
        answer: `${a * (c * x + d) + b}`,
        distractors: [`${c * (a * x + b) + d}`],
      }
    },
    () => {
      const degs = [30, 45, 60, 90, 120, 135, 150, 180, 270, 360]
      const deg = pick(degs)
      return {
        prompt: `Convert ${deg}° to radians.`,
        answer: radians(deg),
        distractors: degs.filter((d) => d !== deg).map(radians),
        choiceOnly: true,
      }
    },
  ],
  // 12 · College I (Calculus I): derivatives, limits
  [
    () => {
      const a = ri(1, 5), n = ri(2, 4), b = ri(-6, 6), k = ri(-3, 3)
      return {
        prompt: `If f(x) = ${poly([[a, n], [b, 1]])}, what is f′(${k})?`,
        answer: `${a * n * k ** (n - 1) + b}`,
        distractors: [`${a * k ** n + b * k}`],
        explanation: `f′(x) = ${poly([[a * n, n - 1], [b, 0]])}`,
      }
    },
    () => {
      const a = ri(1, 9)
      return {
        prompt: `lim (x→${a}) of (x² − ${a * a}) / (x − ${a})`,
        answer: `${2 * a}`,
        distractors: ['0', `${a}`, `${a * a}`],
        explanation: `Factor: (x − ${a})(x + ${a}) / (x − ${a}) = x + ${a} → ${2 * a}.`,
      }
    },
    () => {
      const n = ri(2, 4), k = ri(1, 3)
      return {
        prompt: `What is the slope of the tangent line to y = x${sup(n)} at x = ${k}?`,
        answer: `${n * k ** (n - 1)}`,
        distractors: [`${k ** n}`],
      }
    },
    () => {
      const a = ri(1, 9), b = ri(2, 9)
      return {
        prompt: `lim (x→∞) of (${a}x² + 1) / (${b}x² − 3)`,
        answer: frac(a, b),
        distractors: ['0', '∞', frac(b, a)],
        explanation: 'Same degree on top and bottom: the limit is the ratio of leading coefficients.',
      }
    },
  ],
  // 13 · College II (Calculus II): integrals, chain rule
  [
    () => {
      const k = ri(1, 5)
      return {
        prompt: `∫ from 0 to ${k} of 3x² dx`,
        answer: `${k ** 3}`,
        distractors: [`${3 * k * k}`, `${6 * k}`],
        explanation: `The antiderivative is x³, so the value is ${k}³ − 0.`,
      }
    },
    () => {
      const a = 2 * ri(1, 5), k = ri(1, 6)
      return { prompt: `∫ from 0 to ${k} of ${a}x dx`, answer: `${(a * k * k) / 2}`, distractors: [`${a * k * k}`, `${a * k}`] }
    },
    () => {
      const a = ri(1, 4), b = nonZero(-5, 5), k = ri(-2, 2)
      return {
        prompt: `If f(x) = (${lin(a, b)})², what is f′(${k})?`,
        answer: `${2 * a * (a * k + b)}`,
        distractors: [`${2 * (a * k + b)}`],
        explanation: `Chain rule: f′(x) = 2(${lin(a, b)}) · ${a}.`,
      }
    },
    () => {
      const k = ri(2, 9), a = ri(2, 5)
      return Math.random() < 0.5
        ? {
            prompt: `If f(x) = ln(${a}x), what is f′(${k})?`,
            answer: `1/${k}`,
            distractors: [`${a}/${k}`, `1/${a * k}`],
            explanation: `ln(${a}x) = ln ${a} + ln x, so f′(x) = 1/x.`,
          }
        : { prompt: `If f(x) = e^(${a}x), what is f′(0)?`, answer: `${a}`, distractors: ['1', '0', `${a * a}`] }
    },
  ],
  // 14 · College III: linear algebra, combinatorics, probability
  [
    () => {
      const a = ri(-6, 9), b = ri(-6, 9), c = ri(-6, 9), d = ri(-6, 9)
      return {
        prompt: `What is the determinant of the matrix [[${a}, ${b}], [${c}, ${d}]]?`,
        answer: `${a * d - b * c}`,
        distractors: [`${a * d + b * c}`, `${b * c - a * d}`],
        explanation: 'det = ad − bc',
      }
    },
    () => {
      const n = ri(5, 10), r = ri(2, 3)
      const perm = r === 2 ? n * (n - 1) : n * (n - 1) * (n - 2)
      const comb = r === 2 ? perm / 2 : perm / 6
      return { prompt: `How many ways can you choose ${r} items from ${n}? — C(${n}, ${r})`, answer: `${comb}`, distractors: [`${perm}`] }
    },
    () => {
      const s = ri(2, 12), count = 6 - Math.abs(s - 7)
      return {
        prompt: `Two fair dice are rolled. What is the probability the sum is ${s}?`,
        answer: frac(count, 36),
        distractors: ['1/6', '1/12', frac(count + 1, 36)],
        explanation: `${count} of the 36 outcomes sum to ${s}.`,
      }
    },
    () => {
      const u = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], v = [ri(-5, 5), ri(-5, 5), ri(-5, 5)]
      return {
        prompt: `(${u.join(', ')}) · (${v.join(', ')})`,
        answer: `${u[0] * v[0] + u[1] * v[1] + u[2] * v[2]}`,
        explanation: 'Dot product: multiply matching components and add.',
      }
    },
  ],
]

export function mathItem(tier: number): MathItem {
  return pick(tiers[tier])()
}
