export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <span className={`avatar ${size}`} aria-hidden>
      {initial || '☺︎'}
    </span>
  )
}
