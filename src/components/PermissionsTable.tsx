import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { SitePermissions, ActionKey } from '../types'
import { IconUserPlus, IconUserEdit, IconUserMinus, IconSearch } from '../icons'

interface Props {
  siteName: string
  permissions: SitePermissions
  userName: string
}

const ACTION_META: Record<ActionKey, {
  label: string
  description: string
  performVerb: string
  approveVerb: string
  Icon: (p: { className?: string }) => JSX.Element
}> = {
  onboard: {
    label: 'Onboard',
    description: 'Bring someone new onto your team.',
    performVerb: 'onboard',
    approveVerb: 'onboarding',
    Icon: IconUserPlus,
  },
  edit: {
    label: 'Edit',
    description: "Change a person's record.",
    performVerb: 'edit',
    approveVerb: 'editing',
    Icon: IconUserEdit,
  },
  offboard: {
    label: 'Offboard',
    description: "End a person's employment.",
    performVerb: 'offboard',
    approveVerb: 'offboarding',
    Icon: IconUserMinus,
  },
}

const ALL_ACTIONS: ActionKey[] = ['onboard', 'edit', 'offboard']
const PILL_LIMIT = 5

// ─── Narrative ────────────────────────────────────────────────────────────────

function Bold({ children }: { children: string }) {
  return <span className="font-semibold">{children}</span>
}

function inlineBoldList(items: string[]): React.ReactNode[] {
  if (items.length === 0) return []
  if (items.length === 1) return [<Bold key={0}>{items[0]}</Bold>]
  return items.flatMap((item, i) => {
    const node = <Bold key={i}>{item}</Bold>
    if (i === 0) return [node]
    if (i === items.length - 1) return [', and ', node]
    return [', ', node]
  })
}

function Narrative({ permissions, siteName, userName }: { permissions: SitePermissions; siteName: string; userName: string }) {
  const performActions = ALL_ACTIONS.filter(k => permissions[k].canPerform)
  const approveOnlyActions = ALL_ACTIONS.filter(k => !permissions[k].canPerform && permissions[k].canApprove)
  const approveActions = ALL_ACTIONS.filter(k => permissions[k].canApprove)

  const SiteName = (
    <span className="font-semibold text-[#6a6faf] underline decoration-dotted underline-offset-2">
      {siteName}
    </span>
  )

  if (!performActions.length && !approveOnlyActions.length) {
    return (
      <p className="text-base text-[#202938] leading-normal">
        Hey <span className="font-semibold text-[#6a6faf]">{userName}</span>.{' '}
        You don't have any active permissions at {SiteName} yet.
      </p>
    )
  }

  const performVerbs = performActions.map(k => ACTION_META[k].performVerb)
  const approveVerbs = approveOnlyActions.map(k => ACTION_META[k].approveVerb)

  const allThreeApprove = approveActions.length === 3
  const allThreePerform = performActions.length === 3

  return (
    <p className="text-base text-[#202938] leading-normal">
      Hey <span className="font-semibold text-[#6a6faf]">{userName}</span>.{' '}
      {performActions.length > 0 && (
        <>You can {inlineBoldList(performVerbs)} users at {SiteName}.{' '}</>
      )}
      {allThreeApprove && allThreePerform ? (
        <>You can also <Bold>approve</Bold> all three actions when others submit them.</>
      ) : approveOnlyActions.length > 0 ? (
        performActions.length > 0 ? (
          <>You can also <Bold>approve</Bold> {inlineBoldList(approveVerbs)} requests when others submit them.</>
        ) : (
          <>You can <Bold>approve</Bold> {inlineBoldList(approveVerbs)} requests at {SiteName} when others submit them.</>
        )
      ) : null}
    </p>
  )
}

// ─── Scope Popover ────────────────────────────────────────────────────────────

function ScopePopover({
  scopes,
  triggerRef,
  onClose,
}: {
  scopes: string[]
  triggerRef: React.RefObject<HTMLButtonElement | null>
  onClose: () => void
}) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden' })
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const popoverWidth = 272
    const left = Math.min(rect.left, window.innerWidth - popoverWidth - 12)
    setStyle({
      position: 'fixed',
      top: rect.bottom + 6,
      left: Math.max(8, left),
      width: popoverWidth,
      zIndex: 9999,
      visibility: 'visible',
    })
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [triggerRef])

  const handleOutside = useCallback((e: MouseEvent) => {
    if (
      popoverRef.current?.contains(e.target as Node) ||
      triggerRef.current?.contains(e.target as Node)
    ) return
    onClose()
  }, [onClose, triggerRef])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [handleOutside, onClose])

  return createPortal(
    <div ref={popoverRef} style={style} className="bg-white border border-[#eaecf0] rounded-xl shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#eaecf0]">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {scopes.length} job titles
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors leading-none text-base"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="px-3 py-2.5 border-b border-[#eaecf0]">
        <div className="flex items-center gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg">
          <IconSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors text-sm leading-none">✕</button>
          )}
        </div>
      </div>
      <div className="p-3 max-h-52 overflow-y-auto">
        {(() => {
          const filtered = query ? scopes.filter(t => t.toLowerCase().includes(query.toLowerCase())) : scopes
          return filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-3">No results</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filtered.map((title) => (
                <span
                  key={title}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-[rgba(0,0,0,0.08)] text-[#202938] tracking-[0.4px]"
                >
                  {title}
                </span>
              ))}
            </div>
          )
        })()}
      </div>
    </div>,
    document.body,
  )
}

