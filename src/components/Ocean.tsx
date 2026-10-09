import { CREATURES } from '../lib/creatures'
import { ZONES, depthScale, formatDepth, zoneAt } from '../lib/ocean'
import { CreatureIcon } from './Icons'

/** The water behind a dive: one flat color per zone, stepping down as you descend, with the zone's creatures drifting past. */
export function Ocean({ depth }: { depth: number }) {
  const zone = zoneAt(depth)
  const drifters = CREATURES.filter((c) => c.zone === zone.id && c.id !== 'challenger')
  return (
    <div className={`ocean zone-${zone.id}`} style={{ background: zone.color }} aria-hidden>
      {drifters.map((c, i) => (
        <span key={c.id} className="drifter" style={{ top: `${18 + i * 26}%`, animationDelay: `${-i * 7}s`, animationDuration: `${26 + i * 6}s` }}>
          <CreatureIcon id={c.id} size={56} />
        </span>
      ))}
    </div>
  )
}

const gaugePos = (m: number) => depthScale(m) * 100

/** Vertical depth gauge: the zones as flat bands, with a marker at your depth. */
export function DepthGauge({ depth }: { depth: number }) {
  return (
    <div className="gauge" role="img" aria-label={`Depth ${formatDepth(depth)}, ${zoneAt(depth).name}`}>
      {ZONES.map((z) => (
        <span
          key={z.id}
          className="gauge-band"
          style={{ top: `${gaugePos(z.top)}%`, height: `${gaugePos(z.bottom) - gaugePos(z.top)}%`, background: z.color }}
          title={z.name}
        />
      ))}
      <span className="gauge-marker" style={{ top: `${gaugePos(depth)}%` }} />
    </div>
  )
}
