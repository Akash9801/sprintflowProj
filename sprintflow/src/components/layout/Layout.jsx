import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const SIDEBAR_FULL = 240   // w-60 = 15rem = 240px
const SIDEBAR_MINI = 64    // w-16 = 4rem  = 64px

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarWidth = sidebarCollapsed ? SIDEBAR_MINI : SIDEBAR_FULL

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* ── Desktop sidebar (fixed, out of flow) ── */}
      <div
        className="hidden lg:block flex-shrink-0 transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-surface-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile sidebar (slide-in) ── */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-30 transform transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Navbar onMenuToggle={() => setMobileOpen((v) => !v)} />

        <main className="flex-1 pt-14 overflow-auto">
          <div className="p-6 max-w-screen-xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
