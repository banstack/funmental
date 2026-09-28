import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { BadgeDef } from '../lib/badges'
import type { AppData } from '../types'
import { BadgeArt } from './BadgeArt'

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

interface MedalProps {
  badge: BadgeDef
  data: AppData
  size?: number
  fresh?: boolean
}

/** The badge's artwork in its earned or locked state. */
export function BadgeMedal({ badge, data, size, fresh }: MedalProps) {
  const earned = Boolean(data.badges[badge.id])
  return (
    <BadgeArt
      glyph={badge.glyph}
      subject={badge.subject}
      metal={earned ? badge.metal?.(data) : undefined}
      banner={earned ? badge.banner?.(data) : undefined}
      locked={!earned}
      size={size}
      fresh={fresh}
    />
  )
}

/** Compact medal-only button for the profile grid; details open on click. */
export function BadgeButton({ badge, data, onOpen }: { badge: BadgeDef; data: AppData; onOpen: () => void }) {
  const earned = Boolean(data.badges[badge.id])
  return (
    <button
      className={`badge-button ${earned ? 'earned' : 'locked'}`}
      onClick={onOpen}
      aria-label={`${badge.name}, ${earned ? 'earned' : 'locked'}. Show details.`}
      title={badge.name}
    >
      <BadgeMedal badge={badge} data={data} size={76} />
    </button>
  )
}

/** Modal with a badge's full details. Closes on Escape, backdrop click or the close button. */
export function BadgeDetail({ badge, data, onClose }: { badge: BadgeDef; data: AppData; onClose: () => void }) {
  const award = data.badges[badge.id]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [onClose])

  return (
    <div className="badge-modal-backdrop" onClick={onClose}>
      <div
        className={`badge-modal ${award ? 'earned' : 'locked'} ${badge.subject ? `subject-${badge.subject}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="badge-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="icon-btn badge-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <BadgeMedal badge={badge} data={data} size={150} fresh={Boolean(award)} />
        <p className="eyebrow">{badge.group}</p>
        <h2 id="badge-modal-title">{badge.name}</h2>
        {award ? (
          <>
            {badge.detail && <p className="badge-modal-detail">{badge.detail(data)}</p>}
            <p className="muted small">Earned {formatDate(award.earnedAt)}</p>
          </>
        ) : (
          <>
            <p className="muted">{badge.hint}</p>
            {badge.to && (
              <Link to={badge.to} className="btn primary">
                Earn it →
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/** Horizontal card, used where a badge is announced (placement results). */
export function BadgeCard({ badge, data, fresh }: { badge: BadgeDef; data: AppData; fresh?: boolean }) {
  const award = data.badges[badge.id]
  return (
    <div className={`badge-card ${award ? 'earned' : 'locked'} ${badge.subject ? `subject-${badge.subject}` : ''}`}>
      <BadgeMedal badge={badge} data={data} size={84} fresh={fresh} />
      <div className="badge-body">
        <strong>{badge.name}</strong>
        {award ? (
          <>
            {badge.detail && <span>{badge.detail(data)}</span>}
            <span className="muted small">Earned {formatDate(award.earnedAt)}</span>
          </>
        ) : (
          <span className="muted small">{badge.hint}</span>
        )}
      </div>
    </div>
  )
}
