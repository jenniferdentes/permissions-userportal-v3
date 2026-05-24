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
import { PermissionsTable } from './components/PermissionsTable'
import { QuickCheck } from './components/QuickCheck'
import { SiteTree } from './components/SiteTree'

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
    <aside className="fixed inset-y-0 left-0 w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-30">
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

function TopBar({ onAskAdmin }: { onAskAdmin: () => void }) {
  return (
    <div className="flex items-center justify-end gap-3 pb-6">
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

// ─── Site Tabs ───────────────────────────────────────────────────────────────

interface SiteTabsProps {
  sites: SiteData[]
  activeId: string
  onChange: (id: string) => void
}

function SiteTabs({ sites, activeId, onChange }: SiteTabsProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 font-medium">Site:</span>
        <div className="flex items-center gap-1">
          {sites.map((sd) => (
            <button
              key={sd.site.id}
              onClick={() => onChange(sd.site.id)}
              className={`px-3.5 py-1.5 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 ${
                sd.site.id === activeId
                  ? 'bg-white border border-gray-300 font-medium text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 font-normal'
              }`}
            >
              {sd.site.name}
            </button>
          ))}
        </div>
      </div>
      <span className="text-xs text-gray-400 italic">
        Your permissions can differ at each site.
      </span>
    </div>
  )
}

// ─── Permissions Page ────────────────────────────────────────────────────────

const USER_FIRST_NAME = 'Guy'

export default function App() {
  const primaryId = SITES_DATA.find((s) => s.site.isPrimary)?.site.id ?? SITES_DATA[0].site.id
  const [activeSiteId, setActiveSiteId] = useState(primaryId)

  const activeSiteData = SITES_DATA.find((s) => s.site.id === activeSiteId) ?? SITES_DATA[0]

  function handleAskAdmin(action?: string) {
    const subject = encodeURIComponent(
      action ? `Access request: ${action}` : 'Permission inquiry'
    )
    const body = encodeURIComponent(
      action
        ? `Hi,\n\nI'd like to request access to handle ${action} at ${activeSiteData.site.name}.\n\nThanks`
        : `Hi,\n\nI have a question about my permissions at ${activeSiteData.site.name}.\n\nThanks`
    )
    window.open(`mailto:admin@cubx.com?subject=${subject}&body=${body}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main content area */}
      <main className="ml-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <TopBar onAskAdmin={handleAskAdmin} />

          {/* Page heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your permissions</h1>

          {/* Site tabs */}
          <SiteTabs
            sites={SITES_DATA}
            activeId={activeSiteId}
            onChange={setActiveSiteId}
          />

          {/* Three sections */}
          <div className="space-y-6">
            <PermissionsTable
              siteName={activeSiteData.site.name}
              permissions={activeSiteData.permissions}
              userName={USER_FIRST_NAME}
            />

            <QuickCheck
              activeSiteId={activeSiteId}
              sitesData={SITES_DATA}
            />

            <SiteTree
              siteName={activeSiteData.site.name}
              nodes={activeSiteData.tree}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
