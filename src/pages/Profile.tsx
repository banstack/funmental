import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActivityHeatmap } from '../components/ActivityHeatmap'
import { Avatar } from '../components/Avatar'
import { BadgeButton, BadgeDetail } from '../components/BadgeCard'
import { TierTrack } from '../components/TierTrack'
import { BADGES, badgeById } from '../lib/badges'
import { longestStreak, personalBest, streak, totals } from '../lib/stats'
import { setProfileName, useAppData } from '../lib/store'
import { MODES, SUBJECTS } from '../lib/subjects'
import { bandOf, tierLabel } from '../lib/tiers'
import type { AppData, SubjectId } from '../types'

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatMinutes(min: number) {
  if (min < 60) return `${min}m`
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

export function Profile() {
  const data = useAppData()
  const t = totals(data)
  const earnedCount = BADGES.filter((b) => data.badges[b.id]).length
  const placed = SUBJECTS.filter((s) => data.subjects[s.id].placed)
  const lowest = placed.length === SUBJECTS.length ? Math.min(...placed.map((s) => data.subjects[s.id].tier)) : null
  const groups = [...new Set(BADGES.map((b) => b.group))]
  const [openBadge, setOpenBadge] = useState<string | null>(null)
  const closeBadge = useCallback(() => setOpenBadge(null), [setOpenBadge])

  const tiles = [
    { label: 'questions answered', value: t.answered.toLocaleString() },
    { label: 'accuracy', value: t.answered ? `${Math.round(t.accuracy * 100)}%` : '—' },
    { label: 'sessions', value: t.sessions.toLocaleString() },
    { label: 'time trained', value: formatMinutes(t.minutes) },
    { label: 'day streak', value: String(streak(data.activeDays)) },
    { label: 'longest streak', value: String(longestStreak(data.activeDays)) },
  ]

  return (
    <div className="profile">
      <section className="panel profile-header">
        <Avatar name={data.profile.name} size="lg" />
        <div className="profile-id">
          <NameEditor name={data.profile.name} />
          <p className="muted">Training since {formatDate(data.profile.createdAt)}</p>
        </div>
        <div className="profile-summary">
          <div>
            <span className="stat-value">{lowest === null ? '—' : bandOf(lowest).name}</span>
            <span className="stat-label">overall level</span>
          </div>
          <div>
            <span className="stat-value">
              {earnedCount}/{BADGES.length}
            </span>
            <span className="stat-label">badges</span>
          </div>
        </div>
      </section>

      <section className="panel badge-showcase">
        <div className="section-head">
          <h2>Badges</h2>
          <span className="muted small">
            {earnedCount} of {BADGES.length} earned
          </span>
        </div>
        {groups.map((group) => (
          <div key={group} className="badge-group">
            <h3>{group}</h3>
            <div className="badge-grid">
              {BADGES.filter((b) => b.group === group).map((b) => (
                <BadgeButton key={b.id} badge={b} data={data} onOpen={() => setOpenBadge(b.id)} />
              ))}
            </div>
          </div>
        ))}
      </section>
      {openBadge && badgeById(openBadge) && <BadgeDetail badge={badgeById(openBadge)!} data={data} onClose={closeBadge} />}

      <section className="stat-row kpi-row" aria-label="Lifetime stats">
        {tiles.map((tile) => (
          <div key={tile.label} className="stat">
            <span className="stat-value">{tile.value}</span>
            <span className="stat-label">{tile.label}</span>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Subjects</h2>
        <div className="profile-subjects">
          {SUBJECTS.map((s) => (
            <SubjectStats key={s.id} subject={s.id} data={data} />
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Activity</h2>
        <ActivityHeatmap sessions={data.sessions} />
      </section>
    </div>
  )
}

function NameEditor({ name }: { name: string }) {
  const [editing, setEditing] = useState(!name)
  const [draft, setDraft] = useState(name)

  if (!editing) {
    return (
      <div className="name-row">
        <h1>{name}</h1>
        <button
          className="btn ghost small"
          onClick={() => {
            setDraft(name)
            setEditing(true)
          }}
        >
          Edit
        </button>
      </div>
    )
  }

  return (
    <form
      className="name-row"
      onSubmit={(e) => {
        e.preventDefault()
        if (!draft.trim()) return
        setProfileName(draft)
        setEditing(false)
      }}
    >
      <input
        className="name-input"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Your name"
        aria-label="Your name"
        maxLength={40}
        autoFocus
      />
      <button className="btn primary small" type="submit" disabled={!draft.trim()}>
        Save
      </button>
      {name && (
        <button className="btn ghost small" type="button" onClick={() => setEditing(false)}>
          Cancel
        </button>
      )}
    </form>
  )
}

function SubjectStats({ subject, data }: { subject: SubjectId; data: AppData }) {
  const meta = SUBJECTS.find((s) => s.id === subject)!
  const p = data.subjects[subject]
  const start = data.placements[subject]

  if (!p.placed || !start) {
    return (
      <div className={`profile-subject subject-${subject}`}>
        <div className="profile-subject-head">
          <span className="glyph">{meta.glyph}</span>
          <h3>{meta.name}</h3>
        </div>
        <p className="muted">
          Not placed yet. <Link to={`/placement/${subject}`}>Take the placement test</Link> to set your starting line.
        </p>
      </div>
    )
  }

  const climbed = p.tier - start.tier
  const bests = MODES.map((m) => {
    const best = personalBest(data.sessions, subject, m.id)
    const value = !best ? '—' : m.id === 'rapid' ? `${best.correct} correct` : `${Math.round((best.correct / best.answered) * 100)}%`
    return { mode: m.name, value }
  })

  return (
    <div className={`profile-subject subject-${subject}`}>
      <div className="profile-subject-head">
        <span className="glyph">{meta.glyph}</span>
        <h3>{meta.name}</h3>
        <span className={`climb ${climbed > 0 ? 'up' : climbed < 0 ? 'down' : ''}`}>
          {climbed > 0 ? `▲ ${climbed} grade${climbed === 1 ? '' : 's'} climbed` : climbed < 0 ? `▼ ${-climbed} below start` : 'At starting level'}
        </span>
      </div>
      <TierTrack tier={p.tier} bestTier={p.bestTier} startTier={start.tier} />
      <div className="track-key muted small" aria-hidden>
        <span>
          <i className="key-swatch start" /> Where you began
        </span>
        <span>
          <i className="key-swatch current" /> Now
        </span>
      </div>
      <dl className="profile-facts">
        <div>
          <dt>Started</dt>
          <dd>{tierLabel(start.tier)}</dd>
        </div>
        <div>
          <dt>Now</dt>
          <dd>{tierLabel(p.tier)}</dd>
        </div>
        <div>
          <dt>Best</dt>
          <dd>{tierLabel(p.bestTier)}</dd>
        </div>
        <div>
          <dt>Accuracy</dt>
          <dd>{p.answered ? `${Math.round((p.correct / p.answered) * 100)}%` : '—'}</dd>
        </div>
        {bests.map((b) => (
          <div key={b.mode}>
            <dt>Best {b.mode}</dt>
            <dd>{b.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
