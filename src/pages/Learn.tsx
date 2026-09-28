import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { MasteryQuiz } from '../components/MasteryQuiz'
import { RichText } from '../components/RichText'
import { getLesson, lessonsFor, slug, vocabularyFor, type Lesson } from '../content/lessons'
import { masteredCount, masteryKey, resetMastery, useMastery } from '../lib/mastery'
import { useAppData } from '../lib/store'
import { isSubject, learnPath, MODES, SUBJECTS, subjectMeta } from '../lib/subjects'
import { BANDS, bandOf, MAX_TIER, parseTierSlug, TIERS, tierLabel } from '../lib/tiers'
import type { SubjectId } from '../types'

/** Redirects /learn and /learn/:subject to the grade the user is currently at. */
export function LearnIndex() {
  const { subject } = useParams()
  const data = useAppData()
  const id: SubjectId = isSubject(subject) ? subject : 'math'
  const p = data.subjects[id]
  return <Navigate to={learnPath(id, p.placed ? p.tier : 0)} replace />
}

interface Section {
  id: string
  title: string
}

function sectionsOf(lesson: Lesson, hasVocab: boolean, tier: number): Section[] {
  const out = lesson.topics.map((t) => ({ id: slug(t.title), title: t.title }))
  if (lesson.formulas?.length) out.push({ id: 'key-formulas', title: 'Key formulas' })
  if (hasVocab) out.push({ id: 'key-vocabulary', title: 'Key vocabulary' })
  out.push({ id: 'master', title: `Master ${tierLabel(tier)}` })
  out.push({ id: 'practice', title: 'Training' })
  return out
}

/**
 * Tracks which section heading was most recently scrolled past. `jumpTo`
 * scrolls to a section and pins it as active while the smooth scroll runs.
 */
function useActiveSection(ids: string[]): [string | undefined, (id: string) => void] {
  const [active, setActive] = useState<string | undefined>(ids[0])
  const lockUntil = useRef(0)

  const jumpTo = useCallback((id: string) => {
    lockUntil.current = Date.now() + 1000
    setActive(id)
    // Wait a frame so layout changes (e.g. the mobile menu closing) settle before measuring.
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      if (Date.now() < lockUntil.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let current = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 120) current = id
        }
        // At the very bottom, the last section wins even if its heading can't reach the top.
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = ids[ids.length - 1]
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [ids])
  return [active, jumpTo]
}

export function Learn() {
  const { subject, grade } = useParams()
  const tier = parseTierSlug(grade)
  if (!isSubject(subject)) return <Navigate to="/learn" replace />
  if (tier === null) return <Navigate to={`/learn/${subject}`} replace />
  return <LearnPage subject={subject} tier={tier} />
}

