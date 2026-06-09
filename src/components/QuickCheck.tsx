import { useState, useRef, useEffect } from 'react'
import type { SiteData, QuickCheckAction } from '../types'
import { JOB_TITLES, USERS } from '../data'
import type { User } from '../data'
import { IconChevronDown, IconSearch, IconSparkle } from '../icons'

interface Props {
  activeSiteId: string
  sitesData: SiteData[]
}

const QUICK_CHECK_ACTIONS: { value: QuickCheckAction; label: string }[] = [
  { value: 'onboard',         label: 'Onboard' },
  { value: 'edit',            label: 'Edit' },
  { value: 'offboard',        label: 'Offboard' },
  { value: 'approve_onboard', label: 'Approve an onboarding' },
  { value: 'approve_edit',    label: 'Approve an edit' },
  { value: 'approve_offboard',label: 'Approve an offboarding' },
]

// Actions where the person already exists in the system — show By Name tab
const PERSON_PICKER_ACTIONS = new Set<QuickCheckAction>(['edit', 'offboard', 'approve_edit', 'approve_offboard'])

function checkAccess(action: QuickCheckAction, jobTitle: string, siteId: string, sitesData: SiteData[]): 'allowed' | 'partial' | 'blocked' {
  const site = sitesData.find((s) => s.site.id === siteId)
  if (!site) return 'blocked'
  const permMap: Record<QuickCheckAction, { can: boolean; scopes: string[] }> = {
    onboard:         { can: site.permissions.onboard.canPerform,  scopes: site.permissions.onboard.performScopes },
    edit:            { can: site.permissions.edit.canPerform,     scopes: site.permissions.edit.performScopes },
    offboard:        { can: site.permissions.offboard.canPerform, scopes: site.permissions.offboard.performScopes },
    approve_onboard: { can: site.permissions.onboard.canApprove,  scopes: site.permissions.onboard.approveScopes },
    approve_edit:    { can: site.permissions.edit.canApprove,     scopes: site.permissions.edit.approveScopes },
    approve_offboard:{ can: site.permissions.offboard.canApprove, scopes: site.permissions.offboard.approveScopes },
  }
  const { can, scopes } = permMap[action]
  if (!can) return 'blocked'
  if (scopes.length > 0 && !scopes.includes(jobTitle)) return 'partial'
  return 'allowed'
}

// ─── Action select ────────────────────────────────────────────────────────────

