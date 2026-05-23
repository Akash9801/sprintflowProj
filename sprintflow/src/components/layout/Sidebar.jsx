import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getInitials } from '../../utils/helpers'

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/projects',
    label: 'Projects',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    onMobileClose()
    await logout()
    navigate('/login')
  }

  const handleNavClick = () => {
    // close mobile drawer on navigation
    onMobileClose()
  }

  return (
    <>
      {/* ── Desktop sidebar (fixed, always visible on lg+) ── */}
      <aside
        className={`
          hidden lg:flex flex-col
          fixed inset-y-0 left-0 z-30
          bg-white shadow-sidebar
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-60'}
        `}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggle={onToggle}
          onNavClick={handleNavClick}
          user={user}
          onLogout={handleLogout}
        />
      </aside>

      {/* ── Mobile sidebar (slide-in drawer) ── */}
      <aside
        className={`
          lg:hidden fixed inset-y-0 left-0 z-30 w-64
          bg-white shadow-modal flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent
          collapsed={false}
          onToggle={onMobileClose}
          onNavClick={handleNavClick}
          user={user}
          onLogout={handleLogout}
          isMobile
        />
      </aside>
    </>
  )
}

function SidebarContent({ collapsed, onToggle, onNavClick, user, onLogout, isMobile }) {
  return (
    <>
      {/* Logo row */}
      <div className={`flex items-center gap-2.5 px-4 h-14 border-b border-surface-100 flex-shrink-0 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-surface-900 tracking-tight truncate">SprintFlow</span>
          )}
        </div>

        {/* Mobile close X */}
        {isMobile && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-surface-400 hover:bg-surface-100 transition-colors flex-shrink-0"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150
               ${isActive
                 ? 'bg-brand-50 text-brand-700'
                 : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
               }
               ${collapsed ? 'justify-center' : ''}
              `
            }
            title={collapsed ? label : undefined}
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="flex-shrink-0 border-t border-surface-100 p-2">
        {/* User info */}
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1 rounded-lg min-w-0">
            <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-white">{getInitials(user?.name)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-surface-800 truncate">{user?.name}</p>
              <p className="text-xs text-surface-400 truncate">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">{getInitials(user?.name)}</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-surface-500
                      hover:bg-red-50 hover:text-red-600 transition-colors duration-150
                      ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-surface-400
                        hover:bg-surface-50 hover:text-surface-600 transition-colors duration-150 mt-1
                        ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>
        )}
      </div>
    </>
  )
}
