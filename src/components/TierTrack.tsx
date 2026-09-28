import { BANDS, TIERS, tierLabel, tierShort } from '../lib/tiers'

interface Props {
  tier: number
  bestTier?: number
  /** Marks where the subject began (its first placement). */
  startTier?: number
  compact?: boolean
}

/** The 15-step journey from Grade 1 to College III, grouped into bands. */
export function TierTrack({ tier, bestTier = tier, startTier, compact }: Props) {
  return (
    <div className={`track ${compact ? 'compact' : ''}`} role="img" aria-label={`Current level: ${tierLabel(tier)}${startTier !== undefined ? `, began at ${tierLabel(startTier)}` : ''}`}>
      {BANDS.map((band) => (
        <div className="track-band" key={band.name} style={{ flexGrow: band.last - band.first + 1 }}>
          <div className="track-steps">
            {TIERS.filter((t) => t >= band.first && t <= band.last).map((t) => (
              <div
                key={t}
                className={`track-step ${t < tier ? 'done' : ''} ${t === tier ? 'current' : ''} ${t > tier && t <= bestTier ? 'best' : ''} ${t === startTier ? 'start' : ''}`}
                title={`${tierLabel(t)}${t === startTier ? ' (where you began)' : ''}${t === tier ? ' (current)' : ''}`}
              >
                {!compact && <span>{tierShort(t)}</span>}
              </div>
            ))}
          </div>
          {!compact && <div className="track-label">{band.name}</div>}
        </div>
      ))}
    </div>
  )
}
