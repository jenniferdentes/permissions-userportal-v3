import { useState, useRef, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import type { SiteData, TreeRelation } from '../types'

// ─── Badge config ─────────────────────────────────────────────────────────────

const BADGE_TOOLTIPS: Record<string, string> = {
  'You':                  'This is your site',
  'In Reach':             'You can perform actions here based on your role',
  'Approve Requests Only':'You can authorize requests here but not act directly',
  'Above you':            'This site is above your level — out of your scope',
  'Out of Scope':         "Your permissions don't extend to this site",
}

function getBadges(relation: TreeRelation): Array<{ label: string; bg: string; color: string }> {
  switch (relation) {
    case 'parent':
      return [
        { label: 'Out of Scope', bg: 'var(--brand-100)', color: 'var(--fg-2)' },
        { label: 'Above you',    bg: '#ffa726',           color: '#fff'        },
      ]
    case 'self':
      return [{ label: 'You', bg: 'var(--status-success-icon)', color: '#fff' }]
    case 'child-in-reach':
      return [{ label: 'In Reach', bg: 'var(--status-success-bg)', color: 'var(--status-success-text)' }]
    case 'child-approve-only':
      return [{ label: 'Approve Requests Only', bg: 'var(--portal-accent6-light)', color: 'var(--portal-accent6-dark)' }]
    case 'child-out-of-scope':
      return [{ label: 'Out of Scope', bg: 'var(--brand-100)', color: 'var(--fg-2)' }]
  }
}

function BadgePill({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <Tooltip title={BADGE_TOOLTIPS[label] ?? ''} placement="top" arrow>
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '0 6.5px', borderRadius: 100,
        font: '500 0.75rem/20px var(--font-inter)', letterSpacing: '0.14px',
        background: bg, color, whiteSpace: 'nowrap', cursor: 'default',
      }}>
        {label}
      </span>
    </Tooltip>
  )
}

// ─── Node row ─────────────────────────────────────────────────────────────────

function NodeRow({ relation, name }: { relation: TreeRelation; name: string }) {
  const isSelf    = relation === 'self'
  const isGhosted = relation === 'parent' || relation === 'child-out-of-scope'
  const badges    = getBadges(relation)

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 12px', borderRadius: 8,
      border: `1px solid ${isSelf ? 'var(--status-success-border)' : 'var(--divider)'}`,
      background: isSelf ? 'var(--status-success-bg)' : isGhosted ? 'var(--bg-paper-elev-1)' : 'var(--bg-default)',
    }}>
      {isSelf && (
        <span
          className="ico"
          style={{ fontSize: 18, color: 'var(--status-success-icon)', flexShrink: 0, fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        >
          star
        </span>
      )}
      <span style={{
        flex: 1, minWidth: 0,
        font: '400 0.875rem/1.43 var(--font-inter)',
        color: isSelf ? 'var(--status-success-text)' : isGhosted ? 'var(--fg-disabled)' : 'var(--fg-1)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
        {badges.map((b) => <BadgePill key={b.label} {...b} />)}
      </div>
    </div>
  )
}

// ─── Connector lines ──────────────────────────────────────────────────────────

const LINE_COLOR = 'var(--divider)'
const LINE_X = 22

function ConnectorStraight() {
  return (
    <div style={{ height: 16, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: LINE_X, top: 0, bottom: 0, width: 1, background: LINE_COLOR }} />
    </div>
  )
}

function ConnectorBranch() {
  return (
    <div style={{ height: 16, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: LINE_X, top: 0, bottom: 0, width: 1, background: LINE_COLOR }} />
      <div style={{ position: 'absolute', left: LINE_X, top: 8, width: 14, height: 1, background: LINE_COLOR }} />
    </div>
  )
}

// ─── SiteTree ─────────────────────────────────────────────────────────────────

interface Props {
  siteData: SiteData
}

export function SiteTree({ siteData }: Props) {
  const { site, tree, yourTitle: _yourTitle } = siteData
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const parentNode = tree.find((n) => n.relation === 'parent')
  const selfNode   = tree.find((n) => n.relation === 'self')
  const allChildren = tree.filter((n) => n.relation !== 'parent' && n.relation !== 'self')

  const childNodes = query.trim()
    ? allChildren.filter((n) => n.name.toLowerCase().includes(query.toLowerCase()))
    : allChildren

  function toggleSearch() {
    setSearchOpen((o) => {
      if (o) setQuery('')
      return !o
    })
  }

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 0)
  }, [searchOpen])

  return (
    <div style={{
      background: 'var(--bg-default)',
      border: '1px solid var(--divider)',
      borderRadius: 12,
      boxShadow: '0 1px 1px rgba(16,24,40,0.05)',
      padding: 24,
      marginTop: 24,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
        <h2 style={{
          margin: 0,
          font: '600 1rem/1.75 var(--font-inter)', letterSpacing: '0.15px',
          color: 'var(--fg-1)',
        }}>
          Where you can act at {site.name}
        </h2>
        <button
          onClick={toggleSearch}
          title={searchOpen ? 'Close search' : 'Search sites'}
          style={{
            flexShrink: 0,
            marginLeft: 12,
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 8, border: `1px solid ${searchOpen ? 'var(--brand-300)' : 'var(--divider)'}`,
            background: searchOpen ? 'var(--brand-50)' : 'transparent',
            color: searchOpen ? 'var(--brand-600)' : 'var(--icon-base)',
            cursor: 'pointer',
            transition: 'background 150ms, border-color 150ms, color 150ms',
          }}
        >
          <span className="ico" style={{ fontSize: 18 }}>search</span>
        </button>
      </div>
      <p style={{ margin: '0 0 12px', font: '400 0.875rem/1.43 var(--font-inter)', color: 'var(--fg-2)' }}>
        Sites where your permissions extend, based on your role here. Hover any badge to learn what it means.
      </p>

      {/* Search input */}
      {searchOpen && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 12px',
          marginBottom: 12,
          border: '1px solid var(--brand-300)',
          borderRadius: 8,
          background: 'var(--bg-default)',
        }}>
          <span className="ico" style={{ fontSize: 18, color: 'var(--icon-subtle)', flexShrink: 0 }}>search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sites…"
            style={{
              flex: 1, border: 0, outline: 'none',
              font: '400 0.875rem/1.43 var(--font-inter)',
              color: 'var(--fg-1)',
              background: 'transparent',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: 'var(--icon-subtle)' }}
            >
              <span className="ico" style={{ fontSize: 18 }}>close</span>
            </button>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {parentNode && <NodeRow relation="parent" name={parentNode.name} />}
        {parentNode && selfNode && <ConnectorStraight />}
        {selfNode && <NodeRow relation="self" name={selfNode.name} />}
        {selfNode && childNodes.length > 0 && <ConnectorBranch />}
        {childNodes.length > 0 ? (
          <div style={{
            paddingLeft: 36,
            maxHeight: 260,
            overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {childNodes.map((n) => (
              <NodeRow key={n.id} relation={n.relation} name={n.name} />
            ))}
          </div>
        ) : query ? (
          <div style={{
            paddingLeft: 36,
            font: '400 0.875rem/1.43 var(--font-inter)',
            color: 'var(--fg-2)',
            padding: '12px 12px 4px 36px',
          }}>
            No sites match "{query}"
          </div>
        ) : null}
      </div>
    </div>
  )
}
