import { useMemo, useState } from 'react'
import { answeredByDay, todayKey } from '../lib/stats'
import type { SessionRecord } from '../types'

const WEEKS = 17
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

interface Cell {
  key: string
  date: Date
  count: number
  level: number
  future: boolean
}

function describe(cell: Cell) {
  const day = cell.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  return `${day}: ${cell.count === 0 ? 'no practice' : `${cell.count} question${cell.count === 1 ? '' : 's'}`}`
}

/** Calendar of questions answered per day over the last ~4 months, one hue light → dark. */
export function ActivityHeatmap({ sessions }: { sessions: SessionRecord[] }) {
  const [hovered, setHovered] = useState<Cell | null>(null)
  // Captured once per mount; noon avoids DST edges when stepping by days.
  const [today] = useState(() => {
    const d = new Date()
    d.setHours(12, 0, 0, 0)
    return d
  })
  const todaysKey = todayKey(today)

  const { weeks, total, activeDays } = useMemo(() => {
    const counts = answeredByDay(sessions)
    const start = new Date(today)
    start.setDate(start.getDate() - start.getDay() - (WEEKS - 1) * 7)

    const cells: Cell[] = []
    for (const d = new Date(start); cells.length < WEEKS * 7; d.setDate(d.getDate() + 1)) {
      const key = todayKey(d)
      cells.push({ key, date: new Date(d), count: counts.get(key) ?? 0, level: 0, future: d > today })
    }
    const max = Math.max(0, ...cells.map((c) => c.count))
    for (const c of cells) if (c.count > 0) c.level = Math.min(4, Math.max(1, Math.ceil((c.count / max) * 4)))

    const weeks: Cell[][] = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
    const inRange = cells.filter((c) => !c.future)
    return {
      weeks,
      total: inRange.reduce((s, c) => s + c.count, 0),
      activeDays: inRange.filter((c) => c.count > 0).length,
    }
  }, [sessions, today])

  return (
    <div className="heatmap">
      <div className="heatmap-scroll">
        <div className="heatmap-grid" style={{ gridTemplateColumns: `auto repeat(${WEEKS}, var(--cell))` }}>
          <span />
          {weeks.map((w, i) => {
            const first = w[0].date
            const newMonth = i === 0 || first.getMonth() !== weeks[i - 1][0].date.getMonth()
            return (
              <span key={w[0].key} className="heatmap-month">
                {newMonth ? first.toLocaleDateString(undefined, { month: 'short' }) : ''}
              </span>
            )
          })}
          {DAY_LABELS.map((label, row) => (
            <Row key={row} label={label} cells={weeks.map((w) => w[row])} todaysKey={todaysKey} onHover={setHovered} />
          ))}
        </div>
      </div>
      <div className="heatmap-foot">
        <span className="muted small" aria-live="polite">
          {hovered ? describe(hovered) : `${total} questions on ${activeDays} day${activeDays === 1 ? '' : 's'} in the last ${WEEKS} weeks`}
        </span>
        <span className="heatmap-legend muted small" aria-hidden>
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`heatmap-cell l${l}`} />
          ))}
          More
        </span>
      </div>
    </div>
  )
}

function Row({ label, cells, todaysKey, onHover }: { label: string; cells: Cell[]; todaysKey: string; onHover: (c: Cell | null) => void }) {
  return (
    <>
      <span className="heatmap-day">{label}</span>
      {cells.map((c) =>
        c.future ? (
          <span key={c.key} />
        ) : (
          <span
            key={c.key}
            className={`heatmap-cell l${c.level} ${c.key === todaysKey ? 'today' : ''}`}
            role="img"
            aria-label={describe(c)}
            onMouseEnter={() => onHover(c)}
            onMouseLeave={() => onHover(null)}
          />
        ),
      )}
    </>
  )
}
