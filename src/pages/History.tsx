import { useState } from 'react'
import { SessionList } from '../components/SessionList'
import { resetAll, useAppData } from '../lib/store'
import { SUBJECTS } from '../lib/subjects'
import type { SubjectId } from '../types'

export function History() {
  const data = useAppData()
  const [filter, setFilter] = useState<SubjectId | 'all'>('all')
  const [confirming, setConfirming] = useState(false)
  const sessions = filter === 'all' ? data.sessions : data.sessions.filter((s) => s.subject === filter)

  const totalMinutes = Math.round(data.sessions.reduce((sum, s) => sum + (s.endedAt - s.startedAt), 0) / 60000)

  return (
    <div className="history">
      <section className="panel">
        <div className="section-head">
          <h1>History</h1>
          <span className="muted">
            {data.sessions.length} sessions · {totalMinutes} min trained
          </span>
        </div>
        <div className="filters">
          {(['all', ...SUBJECTS.map((s) => s.id)] as const).map((f) => (
            <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : SUBJECTS.find((s) => s.id === f)!.name}
            </button>
          ))}
        </div>
        <SessionList sessions={sessions} />
      </section>

      <section className="panel danger-zone">
        <h2>Reset progress</h2>
        <p className="muted">Progress is saved in this browser only. Resetting clears all levels, sessions and your streak.</p>
        {confirming ? (
          <div className="row">
            <button
              className="btn danger"
              onClick={() => {
                resetAll()
                setConfirming(false)
              }}
            >
              Yes, erase everything
            </button>
            <button className="btn ghost" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn ghost" onClick={() => setConfirming(true)}>
            Reset all progress
          </button>
        )}
      </section>
    </div>
  )
}
