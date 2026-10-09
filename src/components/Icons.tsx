import type { ReactNode } from 'react'
import type { PracticeTopic } from '../lib/topics'

/*
 * Fathom's drawn icons. Topics are line icons; creatures are filled
 * silhouettes in currentColor, with `cut` shapes (eyes, stripes) a shade
 * darker and `glow` shapes for bioluminescence.
 */

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const TOPIC_PATHS: Record<PracticeTopic, ReactNode> = {
  general: (
    <g {...line}>
      <path d="M9 18h6M10 21h4M8.5 14.5C7 13.3 6 11.6 6 9.6a6 6 0 0 1 12 0c0 2-1 3.7-2.5 4.9-.6.5-.9 1.2-.9 2V17H9.4v-.5c0-.8-.3-1.5-.9-2z" />
    </g>
  ),
  history: (
    <g {...line}>
      <path d="M3 9l9-5 9 5zM5 9v9M9.7 9v9M14.3 9v9M19 9v9M3 21h18M4 18h16" />
    </g>
  ),
  science: (
    <g {...line}>
      <path d="M9 3h6M10 3v6l-5.4 9.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.5-2.6L14 9V3M7.5 14h9" />
    </g>
  ),
  screen: (
    <g {...line}>
      <path d="M4 10h16v10H4zM4 10l1-4 15-2 .6 3.6M8.5 5.4l1.8 3.2M13.5 4.7l1.8 3.2" />
    </g>
  ),
  geography: (
    <g {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z" />
    </g>
  ),
  music: (
    <g {...line}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </g>
  ),
  sports: (
    <g {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6c3.3 3 3.3 9.8 0 12.8M18.4 5.6c-3.3 3-3.3 9.8 0 12.8" />
    </g>
  ),
  food: (
    <g {...line}>
      <path d="M3 12h18a9 9 0 0 1-18 0zM14 3l-3 9M19 4l-5 8" />
    </g>
  ),
  mixed: (
    <g {...line}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="9" r=".6" fill="currentColor" />
      <circle cx="15" cy="15" r=".6" fill="currentColor" />
      <circle cx="15" cy="9" r=".6" fill="currentColor" />
      <circle cx="9" cy="15" r=".6" fill="currentColor" />
    </g>
  ),
}

export function TopicIcon({ topic, size = 24 }: { topic: PracticeTopic; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {TOPIC_PATHS[topic]}
    </svg>
  )
}

const CREATURE_PATHS: Record<string, ReactNode> = {
  clownfish: (
    <>
      <ellipse cx="14" cy="16" rx="10" ry="6.5" />
      <path d="M22 16l7-6v12z" />
      <ellipse className="cut" cx="10.5" cy="16" rx="1.1" ry="5.9" />
      <ellipse className="cut" cx="17.5" cy="16" rx="1" ry="5.4" />
      <circle className="cut" cx="7.5" cy="14.5" r="1.1" />
    </>
  ),
  'sea-turtle': (
    <>
      <ellipse cx="7.5" cy="9" rx="4" ry="2" transform="rotate(-35 7.5 9)" />
      <ellipse cx="7.5" cy="23" rx="4" ry="2" transform="rotate(35 7.5 23)" />
      <ellipse cx="21" cy="8.5" rx="3.5" ry="1.8" transform="rotate(30 21 8.5)" />
      <ellipse cx="21" cy="23.5" rx="3.5" ry="1.8" transform="rotate(-30 21 23.5)" />
      <circle cx="26.5" cy="16" r="3" />
      <ellipse cx="15" cy="16" rx="9" ry="7" />
      <path className="cut" d="M12.5 12h5l2 4-2 4h-5l-2-4z" />
    </>
  ),
  dolphin: (
    <>
      <path d="M2 19c5-8 15-10 23-6l5-1-2 3c-2 4-10 7-18 6l-4 4v-5z" />
      <path d="M14 11l3-6 3 6.5z" />
      <circle className="cut" cx="24" cy="14.5" r=".9" />
    </>
  ),
  'moon-jelly': (
    <>
      <path d="M5 16C5 8 27 8 27 16c-3 1.5-19 1.5-22 0z" />
      <path d="M9 18c-1 3 1 5 0 9M14 18.5c-1 3 1 5 0 9M18 18.5c1 3-1 5 0 9M23 18c1 3-1 5 0 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle className="cut" cx="12.5" cy="12.5" r="1.6" />
      <circle className="cut" cx="16" cy="11.3" r="1.6" />
      <circle className="cut" cx="19.5" cy="12.5" r="1.6" />
    </>
  ),
  lanternfish: (
    <>
      <ellipse cx="14" cy="16" rx="11" ry="5" />
      <path d="M23 16l7-5v10z" />
      <circle className="cut" cx="7" cy="14.5" r="1.6" />
      <circle className="glow" cx="11" cy="18.5" r=".9" />
      <circle className="glow" cx="14.5" cy="19" r=".9" />
      <circle className="glow" cx="18" cy="18.5" r=".9" />
    </>
  ),
  'vampire-squid': (
    <>
      <ellipse cx="9" cy="8" rx="3.5" ry="2" transform="rotate(-30 9 8)" />
      <ellipse cx="23" cy="8" rx="3.5" ry="2" transform="rotate(30 23 8)" />
      <path d="M16 3c6 0 8 6 7 11l6 12-9-4-4 7-4-7-9 4 6-12c-1-5 1-11 7-11z" />
      <circle className="cut" cx="13" cy="12" r="1.4" />
      <circle className="cut" cx="19" cy="12" r="1.4" />
    </>
  ),
  'firefly-squid': (
    <>
      <path d="M16 2l5 13H11z" />
      <path d="M11.5 15h9v3h-9z" />
      <path d="M12 18c-2 4-1 8-3 11M14.5 18c-.5 4 0 8-1 11M17.5 18c.5 4 0 8 1 11M20 18c2 4 1 8 3 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle className="glow" cx="16" cy="8" r="1" />
      <circle className="glow" cx="14" cy="12" r="1" />
      <circle className="glow" cx="18" cy="12" r="1" />
      <circle className="glow" cx="9" cy="29" r="1" />
      <circle className="glow" cx="23" cy="29" r="1" />
    </>
  ),
  'sperm-whale': (
    <>
      <path d="M2 12c0-3 3-4 7-4l12 1c4 1 5 4 6 6l3-4v10l-3-3c-3 4-12 5-19 4-4-1-6-3-6-6z" />
      <path className="cut" d="M3 17.5c3 .5 6 .5 9 0" />
      <circle className="cut" cx="11" cy="14" r=".9" />
    </>
  ),
  anglerfish: (
    <>
      <path d="M12 10C10 4 18 1 22 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle className="glow" cx="22" cy="6" r="2" />
      <circle cx="14" cy="19" r="9" />
      <path d="M21 19l8-5v10z" />
      <path className="cut" d="M6 20l2 2 2-2 2 2 2-2 2 2 2-2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle className="cut" cx="12" cy="15" r="1.4" />
    </>
  ),
  'dumbo-octopus': (
    <>
      <ellipse cx="5.5" cy="10" rx="4.5" ry="2.8" transform="rotate(-25 5.5 10)" />
      <ellipse cx="26.5" cy="10" rx="4.5" ry="2.8" transform="rotate(25 26.5 10)" />
      <ellipse cx="16" cy="13" rx="10" ry="9" />
      <path d="M7 17h18l-1 7c-2 5-4 0-4 0-2 6-4 0-4 0-2 6-4 0-4 0-2 5-4 0-4 0z" />
      <circle className="cut" cx="12.5" cy="12" r="1.5" />
      <circle className="cut" cx="19.5" cy="12" r="1.5" />
    </>
  ),
  'gulper-eel': (
    <>
      <path d="M2 6c7 1 11 4 12 10-1 6-5 9-12 10 3-6 3-14 0-20z" />
      <path d="M13 16c6-3 8 6 14 3 2-1 2-3 1-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle className="glow" cx="28" cy="15" r="1.4" />
      <circle className="cut" cx="9" cy="11" r=".9" />
    </>
  ),
  snailfish: (
    <>
      <circle cx="10" cy="16" r="7" />
      <path d="M14 10.5c7 1 12 3.5 16 5.5-4 2-9 4.5-16 5.5z" />
      <circle className="cut" cx="7" cy="14" r="1.3" />
    </>
  ),
  amphipod: (
    <>
      <path d="M8 8c10-5 21 1 19 12-1 6-8 8-13 5l3-3c3 2 6 0 6-3 1-6-6-9-13-6z" />
      <path d="M8 8C6 5 3 4 2 3M9 7.5C8 5 7 3 7 1M12 15l-2 4M15 13l-1 5M18 12v5M21 13l1 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle className="cut" cx="11" cy="9" r="1" />
    </>
  ),
  challenger: (
    <>
      <path d="M10 5h12v6c0 4-3 7-6 7s-6-3-6-7z" />
      <path d="M10 7H6c0 4 2 6 4.5 6M22 7h4c0 4-2 6-4.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14.5 17.5h3V22h-3zM10 22h12v4H10z" />
    </>
  ),
}

/** A creature's silhouette. Unknown ids draw nothing. */
export function CreatureIcon({ id, size = 32 }: { id: string; size?: number }) {
  return (
    <svg className="icon creature-icon" width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      {CREATURE_PATHS[id]}
    </svg>
  )
}

export function FlameIcon({ size = 16 }: { size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c.6 4 5.5 6 5.5 12a5.5 5.5 0 0 1-11 0c0-3.2 2-4.7 2.6-7.6 1.4 1.3 1.9 2.8 1.9 4.2C13 8.5 12.5 5 12 2z" />
    </svg>
  )
}
