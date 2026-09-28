import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import { Learn, LearnIndex } from './pages/Learn'
import { Placement } from './pages/Placement'
import { Play } from './pages/Play'
import { SubjectPage } from './pages/SubjectPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="subject/:subject" element={<SubjectPage />} />
          <Route path="play/:subject/:mode" element={<Play />} />
          <Route path="placement/:subject" element={<Placement />} />
          <Route path="learn" element={<LearnIndex />} />
          <Route path="learn/:subject" element={<LearnIndex />} />
          <Route path="learn/:subject/:grade" element={<Learn />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
