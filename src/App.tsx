import { useState } from 'react'
import { SITES_DATA } from './data'
import type { SiteData } from './types'
import {
  CubXLogo,
  IconHome,
  IconShield,
  IconBook,
  IconLock,
  IconGrid,
  IconUsers,
  IconCheckCircle,
  IconChevronLeft,
  IconTicket,
} from './icons'
import { MyPermissionsPage } from './components/PermissionsCard'
import { QuickCheck } from './components/QuickCheck'

// ─── Sidebar ────────────────────────────────────────────────────────────────

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  muted?: boolean
}

function NavItem({ icon, label, active, muted }: NavItemProps) {
  return (
    <button
      title={label}
      className={`w-full flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg transition-colors ${
        active
          ? 'bg-slate-100 text-slate-800'
          : muted
          ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
    </button>
  )
}

function Sidebar() {
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-16 bg-white border-r border-gray-200 flex-col items-center py-4 z-30">
      {/* Logo */}
      <div className="mb-3">
        <CubXLogo className="w-8 h-8" />
      </div>

      {/* Collapse toggle */}
      <button
        title="Collapse sidebar"
        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 mb-4 transition-colors"
      >
        <IconChevronLeft className="w-4 h-4" />
      </button>

      {/* Main nav */}
      <nav className="flex flex-col gap-1 w-full px-2">
        <NavItem icon={<IconHome className="w-5 h-5" />} label="Home" active />
        <NavItem icon={<IconShield className="w-5 h-5" />} label="Quarantine" />
        <NavItem icon={<IconBook className="w-5 h-5" />} label="Directory" />
        <NavItem icon={<IconLock className="w-5 h-5" />} label="Security Center" />
        <NavItem icon={<IconGrid className="w-5 h-5" />} label="Apps" />
      </nav>

      {/* Company Tools section */}
      <div className="mt-4 w-full px-2">
        <p className="text-[9px] font-semibold tracking-widest text-gray-400 uppercase text-center mb-1 leading-tight">
          Company<br />Tools
        </p>
        <div className="flex flex-col gap-1">
          <NavItem icon={<IconUsers className="w-5 h-5" />} label="Manage Users" />
          <NavItem icon={<IconCheckCircle className="w-5 h-5" />} label="Requests" />
        </div>
      </div>
    </aside>
  )
}

// ─── Top Bar ────────────────────────────────────────────────────────────────

function MobileHeader({ onAskAdmin }: { onAskAdmin: () => void }) {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
      <CubXLogo className="w-7 h-7" />
      <div className="flex items-center gap-2">
        <button
          onClick={onAskAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <IconTicket className="w-4 h-4" />
          Ticket
        </button>
        <div
          className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-semibold select-none"
          title="Grace Hopper"
        >
          GH
        </div>
      </div>
    </div>
  )
}

function TopBar({ onAskAdmin }: { onAskAdmin: () => void }) {
  return (
    <div className="hidden md:flex items-center justify-end gap-3 pb-6">
      <button
        onClick={onAskAdmin}
        className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
      >
        <IconTicket className="w-4 h-4" />
        Submit a Ticket
      </button>

      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
          <svg className="w-3 h-3 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </div>
        <span className="text-sm text-gray-700 font-medium">RiverStone Insurance</span>
      </button>

      <div
        className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-semibold select-none"
        title="Grace Hopper"
      >
        GH
      </div>
    </div>
  )
}

// ─── Site Selector (ButtonGroup) ─────────────────────────────────────────────

interface SiteSelectorProps {
  sites: SiteData[]
  activeId: string
  onChange: (id: string) => void
}

function SiteSelector({ sites, activeId, onChange }: SiteSelectorProps) {
  return (
    <div style={{
      display: 'inline-flex',
      border: '1px solid rgba(50,55,103,0.3)',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      {sites.map((sd, i) => {
        const isActive = sd.site.id === activeId
        return (
          <button
            key={sd.site.id}
            onClick={() => onChange(sd.site.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 16px',
              background: isActive ? '#e8e9f2' : '#fff',
              color: isActive ? '#323767' : '#3a3e75',
              font: '500 0.875rem/1.5rem var(--font-inter)',
              border: 'none',
              borderLeft: i > 0 ? '1px solid rgba(50,55,103,0.3)' : 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background var(--duration-shortest) var(--easing-standard)',
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f3f3f8' }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = '#fff' }}
          >
            {sd.site.name}
          </button>
        )
      })}
    </div>
  )
}

// ─── Permissions Page ────────────────────────────────────────────────────────

export default function App() {
  const primaryId = SITES_DATA.find((s) => s.site.isPrimary)?.site.id ?? SITES_DATA[0].site.id
  const [activeSiteId, setActiveSiteId] = useState(primaryId)

  const activeSiteData = SITES_DATA.find((s) => s.site.id === activeSiteId) ?? SITES_DATA[0]

  function handleAskAdmin() {
    window.open(`mailto:admin@cubx.com?subject=${encodeURIComponent('Permission inquiry')}`)
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFB' }}>
      <Sidebar />

      <MobileHeader onAskAdmin={handleAskAdmin} />

      <main className="md:ml-16 min-h-screen">
        <div className="px-4 py-4 sm:px-8 sm:py-8">
          <TopBar onAskAdmin={handleAskAdmin} />

          {/* Page header + site selector */}
          <div style={{ maxWidth: 820, margin: '0 auto', paddingTop: 16, paddingBottom: 20 }}>
            <h1 style={{
              margin: '0 0 16px',
              font: '700 2.125rem/1.235 var(--font-inter)',
              letterSpacing: '0.25px',
              color: 'var(--fg-1)',
            }}>
              Your permissions
            </h1>
            <div className="overflow-x-auto" style={{ marginBottom: 8 }}>
              <SiteSelector
                sites={SITES_DATA}
                activeId={activeSiteId}
                onChange={setActiveSiteId}
              />
            </div>
            <p style={{
              margin: 0,
              font: '400 0.75rem/1.66rem var(--font-inter)',
              letterSpacing: '0.4px',
              color: '#4a5466',
            }}>
              Your permissions can differ at each site.
            </p>
          </div>

          {/* Permission cards */}
          <MyPermissionsPage siteData={activeSiteData} />

          {/* Quick Check */}
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <QuickCheck activeSiteId={activeSiteId} sitesData={SITES_DATA} />
          </div>

        </div>
      </main>
    </div>
  )
}
