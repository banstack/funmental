import { BANDS, TIERS, tierLabel, tierShort } from '../lib/tiers'

interface Props {
  tier: number
  bestTier?: number
  compact?: boolean
}

/** The 15-step journey from Grade 1 to College III, grouped into bands. */
export function TierTrack({ tier, bestTier = tier, compact }: Props) {
  return (
    <div className={`track ${compact ? 'compact' : ''}`} role="img" aria-label={`Current level: ${tierLabel(tier)}`}>
      {BANDS.map((band) => (
        <div className="track-band" key={band.name} style={{ flexGrow: band.last - band.first + 1 }}>
          <div className="track-steps">
            {TIERS.filter((t) => t >= band.first && t <= band.last).map((t) => (
              <div
                key={t}
                className={`track-step ${t < tier ? 'done' : ''} ${t === tier ? 'current' : ''} ${t > tier && t <= bestTier ? 'best' : ''}`}
                title={tierLabel(t)}
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
