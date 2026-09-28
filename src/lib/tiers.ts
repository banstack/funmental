export const MAX_TIER = 14

export interface Band {
  name: string
  short: string
  first: number
  last: number
}

export const BANDS: Band[] = [
  { name: 'Elementary', short: 'Elem', first: 0, last: 4 },
  { name: 'Middle School', short: 'Middle', first: 5, last: 7 },
  { name: 'High School', short: 'High', first: 8, last: 11 },
  { name: 'College', short: 'College', first: 12, last: 14 },
]

export const TIERS = Array.from({ length: MAX_TIER + 1 }, (_, i) => i)

export function bandOf(tier: number): Band {
  return BANDS.find((b) => tier >= b.first && tier <= b.last)!
}

export function tierLabel(tier: number): string {
  if (tier >= 12) return `College ${['I', 'II', 'III'][tier - 12]}`
  return `Grade ${tier + 1}`
}

/** Short label used on the tier track, e.g. "3" or "C2". */
export function tierShort(tier: number): string {
  return tier >= 12 ? `C${tier - 11}` : String(tier + 1)
}

/** URL-friendly tier name, e.g. "grade-3" or "college-2". */
export function tierSlug(tier: number): string {
  return tier >= 12 ? `college-${tier - 11}` : `grade-${tier + 1}`
}

export function parseTierSlug(s: string | undefined): number | null {
  const m = s?.match(/^(grade|college)-(\d+)$/)
  if (!m) return null
  const n = Number(m[2])
  if (m[1] === 'grade') return n >= 1 && n <= 12 ? n - 1 : null
  return n >= 1 && n <= 3 ? n + 11 : null
}