function ActionSelect({ value, onChange }: { value: QuickCheckAction; onChange: (v: QuickCheckAction) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = QUICK_CHECK_ACTIONS.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 transition-colors min-w-[130px]"
      >
        <span className="flex-1 text-left truncate">{selected?.label}</span>
        <IconChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-56 overflow-y-auto">
          {QUICK_CHECK_ACTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                opt.value === value ? 'text-slate-800 font-medium bg-gray-50' : 'text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Site select ──────────────────────────────────────────────────────────────

function SiteSelect({ value, onChange, sitesData }: { value: string; onChange: (v: string) => void; sitesData: SiteData[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = sitesData.find((s) => s.site.id === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 transition-colors min-w-[130px]"
      >
        <span className="flex-1 text-left truncate">{selected?.site.name ?? 'Select site'}</span>
        <IconChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {sitesData.map((sd) => (
            <button
              key={sd.site.id}
              type="button"
              onClick={() => { onChange(sd.site.id); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                sd.site.id === value ? 'text-slate-800 font-medium bg-gray-50' : 'text-gray-700'
              }`}
            >
              {sd.site.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ user }: { user: User }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold"
      style={{ backgroundColor: user.avatarBg, color: user.avatarText }}
    >
      {user.initials}
    </div>
  )
}

// ─── Person-or-title select ───────────────────────────────────────────────────

interface PersonOrTitleSelectProps {
  jobTitle: string
  selectedUser: User | null
  showPersonPicker: boolean
  onSelectTitle: (title: string) => void
  onSelectUser: (user: User) => void
}

function PersonOrTitleSelect({ jobTitle, selectedUser, showPersonPicker, onSelectTitle, onSelectUser }: PersonOrTitleSelectProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'name' | 'title'>(showPersonPicker ? 'name' : 'title')
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset tab when action switches to/from person-picker mode
  useEffect(() => {
    setTab(showPersonPicker ? 'name' : 'title')
    setQuery('')
  }, [showPersonPicker])

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

  const filteredUsers = query
    ? USERS.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.jobTitle.toLowerCase().includes(query.toLowerCase()))
    : USERS

  const filteredTitles = query
    ? JOB_TITLES.filter((t) => t.toLowerCase().includes(query.toLowerCase()))
    : JOB_TITLES

  const displayValue = selectedUser ? selectedUser.name : jobTitle

  function handleSelectUser(user: User) {
    onSelectUser(user)
    setOpen(false)
    setQuery('')
  }

  function handleSelectTitle(title: string) {
    onSelectTitle(title)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 transition-colors min-w-[180px]"
      >
        {selectedUser && (
          <div
            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-semibold"
            style={{ backgroundColor: selectedUser.avatarBg, color: selectedUser.avatarText }}
          >
            {selectedUser.initials}
          </div>
        )}
        <span className="flex-1 text-left truncate">
          {displayValue || (showPersonPicker ? 'Select person or title' : 'Select job title')}
        </span>
        <IconChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl w-72 flex flex-col">

          {/* Tabs — only when person picker is available */}
          {showPersonPicker && (
            <div className="flex gap-1.5 p-2.5 border-b border-gray-100">
              <button
                type="button"
                onClick={() => { setTab('name'); setQuery('') }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  tab === 'name'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                By Name
              </button>
              <button
                type="button"
                onClick={() => { setTab('title'); setQuery('') }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  tab === 'title'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                By Job Title
              </button>
            </div>
          )}

          {/* Search */}
          <div className="px-3 py-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white">
              <IconSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tab === 'name' ? 'Search name…' : 'Search job titles…'}
                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-64 py-1">
            {tab === 'name' ? (
              filteredUsers.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-400 text-center">No results</div>
              ) : (
                filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelectUser(user)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors ${
                      selectedUser?.id === user.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <Avatar user={user} />
                    <div className="text-left min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                      <div className="text-xs text-gray-500 truncate">{user.jobTitle}</div>
                    </div>
                  </button>
                ))
              )
            ) : (
              filteredTitles.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-400 text-center">No results</div>
              ) : (
                filteredTitles.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => handleSelectTitle(title)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      !selectedUser && jobTitle === title ? 'text-slate-800 font-medium bg-gray-50' : 'text-gray-700'
                    }`}
                  >
                    {title}
                  </button>
                ))
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Quick Check ──────────────────────────────────────────────────────────────

export function QuickCheck({ activeSiteId, sitesData }: Props) {
  const [action, setAction] = useState<QuickCheckAction>('onboard')
  const [jobTitle, setJobTitle] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [siteId, setSiteId] = useState(activeSiteId)
  const [result, setResult] = useState<'allowed' | 'partial' | 'blocked' | null>(null)
  const [checked, setChecked] = useState(false)

  const showPersonPicker = PERSON_PICKER_ACTIONS.has(action)

  useEffect(() => {
    setSiteId(activeSiteId)
    clearResult()
  }, [activeSiteId])

  function clearResult() {
    setResult(null)
    setChecked(false)
  }

  function handleActionChange(val: QuickCheckAction) {
    setAction(val)
    setJobTitle('')
    setSelectedUser(null)
    clearResult()
  }

  function handleSelectTitle(title: string) {
    setJobTitle(title)
    setSelectedUser(null)
    clearResult()
  }

  function handleSelectUser(user: User) {
    setSelectedUser(user)
    setJobTitle(user.jobTitle)
    clearResult()
  }

  function handleSiteChange(val: string) {
    setSiteId(val)
    clearResult()
  }

  function handleCheck() {
    if (!jobTitle) return
    setResult(checkAccess(action, jobTitle, siteId, sitesData))
    setChecked(true)
  }

  const activeSiteName = sitesData.find((s) => s.site.id === siteId)?.site.name ?? ''
  const adminHref = `mailto:admin@cubx.com?subject=${encodeURIComponent('Permission request')}&body=${encodeURIComponent(
    `Hi,\n\nI need access to: ${QUICK_CHECK_ACTIONS.find((a) => a.value === action)?.label ?? action} for ${selectedUser ? selectedUser.name : jobTitle} at ${activeSiteName}.\n\nThanks`
  )}`

  const hasSelection = !!jobTitle

  return (
    <div className="bg-[#E1D8F1]/30 rounded-xl border border-dashed border-[#C4B2E5] px-6 py-5">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <IconSparkle className="w-4 h-4 text-[#9171C8]" />
          <h2 className="text-base font-semibold text-gray-900">Quick Check</h2>
        </div>
        <p className="text-sm text-gray-500 mt-0.5 ml-6">Try a specific scenario before you act.</p>
      </div>

      {/* Desktop: inline row */}
      <div className="hidden sm:flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-700 font-medium">Can I</span>
        <ActionSelect value={action} onChange={handleActionChange} />
        {(!showPersonPicker || !selectedUser) && (
          <span className="text-sm text-gray-700">a</span>
        )}
        <PersonOrTitleSelect
          jobTitle={jobTitle}
          selectedUser={selectedUser}
          showPersonPicker={showPersonPicker}
          onSelectTitle={handleSelectTitle}
          onSelectUser={handleSelectUser}
        />
        <SiteSelect value={siteId} onChange={handleSiteChange} sitesData={sitesData} />
        <button
          type="button"
          onClick={handleCheck}
          disabled={!hasSelection}
          className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 active:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 transition-colors"
        >
          Check
        </button>
      </div>

      {/* Mobile: stacked column */}
      <div className="sm:hidden flex flex-col gap-2">
        <span className="text-base font-semibold text-gray-900">Can I</span>
        <div className="[&>div>button]:w-full">
          <ActionSelect value={action} onChange={handleActionChange} />
        </div>
        <div className="[&>div>button]:w-full">
          <PersonOrTitleSelect
            jobTitle={jobTitle}
            selectedUser={selectedUser}
            showPersonPicker={showPersonPicker}
            onSelectTitle={handleSelectTitle}
            onSelectUser={handleSelectUser}
          />
        </div>
        <div className="[&>div>button]:w-full">
          <SiteSelect value={siteId} onChange={handleSiteChange} sitesData={sitesData} />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCheck}
            disabled={!hasSelection}
            className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 active:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 transition-colors"
          >
            Check
          </button>
        </div>
      </div>

      {checked && result !== null && (
        <div className="mt-4 flex items-center gap-2">
          {result === 'allowed' && (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-sm text-green-700 font-medium">Yes, you can do this.</span>
            </>
          )}
          {result === 'partial' && (
            <>
              <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
              <span className="text-sm text-orange-700">
                You have the action but <strong>{jobTitle}</strong> isn't in your scope for this.{' '}
                <a href={adminHref} className="font-medium underline hover:text-orange-800">Talk to your admin</a>
                {' '}to expand your scope.
              </span>
            </>
          )}
          {result === 'blocked' && (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-sm text-red-600">
                You don't have access for this.{' '}
                <a href={adminHref} className="font-medium underline hover:text-red-700 transition-colors">
                  Talk to your admin
                </a>
                {' '}if you need it.
              </span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
