import { useId } from 'react'
import type { Metal } from '../lib/badges'
import type { SubjectId } from '../types'

/** [highlight, base, shadow] for the medal face. */
const FACES: Record<SubjectId | 'default', [string, string, string]> = {
  math: ['#a9b8ff', '#4f6bff', '#2a3cb5'],
  reading: ['#ffc4a1', '#f0743e', '#a8411a'],
  science: ['#8ef0dc', '#14a38b', '#0a5f50'],
  default: ['#c1b8ff', '#5b4bff', '#3122a8'],
}

/** [highlight, mid, deep] for the rim. */
const METALS: Record<Metal, [string, string, string]> = {
  bronze: ['#ffd9b0', '#c7823f', '#6e3d17'],
  silver: ['#ffffff', '#c5ccd8', '#6b7382'],
  gold: ['#fff6c2', '#f2c230', '#94620a'],
  diamond: ['#f2fdff', '#8fe3ff', '#3f7fd6'],
}

const HEX_OUTER = '60,6 105,32 105,84 60,110 15,84 15,32'
const HEX_INNER = '60,17 95.5,37.5 95.5,78.5 60,99 24.5,78.5 24.5,37.5'
const BANNER = '6,82 114,82 107,92 114,102 6,102 13,92'

interface Props {
  glyph: string
  subject?: SubjectId
  metal?: Metal
  banner?: string
  locked?: boolean
  size?: number
  /** Plays the pop-in and shine once, for a badge that was just earned. */
  fresh?: boolean
}

/** A hexagonal medal: metal rim, subject-colored face, ribbon tails and a banner. */
export function BadgeArt({ glyph, subject, metal = 'gold', banner, locked, size = 120, fresh }: Props) {
  const id = useId().replace(/:/g, '')
  const face = FACES[subject ?? 'default']
  const rim = METALS[metal]
  const label = (locked ? 'Locked' : banner ?? '').toUpperCase()

  return (
    <svg
      className={`badge-art ${locked ? 'locked' : ''} ${fresh ? 'fresh' : ''} metal-${metal}`}
      width={size}
      height={size * 1.1}
      viewBox="0 0 120 132"
      aria-hidden
    >
      <defs>
        <linearGradient id={`rim-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={rim[0]} />
          <stop offset="0.45" stopColor={rim[1]} />
          <stop offset="0.7" stopColor={rim[0]} />
          <stop offset="1" stopColor={rim[2]} />
        </linearGradient>
        <radialGradient id={`face-${id}`} cx="0.35" cy="0.28" r="0.9">
          <stop offset="0" stopColor={face[0]} />
          <stop offset="0.55" stopColor={face[1]} />
          <stop offset="1" stopColor={face[2]} />
        </radialGradient>
        <linearGradient id={`ribbon-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={face[1]} />
          <stop offset="1" stopColor={face[2]} />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <polygon points={HEX_INNER} />
        </clipPath>
      </defs>

      {/* Ribbon tails behind the medal */}
      <polygon points="36,88 54,96 46,130 38,122 29,128" fill={`url(#ribbon-${id})`} />
      <polygon points="84,88 66,96 74,130 82,122 91,128" fill={`url(#ribbon-${id})`} />

      {/* Rim and face */}
      <polygon points={HEX_OUTER} fill={`url(#rim-${id})`} stroke={rim[2]} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={HEX_INNER} fill={`url(#face-${id})`} stroke={rim[2]} strokeOpacity="0.5" strokeWidth="1" />

      {/* Face details: concentric ring and sweeping shine */}
      <g clipPath={`url(#clip-${id})`}>
        <circle cx="60" cy="56" r="27" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />
        <polygon className="badge-shine" points="10,110 40,110 90,0 60,0" fill="#fff" opacity="0.22" />
      </g>

      {!locked && glyph.startsWith('⚛') ? (
        <Atom />
      ) : (
        <text x="60" y="58" className="badge-glyph" textAnchor="middle" dominantBaseline="central" fill="#fff">
          {locked ? '?' : glyph}
        </text>
      )}

      {/* Banner */}
      {label && (
        <g>
          <polygon points={BANNER} fill={face[2]} stroke={rim[1]} strokeWidth="1.5" strokeLinejoin="round" />
          <text x="60" y="92.5" className="badge-banner" textAnchor="middle" dominantBaseline="central" fill="#fff">
            {label}
          </text>
        </g>
      )}

      {/* Sparkles */}
      {!locked && (
        <g className="badge-sparkles" fill="#fff">
          <path d="M104 14 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
          <path d="M16 20 l1.4 3.6 3.6 1.4 -3.6 1.4 -1.4 3.6 -1.4 -3.6 -3.6 -1.4 3.6 -1.4z" />
        </g>
      )}
    </svg>
  )
}

/** The ⚛ glyph is thin in most fonts, so science medals draw their own atom. */
function Atom() {
  return (
    <g className="badge-atom" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
      <ellipse cx="60" cy="57" rx="22" ry="8.5" />
      <ellipse cx="60" cy="57" rx="22" ry="8.5" transform="rotate(60 60 57)" />
      <ellipse cx="60" cy="57" rx="22" ry="8.5" transform="rotate(-60 60 57)" />
      <circle cx="60" cy="57" r="4.5" fill="#fff" stroke="none" />
    </g>
  )
}
