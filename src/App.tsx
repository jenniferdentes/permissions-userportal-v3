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
      <div className="mb-3">
        <CubXLogo className="w-8 h-8" />
      </div>

      <button
        title="Collapse sidebar"
        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 mb-4 transition-colors"
      >
        <IconChevronLeft className="w-4 h-4" />
      </button>

      <nav className="flex flex-col gap-1 w-full px-2">
        <NavItem icon={<IconHome className="w-5 h-5" />} label="Home" active />
        <NavItem icon={<IconShield className="w-5 h-5" />} label="Quarantine" />
        <NavItem icon={<IconBook className="w-5 h-5" />} label="Directory" />
        <NavItem icon={<IconLock className="w-5 h-5" />} label="Security Center" />
        <NavItem icon={<IconGrid className="w-5 h-5" />} label="Apps" />
      </nav>

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

// ─── Identity Bar ────────────────────────────────────────────────────────────

function IdentityBar({ yourTitle }: { yourTitle: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px',
      background: 'var(--bg-default)',
      border: '1px solid var(--divider)',
      borderRadius: 'var(--radius-base)',
      margin: '22px 0 28px',
      flexWrap: 'wrap',
    }}>
      <div style={{
        flexShrink: 0, width: 44, height: 44, borderRadius: '50%',
        background: 'var(--avatar-periwinkle-bg)', color: 'var(--avatar-periwinkle-fg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        font: '600 1rem/1 var(--font-inter)', letterSpacing: '0.01em',
      }}>GH</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ font: 'var(--type-subtitle1)', letterSpacing: 'var(--type-subtitle1-tracking)', color: 'var(--fg-1)' }}>
          Grace Hopper
        </span>
        <span style={{ font: 'var(--type-body2)', color: 'var(--fg-2)' }}>
          Your access comes from the <strong style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{yourTitle}</strong> role
        </span>
      </div>
      <span style={{
        marginLeft: 'auto',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 'var(--radius-pill)',
        background: 'var(--brand-50)', border: '1px solid var(--brand-200)',
        color: 'var(--brand-600)', font: '600 0.8125rem/1.125rem var(--font-inter)',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        <span className="ico" style={{ fontSize: 16 }}>badge</span>
        {yourTitle}
      </span>
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
    <div style={{ marginBottom: 34 }}>
      <div style={{
        font: 'var(--type-overline)',
        letterSpacing: 'var(--type-overline-tracking)',
        textTransform: 'uppercase',
        color: 'var(--fg-2)',
        marginBottom: 4,
      }}>Showing access for</div>
      <div style={{
        display: 'flex', gap: 2,
        borderBottom: '1px solid var(--divider)',
        overflowX: 'auto',
      }}>
        {sites.map((sd) => {
          const isActive = sd.site.id === activeId
          return (
            <button
              key={sd.site.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(sd.site.id)}
              style={{
                appearance: 'none', border: 0, background: 'none',
                padding: '11px 16px',
                font: '600 0.9375rem/1 var(--font-inter)',
                color: isActive ? 'var(--primary)' : 'var(--fg-2)',
                cursor: 'pointer',
                borderBottom: `2px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                marginBottom: -1,
                whiteSpace: 'nowrap',
                transition: `color var(--duration-shortest) var(--easing-standard)`,
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--fg-1)' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--fg-2)' }}
            >
              {sd.site.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

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

          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            {/* Page header */}
            <div style={{ marginBottom: 22 }}>
              <h1 style={{
                margin: '0 0 6px',
                font: 'var(--type-h4)', letterSpacing: 'var(--type-h4-tracking)',
                color: 'var(--fg-1)',
              }}>My permissions</h1>
              <p style={{ margin: 0, font: 'var(--type-body1)', color: 'var(--fg-2)', maxWidth: '56ch' }}>
                Everything you're allowed to do is shown below — no need to search. Green cards are actions you can take; greyed-out cards aren't available to you.
              </p>
            </div>

            {/* Identity bar */}
            <IdentityBar yourTitle={activeSiteData.yourTitle} />

            {/* Site tabs */}
            <SiteTabs sites={SITES_DATA} activeId={activeSiteId} onChange={setActiveSiteId} />

            {/* Permission sections */}
            <MyPermissionsPage siteData={activeSiteData} />

            {/* Quick Check */}
            <QuickCheck activeSiteData={activeSiteData} />
          </div>
        </div>
      </main>
    </div>
  )
}
