import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const SIDEBAR_FULL = 240  // w-60
const SIDEBAR_MINI = 64   // w-16

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarWidth = sidebarCollapsed ? SIDEBAR_MINI : SIDEBAR_FULL

  return (
    <div className="min-h-screen bg-surface-50 flex">

      {/* ── Desktop sidebar spacer (keeps flex flow correct) ── */}
      <div
        className="hidden lg:block flex-shrink-0 transition-all duration-300"
        style={{ width: sidebarWidth }}
      />

      {/* ── Desktop sidebar (fixed, aligned to spacer) ── */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(v => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-surface-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Main content column ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Navbar lives INSIDE the content column — never overlaps sidebar */}
        <Navbar onMenuToggle={() => setMobileOpen(v => !v)} />

        <main className="flex-1 pt-14 overflow-auto">
          <div className="p-4 sm:p-6 max-w-screen-xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
