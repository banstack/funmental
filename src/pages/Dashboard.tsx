import { Link } from 'react-router-dom'
import { SessionList } from '../components/SessionList'
import { TierTrack } from '../components/TierTrack'
import { mastery, PROMOTE_AT } from '../lib/leveling'
import { streak, useAppData } from '../lib/store'
import { SUBJECTS } from '../lib/subjects'
import { bandOf, MAX_TIER, tierLabel } from '../lib/tiers'

export function Dashboard() {
  const data = useAppData()
  const placed = SUBJECTS.filter((s) => data.subjects[s.id].placed)
  const totalSteps = SUBJECTS.length * MAX_TIER
  const climbed = placed.reduce((sum, s) => sum + data.subjects[s.id].tier, 0)
  const answered = SUBJECTS.reduce((sum, s) => sum + data.subjects[s.id].answered, 0)
  const lowest = placed.length === SUBJECTS.length ? Math.min(...placed.map((s) => data.subjects[s.id].tier)) : null

  return (
    <div className="dashboard">
      <section className="hero">
        <div>
          <p className="eyebrow">Your brain gym</p>
          <h1>{placed.length === 0 ? 'Find your level.' : lowest !== null && lowest >= MAX_TIER ? 'College level across the board!' : 'Keep climbing.'}</h1>
          <p className="lead">
            Social media wears the fundamentals down. Train math, reading and science from Grade 1 up to College III.
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{streak(data.activeDays)}</span>
            <span className="stat-label">day streak</span>
          </div>
          <div className="stat">
            <span className="stat-value">{answered}</span>
            <span className="stat-label">answered</span>
          </div>
          <div className="stat">
            <span className="stat-value">{lowest === null ? '—' : bandOf(lowest).short}</span>
            <span className="stat-label">overall level</span>
          </div>
        </div>
        <div className="goal">
          <div className="goal-head">
            <span>Road to College III, all subjects</span>
            <span>{Math.round((climbed / totalSteps) * 100)}%</span>
          </div>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(climbed / totalSteps) * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="subject-grid">
        {SUBJECTS.map((s) => {
          const p = data.subjects[s.id]
          const rights = p.window.filter(Boolean).length
          return (
            <Link key={s.id} to={p.placed ? `/subject/${s.id}` : `/placement/${s.id}`} className={`subject-card subject-${s.id}`}>
              <div className="subject-card-head">
                <span className="glyph">{s.glyph}</span>
                <div>
                  <h2>{s.name}</h2>
                  <p className="muted">{s.tagline}</p>
                </div>
              </div>
              {p.placed ? (
                <>
                  <div className="level">
                    <span className="level-name">{tierLabel(p.tier)}</span>
                    <span className="level-band">{bandOf(p.tier).name}</span>
                  </div>
                  <TierTrack tier={p.tier} bestTier={p.bestTier} compact />
                  <div className="mastery">
                    <div className="bar small">
                      <div className="bar-fill" style={{ width: `${mastery(p) * 100}%` }} />
                    </div>
                    <span className="muted small">
                      {p.tier >= MAX_TIER ? 'Top level — keep it sharp' : `${rights}/${PROMOTE_AT} to ${tierLabel(p.tier + 1)}`}
                    </span>
                  </div>
                  <span className="btn primary">Train</span>
                </>
              ) : (
                <>
                  <p className="unplaced">Take a quick 8-question placement test to find your starting grade.</p>
                  <span className="btn primary">Find my level</span>
                </>
              )}
            </Link>
          )
        })}
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Recent sessions</h2>
          {data.sessions.length > 0 && <Link to="/history">See all</Link>}
        </div>
        <SessionList sessions={data.sessions.slice(0, 5)} />
      </section>
    </div>
  )
}
