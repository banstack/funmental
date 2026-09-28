import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { streak } from '../lib/stats'
import { useAppData } from '../lib/store'
import { Avatar } from './Avatar'
import { BadgeToaster } from './BadgeToaster'

export function Layout() {
  const data = useAppData()
  const days = streak(data.activeDays)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="logo">
          fun<span>mental</span>
        </NavLink>
        <nav>
          <NavLink to="/" end className="nav-home">
            Dashboard
          </NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/profile" className="profile-chip" aria-label={`Profile, ${days} day streak`}>
            <Avatar name={data.profile.name} size="sm" />
            <span className="streak">🔥 {days}</span>
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <BadgeToaster />
    </div>
  )
}