// ─── Scope List ───────────────────────────────────────────────────────────────

function ScopeList({ scopes }: { scopes: string[] }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  if (scopes.length === 0) return null

  const visible = scopes.slice(0, PILL_LIMIT)
  const remaining = scopes.length - PILL_LIMIT

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((title) => (
        <span
          key={title}
          className="inline-flex items-center max-h-6 px-2 py-0.5 rounded-full text-xs bg-[rgba(0,0,0,0.08)] text-[#202938] tracking-[0.4px]"
        >
          {title}
        </span>
      ))}
      {remaining > 0 && (
        <>
          <button
            ref={triggerRef}
            onClick={() => setOpen((o) => !o)}
            className="text-[13px] font-medium text-[#3a3e75] hover:opacity-70 transition-opacity leading-6"
          >
            {open ? '− hide' : `+ ${remaining} more`}
          </button>
          {open && (
            <ScopePopover
              scopes={scopes}
              triggerRef={triggerRef}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      )}
    </div>
  )
}

// ─── Badges ───────────────────────────────────────────────────────────────────

function YesBadge() {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-semibold bg-[#edfcf2] text-[#095c37]">
      Yes
    </span>
  )
}

function NoBadge() {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-semibold bg-[#fcf4f2] text-[#a63224]">
      No
    </span>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function PermissionsTable({ siteName, permissions, userName }: Props) {
  const visibleActions = ALL_ACTIONS.filter((key) => {
    const p = permissions[key]
    return p.canPerform || p.canApprove
  })

  return (
    <div className="bg-white rounded-xl border border-[#eaecf0] shadow-[0px_1px_1px_rgba(16,24,40,0.05)] flex flex-col gap-4 p-6">

      {/* Title */}
      <h2 className="text-base font-semibold text-[#202938] tracking-[0.15px] leading-7">
        What you can do at {siteName}
      </h2>

      {/* Narrative */}
      <Narrative permissions={permissions} siteName={siteName} userName={userName} />

      {/* Table */}
      <div className="border border-[#eaecf0] rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#f7f8fc] border-b border-[#eaecf0] text-left text-sm font-medium text-[#616a7e] px-4 py-3 w-[380px] rounded-tl-xl">
                Action
              </th>
              <th className="bg-[#f7f8fc] border-b border-[#eaecf0] text-left text-sm font-medium text-[#616a7e] px-4 py-3">
                Do it yourself
              </th>
              <th className="bg-[#f7f8fc] border-b border-[#eaecf0] text-left text-sm font-medium text-[#616a7e] px-4 py-3 rounded-tr-xl">
                Approve for others
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleActions.map((key, idx) => {
              const { label, description, Icon } = ACTION_META[key]
              const perm = permissions[key]
              const isLast = idx === visibleActions.length - 1

              return (
                <tr key={key} className={!isLast ? 'border-b border-[#eaecf0]' : ''}>
                  {/* Action */}
                  <td className="px-4 pt-4 pb-[17px] w-[380px] align-middle">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#edfcf2] flex items-center justify-center text-[#095c37]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-[#202938] tracking-[0.15px] leading-7">{label}</div>
                        <div className="text-sm text-[#616a7e] leading-5">{description}</div>
                      </div>
                    </div>
                  </td>

                  {/* Do it yourself */}
                  <td className="px-4 pt-4 pb-[17px] align-middle">
                    {perm.canPerform ? (
                      <div className="flex flex-col items-start gap-3">
                        <YesBadge />
                        <ScopeList scopes={perm.performScopes} />
                      </div>
                    ) : (
                      <NoBadge />
                    )}
                  </td>

                  {/* Approve for others */}
                  <td className="px-4 pt-4 pb-[17px] align-middle">
                    {perm.canApprove ? (
                      <div className="flex flex-col items-start gap-3">
                        <YesBadge />
                        <ScopeList scopes={perm.approveScopes} />
                      </div>
                    ) : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
