import type { Difficulty } from '../content/topics/types'

export interface Zone {
  id: 'sunlight' | 'twilight' | 'midnight' | 'abyss' | 'hadal'
  name: string
  top: number
  bottom: number
  difficulty: Difficulty
  /** Share-grid square for a right answer in this zone. */
  square: string
  /** Flat water color for the whole zone; the screen steps between them. */
  color: string
}

/** The bottom of the Challenger Deep, in meters. */
export const MAX_DEPTH = 10_935

export const ZONES: Zone[] = [
  { id: 'sunlight', name: 'Sunlight Zone', top: 0, bottom: 200, difficulty: 1, square: '🟨', color: '#2bb3c0' },
  { id: 'twilight', name: 'Twilight Zone', top: 200, bottom: 1000, difficulty: 2, square: '🟦', color: '#1d72b8' },
  { id: 'midnight', name: 'Midnight Zone', top: 1000, bottom: 4000, difficulty: 3, square: '🟪', color: '#25337a' },
  { id: 'abyss', name: 'Abyss', top: 4000, bottom: 6000, difficulty: 4, square: '🟫', color: '#171a45' },
  { id: 'hadal', name: 'Hadal Zone', top: 6000, bottom: MAX_DEPTH, difficulty: 5, square: '🟥', color: '#0b0b17' },
]

export function zoneIndexAt(depth: number): number {
  const i = ZONES.findIndex((z) => depth < z.bottom)
  return i === -1 ? ZONES.length - 1 : i
}

export const zoneAt = (depth: number) => ZONES[zoneIndexAt(depth)]

export const formatDepth = (m: number) => `${Math.round(m).toLocaleString('en-US')} m`

/** Plain-words difficulty, shown on each question. */
export const DIFFICULTY_NAMES = ['', 'Easy', 'Medium', 'Tricky', 'Hard', 'Expert'] as const

/** 0–1 position for a depth on a square-root scale, so the shallow zones aren't slivers. */
export const depthScale = (m: number) => Math.sqrt(Math.min(1, Math.max(0, m) / MAX_DEPTH))