function LearnPage({ subject, tier }: { subject: SubjectId; tier: number }) {
  const data = useAppData()
  const progress = data.subjects[subject]
  const lesson = getLesson(subject, tier)!
  const vocab = vocabularyFor(subject, tier)
  const sections = useMemo(() => sectionsOf(lesson, vocab.length > 0, tier), [lesson, vocab.length, tier])
  const mastery = useMastery()
  const isMastered = (t: number) => Boolean(mastery.grades[masteryKey(subject, t)]?.masteredAt)
  const mastered = masteredCount(mastery, subject)
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const [active, jumpTo] = useActiveSection(sectionIds)
  const navRef = useRef<HTMLElement>(null)
  const [navOpen, setNavOpen] = useState(false)
  const meta = subjectMeta(subject)

  useEffect(() => {
    // Keep the open grade visible in the sidebar's own scroll area.
    const nav = navRef.current
    const current = nav?.querySelector<HTMLElement>('.wiki-grade.active')
    if (nav && current) nav.scrollTop = current.offsetTop - nav.clientHeight / 3
  }, [subject, tier])
  const closeNav = () => setNavOpen(false)

  return (
    <div className={`wiki subject-${subject}`}>
      <button className="wiki-nav-toggle" onClick={() => setNavOpen((o) => !o)} aria-expanded={navOpen}>
        <span>
          {meta.name} · {tierLabel(tier)}
        </span>
        <span aria-hidden>{navOpen ? '▴' : '▾'}</span>
      </button>

      <aside ref={navRef} className={`wiki-nav ${navOpen ? 'open' : ''}`}>
        <div className="wiki-tabs" role="tablist">
          {SUBJECTS.map((s) => {
            const p = data.subjects[s.id]
            return (
              <Link
                key={s.id}
                to={learnPath(s.id, s.id === subject ? tier : p.placed ? p.tier : 0)}
                className={`wiki-tab subject-${s.id} ${s.id === subject ? 'active' : ''}`}
                onClick={closeNav}
                role="tab"
                aria-selected={s.id === subject}
              >
                {s.name}
              </Link>
            )
          })}
        </div>
        <MasterySummary subject={subject} mastered={mastered} />
        <nav className="wiki-toc" aria-label={`${meta.name} study guide`}>
          {BANDS.map((band) => (
            <div key={band.name} className="wiki-band">
              <h4>{band.name}</h4>
              <ul>
                {TIERS.filter((t) => t >= band.first && t <= band.last).map((t) => {
                  const isCurrent = t === tier
                  return (
                    <li key={t}>
                      <Link
                        to={learnPath(subject, t)}
                        className={`wiki-grade ${isCurrent ? 'active' : ''}`}
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={closeNav}
                      >
                        <span className="wiki-grade-name">
                          {tierLabel(t)}
                          {progress.placed && progress.tier === t && <span className="you">You</span>}
                          {isMastered(t) && (
                            <span className="mastered-check" role="img" aria-label="Mastered" title="Mastered">
                              ✓
                            </span>
                          )}
                        </span>
                        <span className="wiki-grade-title">{lessonsFor(subject)[t].title}</span>
                      </Link>
                      {isCurrent && (
                        <ul className="wiki-sections">
                          {sections.map((s) => (
                            <li key={s.id}>
                              <button
                                className={active === s.id ? 'active' : ''}
                                onClick={() => {
                                  closeNav()
                                  jumpTo(s.id)
                                }}
                              >
                                {s.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <article className="wiki-content">
        <p className="breadcrumb">
          <Link to="/learn">Learn</Link> <span>›</span> <Link to={`/learn/${subject}`}>{meta.name}</Link> <span>›</span> {bandOf(tier).name}
        </p>
        <header className="wiki-header">
          <p className="eyebrow">
            {meta.name} · {tierLabel(tier)}
            {isMastered(tier) && <span className="mastered-pill">✓ Mastered</span>}
          </p>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.summary}</p>
          <ul className="wiki-chips">
            {sections.map((s) => (
              <li key={s.id}>
                <button className="chip" onClick={() => jumpTo(s.id)}>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </header>

        {lesson.topics.map((topic, i) => (
          <section key={topic.title} id={slug(topic.title)} className="wiki-section">
            <h2>
              <span className="wiki-num">{i + 1}</span>
              {topic.title}
            </h2>
            {topic.body.map((para, j) => (
              <p key={j}>
                <RichText text={para} />
              </p>
            ))}
            {topic.example && (
              <div className="wiki-example">
                <div className="wiki-example-label">Example</div>
                <p className="wiki-example-prompt">
                  <RichText text={topic.example.prompt} />
                </p>
                <ol>
                  {topic.example.steps.map((step, j) => (
                    <li key={j}>
                      <RichText text={step} />
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {topic.tip && (
              <div className="wiki-tip">
                <strong>Tip</strong>
                <span>
                  <RichText text={topic.tip} />
                </span>
              </div>
            )}
          </section>
        ))}

        {lesson.formulas?.length ? (
          <section id="key-formulas" className="wiki-section">
            <h2>Key formulas</h2>
            <table className="wiki-table">
              <tbody>
                {lesson.formulas.map(([name, formula]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td className="formula">{formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {vocab.length > 0 && (
          <section id="key-vocabulary" className="wiki-section">
            <h2>Key vocabulary</h2>
            <table className="wiki-table">
              <tbody>
                {vocab.map(([term, def]) => (
                  <tr key={term}>
                    <th scope="row">{term}</th>
                    <td>{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section id="master" className="wiki-section">
          <h2>Master {tierLabel(tier)}</h2>
          <MasteryQuiz key={`${subject}-${tier}`} subject={subject} tier={tier} />
        </section>

        <section id="practice" className="wiki-section">
          <h2>Training</h2>
          <PracticeCard subject={subject} tier={tier} />
        </section>

        <nav className="wiki-pager" aria-label="Grade navigation">
          {tier > 0 ? (
            <Link to={learnPath(subject, tier - 1)} className="wiki-pager-link">
              <span className="muted small">← Previous</span>
              <strong>{tierLabel(tier - 1)}</strong>
            </Link>
          ) : (
            <span />
          )}
          {tier < MAX_TIER && (
            <Link to={learnPath(subject, tier + 1)} className="wiki-pager-link next">
              <span className="muted small">Next →</span>
              <strong>{tierLabel(tier + 1)}</strong>
            </Link>
          )}
        </nav>
      </article>
    </div>
  )
}

/** "3 of 15 grades mastered" with a progress bar and a two-step reset. */
function MasterySummary({ subject, mastered }: { subject: SubjectId; mastered: number }) {
  const [confirming, setConfirming] = useState(false)
  const total = TIERS.length
  return (
    <div className="mastery-summary">
      <div className="mastery-summary-head">
        <span>
          <strong>{mastered}</strong>/{total} grades mastered
        </span>
        {mastered > 0 &&
          (confirming ? (
            <span className="mastery-reset">
              <button
                className="link-btn danger"
                onClick={() => {
                  resetMastery(subject)
                  setConfirming(false)
                }}
              >
                Reset
              </button>
              <button className="link-btn" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button className="link-btn" onClick={() => setConfirming(true)} aria-label={`Reset ${subjectMeta(subject).name} mastery`}>
              Reset
            </button>
          ))}
      </div>
      <div className="bar small mastery-bar">
        <div className="bar-fill" style={{ width: `${(mastered / total) * 100}%` }} />
      </div>
    </div>
  )
}

function PracticeCard({ subject, tier }: { subject: SubjectId; tier: number }) {
  const p = useAppData().subjects[subject]
  const meta = subjectMeta(subject)

  if (!p.placed) {
    return (
      <div className="wiki-practice">
        <p>Practice questions adapt to your level. Take the 8-question {meta.name} placement test first to find where you stand.</p>
        <Link to={`/placement/${subject}`} className="btn primary">
          Find my level
        </Link>
      </div>
    )
  }

  const relation =
    p.tier === tier
      ? `This is your current ${meta.name} level. Practice questions come from exactly this material.`
      : p.tier > tier
        ? `You're past this grade (you're at ${tierLabel(p.tier)}). Use this page as a refresher.`
        : `You're at ${tierLabel(p.tier)}. Practice starts there and moves you up as you improve, so this page is a preview of what's ahead.`

  return (
    <div className="wiki-practice">
      <p>{relation}</p>
      <div className="row">
        {MODES.map((m) => (
          <Link key={m.id} to={`/play/${subject}/${m.id}`} className="btn primary">
            {m.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
