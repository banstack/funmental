import { DAILY_DEPTHS, dailyDepth } from '../lib/daily'
import { MAX_DEPTH, ZONES, depthScale, formatDepth } from '../lib/ocean'

/** Depth after each daily question if every answer is right. */
const PLANNED = DAILY_DEPTHS.map((_, i) => DAILY_DEPTHS.slice(0, i + 1).reduce((a, b) => a + b, 0))

const pct = (m: number) => `${depthScale(m) * 100}%`

/** The ocean as a cross-section: one flat band per zone, with a rung for each daily question. */
export function DepthLadder({ depth }: { depth?: number }) {
  return (
    <div className="ladder" role="img" aria-label={`Seven questions from the surface to ${formatDepth(MAX_DEPTH)}`}>
      {ZONES.map((z) => (
        <div key={z.id} className="ladder-band" style={{ top: pct(z.top), height: `calc(${pct(z.bottom)} - ${pct(z.top)})`, background: z.color }}>
          <span>{z.name}</span>
        </div>
      ))}
      {PLANNED.map((m, i) => (
        <span key={m} className={`rung ${depth !== undefined && depth >= m ? 'reached' : ''} ${i === PLANNED.length - 1 ? 'end' : ''}`} style={{ top: pct(m), left: `calc(18px + ${i} * (100% - 150px) / 5)` }}>
          <i />
          {formatDepth(m)}
          {i === PLANNED.length - 1 && ' · Challenger Deep'}
        </span>
      ))}
      {depth !== undefined && depth > 0 && depth < MAX_DEPTH && !PLANNED.includes(depth) && (
        <span className="rung reached you" style={{ top: pct(depth) }}>
          <i />
          You · {formatDepth(depth)}
        </span>
      )}
    </div>
  )
}

const W = 320
const H = 150
const x = (i: number) => 10 + (i * (W - 60)) / 7
const y = (m: number) => 8 + depthScale(m) * (H - 16)

function steps(depths: readonly number[]): string {
  let d = `M${x(0)} ${y(0)}`
  depths.forEach((m, i) => (d += ` H${x(i + 1)} V${y(m)}`))
  return d
}

/** A dive-log style profile: the planned descent dashed, the actual one solid. */
export function DiveProfile({ answers }: { answers: readonly boolean[] }) {
  const actual = answers.map((_, i) => dailyDepth(answers.slice(0, i + 1)))
  const depth = actual.at(-1) ?? 0
  return (
    <svg className="profile" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Dive profile, ending at ${formatDepth(depth)}`}>
      {ZONES.slice(0, -1).map((z) => (
        <g key={z.id}>
          <line className="profile-grid" x1={x(0)} x2={W - 6} y1={y(z.bottom)} y2={y(z.bottom)} />
          <text className="profile-label" x={W - 6} y={y(z.bottom) - 3} textAnchor="end">
            {z.bottom.toLocaleString('en-US')}
          </text>
        </g>
      ))}
      <path className="profile-plan" d={steps(PLANNED)} />
      <path className="profile-line" d={steps(actual)} />
      <circle className="profile-end" cx={x(actual.length)} cy={y(depth)} r="4" />
    </svg>
  )
}
