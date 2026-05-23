import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getInitials } from '../../utils/helpers'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
}

function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/project/')) return 'Project Details'
  return 'SprintFlow'
}

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <header className="fixed top-0 right-0 left-0 z-20 h-14 bg-white border-b border-surface-100 flex items-center px-4 gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-lg text-surface-500 hover:bg-surface-100 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <h1 className="page-title flex-1">{getPageTitle(pathname)}</h1>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Notification bell (placeholder) */}
        <button className="relative p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">{getInitials(user?.name)}</span>
          </div>
          <span className="text-sm font-medium text-surface-700 hidden sm:block">{user?.name}</span>
        </div>
      </div>
    </header>
  )
}
