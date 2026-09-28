import type { AppData, BadgeAward, SubjectId } from '../types'
import { SUBJECTS, type SubjectMeta } from './subjects'
import { bandOf, tierLabel } from './tiers'

/** Rim finish of the medal. */
export type Metal = 'bronze' | 'silver' | 'gold' | 'diamond'

/** Bronze for Elementary up to diamond for College. */
export function metalForTier(tier: number): Metal {
  const band = bandOf(tier).name
  return band === 'College' ? 'diamond' : band === 'High School' ? 'gold' : band === 'Middle School' ? 'silver' : 'bronze'
}

export interface BadgeDef {
  id: string
  /** Badges are shown grouped under this heading. */
  group: string
  name: string
  glyph: string
  /** Tints the badge with the subject's color. */
  subject?: SubjectId
  /** How to earn it, shown while locked. */
  hint: string
  /** Where to go to work toward it, linked while locked. */
  to?: string
  earned: (data: AppData) => boolean
  /** When it was earned, if knowable from history. Defaults to now. */
  earnedAt?: (data: AppData) => number
  /** Extra line shown once earned. */
  detail?: (data: AppData) => string
  /** Short text on the medal's ribbon once earned. */
  banner?: (data: AppData) => string
  /** Rim finish once earned. Defaults to gold. */
  metal?: (data: AppData) => Metal
}

function placementBadge(s: SubjectMeta): BadgeDef {
  return {
    id: `placement-${s.id}`,
    group: 'Placement',
    name: `${s.name} Starting Line`,
    glyph: s.glyph,
    subject: s.id,
    hint: `Take the ${s.name} placement test to mark where you began.`,
    to: `/placement/${s.id}`,
    earned: (d) => d.placements[s.id] !== undefined,
    earnedAt: (d) => d.placements[s.id]!.at,
    detail: (d) => {
      const tier = d.placements[s.id]!.tier
      return `Began at ${tierLabel(tier)} · ${bandOf(tier).name}`
    },
    banner: (d) => tierLabel(d.placements[s.id]!.tier),
    metal: (d) => metalForTier(d.placements[s.id]!.tier),
  }
}

/**
 * Every badge in the game. To add one, append a definition: it is checked
 * after every change and awarded automatically, including retroactively.
 */
export const BADGES: BadgeDef[] = [...SUBJECTS.map(placementBadge)]

export const badgeById = (id: string) => BADGES.find((b) => b.id === id)

/** Badges whose conditions are met but that have not been awarded yet. */
export function newlyEarned(data: AppData, now = Date.now()): Record<string, BadgeAward> {
  const out: Record<string, BadgeAward> = {}
  for (const b of BADGES) {
    if (data.badges[b.id] || !b.earned(data)) continue
    out[b.id] = { earnedAt: b.earnedAt?.(data) ?? now }
  }
  return out
}
