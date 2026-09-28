import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ActivityHeatmap } from '../components/ActivityHeatmap'
import { SessionList } from '../components/SessionList'
import { TierTrack } from '../components/TierTrack'
import { mastery, PROMOTE_AT } from '../lib/leveling'
import { answeredInLastDays, longestStreak, streak } from '../lib/stats'
import { useAppData } from '../lib/store'
import { SUBJECTS } from '../lib/subjects'
import { bandOf, MAX_TIER, tierLabel } from '../lib/tiers'

export function Dashboard() {
  const data = useAppData()
  const name = data.profile.name.trim()
  const days = streak(data.activeDays)
  const longest = longestStreak(data.activeDays)
  // Captured once per visit so render stays pure.
  const [now] = useState(() => new Date())
  const thisWeek = answeredInLastDays(data.sessions, 7, now)

  return (
    <div className="dashboard">
      <section className="panel welcome">
        <div className="welcome-text">
          <h1>{name ? `Welcome back, ${name}` : data.sessions.length ? 'Welcome back' : 'Welcome to funmental'}</h1>
          {!data.sessions.length && (
            <p className="muted">Work out your fundamentals in math, reading and science, from Grade 1 to College III.</p>
          )}
          {days > 0 ? (
            <p className="welcome-streak">
              🔥 <strong>{days}-day streak</strong>
              <span className="muted small">longest {longest}</span>
            </p>
          ) : (
            <p className="muted">No streak yet. Answer a question today to start one.</p>
          )}
          <ul className="welcome-facts">
            <li>
              <strong>{thisWeek}</strong> questions this week
            </li>
            <li>
              <strong>{data.activeDays.length}</strong> active {data.activeDays.length === 1 ? 'day' : 'days'}
            </li>
          </ul>
        </div>
        <ActivityHeatmap sessions={data.sessions} />
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
