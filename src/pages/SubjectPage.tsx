import { Link, Navigate, useParams } from 'react-router-dom'
import { SessionList } from '../components/SessionList'
import { TierTrack } from '../components/TierTrack'
import { mastery, PROMOTE_AT } from '../lib/leveling'
import { useAppData } from '../lib/store'
import { isSubject, learnPath, MODES, subjectMeta } from '../lib/subjects'
import { bandOf, MAX_TIER, tierLabel } from '../lib/tiers'

const MODE_ICONS = { rapid: '⚡', quiz: '✎', puzzle: '⧉' }

export function SubjectPage() {
  const { subject } = useParams()
  const data = useAppData()
  if (!isSubject(subject)) return <Navigate to="/" replace />
  const p = data.subjects[subject]
  if (!p.placed) return <Navigate to={`/placement/${subject}`} replace />

  const meta = subjectMeta(subject)
  const rights = p.window.filter(Boolean).length
  const acc = p.answered ? Math.round((p.correct / p.answered) * 100) : 0

  return (
    <div className={`subject-page subject-${subject}`}>
      <Link to="/" className="back">
        ← Dashboard
      </Link>
      <section className="panel subject-hero">
        <div className="subject-card-head">
          <span className="glyph big">{meta.glyph}</span>
          <div>
            <p className="eyebrow">{meta.name}</p>
            <h1>{tierLabel(p.tier)}</h1>
            <p className="muted">{bandOf(p.tier).name}</p>
          </div>
          <Link to={learnPath(subject, p.tier)} className="btn ghost study-link">
            📖 {tierLabel(p.tier)} study guide
          </Link>
        </div>
        <TierTrack tier={p.tier} bestTier={p.bestTier} />
        <div className="mastery">
          <div className="bar">
            <div className="bar-fill" style={{ width: `${mastery(p) * 100}%` }} />
          </div>
          <span className="muted small">
            {p.tier >= MAX_TIER
              ? "You've reached College III. Keep training to stay sharp."
              : `${rights} of ${PROMOTE_AT} correct in your last 10 to reach ${tierLabel(p.tier + 1)}`}
          </span>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-value">{p.answered}</span>
            <span className="stat-label">answered</span>
          </div>
          <div className="stat">
            <span className="stat-value">{acc}%</span>
            <span className="stat-label">lifetime accuracy</span>
          </div>
          <div className="stat">
            <span className="stat-value">{tierLabel(p.bestTier)}</span>
            <span className="stat-label">best level</span>
          </div>
        </div>
      </section>

      <section className="mode-grid">
        {MODES.map((m) => (
          <Link key={m.id} to={`/play/${subject}/${m.id}`} className="mode-card">
            <span className="mode-icon">{MODE_ICONS[m.id]}</span>
            <h2>{m.name}</h2>
            <p className="muted">{m.blurb}</p>
          </Link>
        ))}
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>{meta.name} sessions</h2>
          <Link to={`/placement/${subject}`} className="small">
            Retake placement
          </Link>
        </div>
        <SessionList sessions={data.sessions.filter((s) => s.subject === subject).slice(0, 8)} />
      </section>
    </div>
  )
}
