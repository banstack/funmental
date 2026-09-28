import { modeMeta, subjectMeta } from '../lib/subjects'
import { tierLabel } from '../lib/tiers'
import type { SessionRecord } from '../types'

function formatWhen(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function SessionList({ sessions }: { sessions: SessionRecord[] }) {
  if (sessions.length === 0) return <p className="muted">No sessions yet. Pick a subject and start training.</p>
  return (
    <ul className="sessions">
      {sessions.map((s) => {
        const acc = Math.round((s.correct / s.answered) * 100)
        const delta = s.tierEnd - s.tierStart
        return (
          <li key={s.id} className={`session subject-${s.subject}`}>
            <span className="session-dot" />
            <div className="session-main">
              <strong>
                {subjectMeta(s.subject).name} · {modeMeta(s.mode).name}
              </strong>
              <span className="muted small">{formatWhen(s.startedAt)}</span>
            </div>
            <div className="session-score">
              <strong>
                {s.correct}/{s.answered}
              </strong>
              <span className="muted small">{acc}%</span>
            </div>
            <div className={`session-level ${delta > 0 ? 'up' : delta < 0 ? 'down' : ''}`}>
              {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
              {tierLabel(s.tierEnd)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
