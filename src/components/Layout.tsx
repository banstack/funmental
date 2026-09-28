import { NavLink, Outlet } from 'react-router-dom'
import { streak, useAppData } from '../lib/store'

export function Layout() {
  const data = useAppData()
  const days = streak(data.activeDays)

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="logo">
          fun<span>mental</span>
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/history">History</NavLink>
          <span className="streak" title="Daily streak">
            🔥 {days}
          </span>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
