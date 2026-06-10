import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { useColorScheme } from '@mui/material/styles'
import CompanySettings from './components/CompanySettings'
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
import { SiteTree } from './components/SiteTree'

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        size="small"
        sx={{ color: 'var(--portal-icon-base)', '&:hover': { bgcolor: 'action.hover' } }}
      >
        {mode === 'dark'
          ? <LightModeOutlinedIcon fontSize="small" />
          : <DarkModeOutlinedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}

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
          ? 'bg-[var(--nav-active-bg)] text-[var(--brand-600)]'
          : muted
          ? 'text-[var(--icon-subtle)] hover:text-[var(--icon-base)] hover:bg-[var(--bg-paper-elev-1)]'
          : 'text-[var(--icon-base)] hover:text-[var(--icon-strong)] hover:bg-[var(--bg-paper-elev-1)]'
      }`}
    >
      {icon}
    </button>
  )
}

function Sidebar() {
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-16 bg-[var(--bg-default)] border-r border-[var(--divider)] flex-col items-center py-4 z-30">
      <div className="mb-3">
        <CubXLogo className="w-8 h-8" />
      </div>

      <button
        title="Collapse sidebar"
        className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--icon-base)] hover:text-[var(--icon-strong)] hover:bg-[var(--bg-paper-elev-1)] mb-4 transition-colors"
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
        <p className="text-[9px] font-semibold tracking-widest text-[var(--fg-disabled)] uppercase text-center mb-1 leading-tight">
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
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[var(--bg-default)] border-b border-[var(--divider)] sticky top-0 z-30">
      <CubXLogo className="w-7 h-7" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onAskAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-default)] border border-[var(--divider)] rounded-lg text-sm font-medium text-[var(--fg-2)] hover:border-[var(--icon-base)] hover:bg-[var(--bg-paper-elev-1)] transition-colors"
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
      <ThemeToggle />
      <button
        onClick={onAskAdmin}
        className="flex items-center gap-2 px-3.5 py-2 bg-[var(--bg-default)] border border-[var(--divider)] rounded-lg text-sm font-medium text-[var(--fg-2)] hover:border-[var(--icon-base)] hover:bg-[var(--bg-paper-elev-1)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)] focus:ring-offset-1"
      >
        <IconTicket className="w-4 h-4" />
        Submit a Ticket
      </button>

      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-paper-elev-1)] transition-colors">
        <div className="w-5 h-5 rounded-full bg-[var(--brand-100)] flex items-center justify-center">
          <svg className="w-3 h-3 text-[var(--brand-600)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </div>
        <span className="text-sm text-[var(--fg-2)] font-medium">RiverStone Insurance</span>
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

// ─── Site Selector ────────────────────────────────────────────────────────────

interface SiteSelectorProps {
  sites: SiteData[]
  activeId: string
  onChange: (id: string) => void
}

function SiteSelector({ sites, activeId, onChange }: SiteSelectorProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ font: '500 0.875rem/1 var(--font-inter)', color: 'var(--fg-2)' }}>Site:</span>
        <div style={{
          display: 'inline-flex',
          border: '1px solid var(--secondary-outlined-border)',
          borderRadius: 'var(--radius-base)',
          overflow: 'hidden',
        }}>
          {sites.map((sd, i) => {
            const isActive = sd.site.id === activeId
            return (
              <button
                key={sd.site.id}
                onClick={() => onChange(sd.site.id)}
                style={{
                  appearance: 'none', border: 0,
                  borderLeft: i > 0 ? '1px solid var(--secondary-outlined-border)' : 'none',
                  background: isActive ? 'var(--brand-600)' : 'var(--bg-default)',
                  padding: '8px 16px',
                  font: '500 0.875rem/1 var(--font-inter)',
                  color: isActive ? '#fff' : 'var(--fg-2)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background var(--duration-shortest) var(--easing-standard)',
                }}
              >
                {sd.site.name}
              </button>
            )
          })}
        </div>
      </div>
      <p style={{ margin: '8px 0 0', font: 'var(--type-caption)', color: 'var(--fg-2)' }}>
        Your permissions can differ at each site.
      </p>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<'permissions' | 'company-settings'>('permissions')
  const primaryId = SITES_DATA.find((s) => s.site.isPrimary)?.site.id ?? SITES_DATA[0].site.id
  const [activeSiteId, setActiveSiteId] = useState(primaryId)

  if (page === 'company-settings') {
    return (
      <>
        <button
          onClick={() => setPage('permissions')}
          style={{ position: 'fixed', top: 8, left: 100, zIndex: 9999, fontSize: 11, padding: '4px 10px', background: 'var(--mui-palette-background-paper)', color: 'var(--mui-palette-text-secondary)', border: '1px solid var(--mui-palette-divider)', borderRadius: 6, cursor: 'pointer' }}
        >
          ← Permissions view
        </button>
        <CompanySettings />
      </>
    )
  }
  const activeSiteData = SITES_DATA.find((s) => s.site.id === activeSiteId) ?? SITES_DATA[0]

  function handleAskAdmin() {
    window.open(`mailto:admin@cubx.com?subject=${encodeURIComponent('Permission inquiry')}`)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--portal-elevation-1)' }}>
      <Sidebar />
      <MobileHeader onAskAdmin={handleAskAdmin} />

      <main className="md:ml-16 min-h-screen">
        <div className="px-4 py-4 sm:px-8 sm:py-8">
          <TopBar onAskAdmin={handleAskAdmin} />

          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Page header */}
            <div style={{ marginBottom: 22 }}>
              <h1 style={{
                margin: '0 0 6px',
                font: 'var(--type-h4)', letterSpacing: 'var(--type-h4-tracking)',
                color: 'var(--fg-1)',
              }}>Your permissions</h1>
            </div>

            {/* Site selector */}
            <SiteSelector sites={SITES_DATA} activeId={activeSiteId} onChange={setActiveSiteId} />

            {/* Permission sections */}
            <MyPermissionsPage siteData={activeSiteData} />

            {/* Quick Check */}
            <QuickCheck activeSiteId={activeSiteId} sitesData={SITES_DATA} />

            {/* Site tree */}
            <SiteTree siteData={activeSiteData} />
          </div>
        </div>
      </main>
    </div>
  )
}
