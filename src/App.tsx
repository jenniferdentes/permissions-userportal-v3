import { useState, useRef, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { useColorScheme, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CompanySettings from './components/CompanySettings'
import { SITES_DATA, EXTRA_SITES } from './data'
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

const PILL_THRESHOLD = 8

interface SiteSelectorProps {
  sites: SiteData[]
  activeId: string
  onChange: (id: string) => void
}

function SiteSelectorPills({ sites, activeId, onChange }: SiteSelectorProps) {
  return (
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
  )
}

function SiteSelectorDropdown({ sites, activeId, onChange }: SiteSelectorProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const active = sites.find((s) => s.site.id === activeId)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  const filtered = query
    ? sites.filter((s) => s.site.name.toLowerCase().includes(query.toLowerCase()))
    : sites

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => { setOpen((o) => !o); setQuery('') }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          appearance: 'none',
          border: `1px solid ${open ? 'var(--brand-600)' : 'var(--secondary-outlined-border)'}`,
          borderRadius: 'var(--radius-base)',
          background: 'var(--bg-default)',
          padding: '8px 12px',
          font: '500 0.875rem/1 var(--font-inter)',
          color: 'var(--fg-1)',
          cursor: 'pointer',
          minWidth: 200,
          transition: 'border-color var(--duration-shortest) var(--easing-standard)',
        }}
      >
        <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {active?.site.name ?? 'Select site'}
        </span>
        <span className="ico" style={{ fontSize: 18, color: 'var(--icon-subtle)', flexShrink: 0, transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'none' }}>
          expand_more
        </span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 50,
          background: 'var(--bg-default)',
          border: '1px solid var(--divider)',
          borderRadius: 'var(--radius-base)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          width: 260,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Search input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            borderBottom: '1px solid var(--divider)',
          }}>
            <span className="ico" style={{ fontSize: 16, color: 'var(--icon-subtle)', flexShrink: 0 }}>search</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sites…"
              style={{
                flex: 1, border: 0, outline: 'none', background: 'transparent',
                font: '400 0.875rem/1.43 var(--font-inter)',
                color: 'var(--fg-1)',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0, color: 'var(--icon-subtle)', display: 'flex' }}>
                <span className="ico" style={{ fontSize: 16 }}>close</span>
              </button>
            )}
          </div>

          {/* Options list */}
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 16px', font: '400 0.875rem/1.43 var(--font-inter)', color: 'var(--fg-disabled)', textAlign: 'center' }}>
                No sites match "{query}"
              </div>
            ) : filtered.map((sd) => {
              const isActive = sd.site.id === activeId
              return (
                <button
                  key={sd.site.id}
                  onClick={() => { onChange(sd.site.id); setOpen(false); setQuery('') }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', appearance: 'none', border: 0,
                    padding: '9px 16px',
                    background: isActive ? 'var(--nav-active-bg)' : 'transparent',
                    font: `${isActive ? '500' : '400'} 0.875rem/1.43 var(--font-inter)`,
                    color: isActive ? 'var(--brand-600)' : 'var(--fg-1)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background var(--duration-shortest) var(--easing-standard)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-paper-elev-1)' }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sd.site.name}</span>
                  {isActive && <span className="ico" style={{ fontSize: 16, flexShrink: 0, color: 'var(--brand-600)' }}>check</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function SiteSelector({ sites, activeId, onChange }: SiteSelectorProps) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'))
  const useDropdown = isMobile || sites.length > PILL_THRESHOLD

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ font: '500 0.875rem/1 var(--font-inter)', color: 'var(--fg-2)' }}>Site:</span>
        {useDropdown
          ? <SiteSelectorDropdown sites={sites} activeId={activeId} onChange={onChange} />
          : <SiteSelectorPills sites={sites} activeId={activeId} onChange={onChange} />
        }
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
  const [manySites, setManySites] = useState(false)
  const allSites = manySites ? [...SITES_DATA, ...EXTRA_SITES] : SITES_DATA
  const activeSiteData = allSites.find((s) => s.site.id === activeSiteId) ?? SITES_DATA[0]

  function handleAskAdmin() {
    window.open(`mailto:admin@cubx.com?subject=${encodeURIComponent('Permission inquiry')}`)
  }

  function handleToggleManySites() {
    setManySites((v) => !v)
    setActiveSiteId(primaryId)
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
            <SiteSelector sites={allSites} activeId={activeSiteId} onChange={setActiveSiteId} />

            {/* Permission sections */}
            <MyPermissionsPage siteData={activeSiteData} />

            {/* Quick Check */}
            <QuickCheck activeSiteId={activeSiteId} sitesData={allSites} />

            {/* Site tree */}
            <SiteTree siteData={activeSiteData} />
          </div>
        </div>
      </main>

      {/* ── Demo toggle: few vs many sites ── */}
      <button
        onClick={handleToggleManySites}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 16px',
          background: 'var(--bg-default)',
          border: '1px solid var(--divider)',
          borderRadius: 100,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          font: '500 0.8125rem/1 var(--font-inter)',
          color: 'var(--fg-2)',
          cursor: 'pointer',
          transition: 'box-shadow 150ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)')}
      >
        <span className="ico" style={{ fontSize: 16, color: 'var(--brand-600)' }}>
          {manySites ? 'view_list' : 'dashboard'}
        </span>
        {manySites ? `${allSites.length} sites — switch to few` : `${allSites.length} sites — switch to many`}
      </button>
    </div>
  )
}
