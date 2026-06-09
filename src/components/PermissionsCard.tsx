import { useState } from 'react'
import type { SiteData, TreeRelation } from '../types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScopeGroup {
  label: string
  items: string[]
  preview: number
}

interface PermCol {
  allowed: boolean
  groups: ScopeGroup[]
}

interface CardData {
  icon: string
  title: string
  desc: string
  perform: PermCol
  approve: PermCol
}

// ─── Data derivation ──────────────────────────────────────────────────────────

function performSites(tree: SiteData['tree']): string[] {
  return tree
    .filter((n) => n.relation === 'self' || n.relation === 'child-in-reach')
    .map((n) => n.name)
}

function approveSites(tree: SiteData['tree']): string[] {
  const allow: TreeRelation[] = ['self', 'child-in-reach', 'child-approve-only']
  return tree.filter((n) => allow.includes(n.relation)).map((n) => n.name)
}

export function buildCardData(siteData: SiteData): CardData[] {
  const { permissions, tree } = siteData
  const pSites = performSites(tree)
  const aSites = approveSites(tree)

  return [
    {
      icon: 'person_add',
      title: 'Onboard a user',
      desc: 'Bring someone new onto your team',
      perform: {
        allowed: permissions.onboard.canPerform,
        groups: permissions.onboard.canPerform ? [
          { label: 'Job titles', items: permissions.onboard.performScopes, preview: 4 },
          { label: 'Sites', items: pSites, preview: 3 },
        ] : [],
      },
      approve: {
        allowed: permissions.onboard.canApprove,
        groups: permissions.onboard.canApprove ? [
          { label: 'Job titles', items: permissions.onboard.approveScopes, preview: 4 },
          { label: 'Sites', items: aSites, preview: 3 },
        ] : [],
      },
    },
    {
      icon: 'person_remove',
      title: 'Offboard a user',
      desc: "End a person's employment",
      perform: {
        allowed: permissions.offboard.canPerform,
        groups: permissions.offboard.canPerform ? [
          { label: 'Job titles', items: permissions.offboard.performScopes, preview: 4 },
          { label: 'Sites', items: pSites, preview: 3 },
        ] : [],
      },
      approve: {
        allowed: permissions.offboard.canApprove,
        groups: permissions.offboard.canApprove ? [
          { label: 'Job titles', items: permissions.offboard.approveScopes, preview: 4 },
          { label: 'Sites', items: aSites, preview: 3 },
        ] : [],
      },
    },
    {
      icon: 'person_edit',
      title: 'Edit a user',
      desc: "Change a person's record",
      perform: {
        allowed: permissions.edit.canPerform,
        groups: permissions.edit.canPerform ? [
          { label: 'Job titles', items: permissions.edit.performScopes, preview: 4 },
          { label: 'Sites', items: pSites, preview: 3 },
        ] : [],
      },
      approve: {
        allowed: permissions.edit.canApprove,
        groups: permissions.edit.canApprove ? [
          { label: 'Job titles', items: permissions.edit.approveScopes, preview: 4 },
          { label: 'Sites', items: aSites, preview: 3 },
        ] : [],
      },
    },
  ]
}

// ─── ScopeGroup ───────────────────────────────────────────────────────────────

function ScopeGroupRow({ group }: { group: ScopeGroup }) {
  const [showAll, setShowAll] = useState(false)
  const hidden = group.items.length - group.preview
  const visible = showAll ? group.items : group.items.slice(0, group.preview)

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        font: 'var(--type-caption)',
        letterSpacing: 'var(--type-caption-tracking)',
        color: 'var(--fg-2)',
        marginBottom: 7,
      }}>
        {group.label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {visible.map((item) => (
          <span key={item} style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--secondary-outlined-border)',
            background: 'var(--bg-default)',
            color: 'var(--secondary)',
            font: '500 0.8125rem/1.125rem var(--font-inter)',
            whiteSpace: 'nowrap',
          }}>
            {item}
          </span>
        ))}
        {hidden > 0 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--brand-300)',
              background: 'var(--brand-50)',
              color: 'var(--brand-600)',
              font: '500 0.8125rem/1.125rem var(--font-inter)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            +{hidden} more
          </button>
        )}
        {hidden > 0 && showAll && (
          <button
            onClick={() => setShowAll(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--brand-300)',
              background: 'var(--brand-50)',
              color: 'var(--brand-600)',
              font: '500 0.8125rem/1.125rem var(--font-inter)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            Show less <span className="ico" style={{ fontSize: 15, marginLeft: 2 }}>expand_less</span>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── PermColumn ───────────────────────────────────────────────────────────────

function PermColumn({ label, perm }: { label: string; perm: PermCol }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ padding: '16px 24px 24px' }}>
      {/* Label + chip row (chip left, See where right) */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            font: '500 0.875rem/1.5rem var(--font-inter)',
            color: '#616a7e',
          }}>
            {label}
          </div>

          {perm.allowed ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '3px 12px',
              borderRadius: 'var(--radius-pill)',
              font: '600 0.8125rem/1.125rem var(--font-inter)',
              whiteSpace: 'nowrap',
              background: '#edfcf2',
              color: '#095c37',
            }}>
              <span className="ico" style={{ fontSize: 16, color: '#2E9E5B' }}>check</span>
              You can do this
            </div>
          ) : (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '3px 12px',
              borderRadius: 'var(--radius-pill)',
              font: '600 0.8125rem/1.125rem var(--font-inter)',
              whiteSpace: 'nowrap',
              background: '#fcf4f2',
              color: '#a63224',
            }}>
              <span className="ico" style={{ fontSize: 16, color: '#a63224' }}>close</span>
              No permission
            </div>
          )}
        </div>

        {perm.allowed && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 8px',
              border: 0,
              background: 'transparent',
              color: 'var(--brand-500)',
              font: '500 0.875rem/1.5rem var(--font-inter)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              borderRadius: 'var(--radius-base)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--brand-600)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--brand-500)' }}
          >
            {open ? 'Hide' : 'See where'}
            <span className="ico" style={{
              fontSize: 16,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: `transform var(--duration-shorter) var(--easing-standard)`,
            }}>
              expand_more
            </span>
          </button>
        )}
      </div>

      {perm.allowed && (
        <div style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: `grid-template-rows var(--duration-standard) var(--easing-standard)`,
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ paddingTop: 12 }}>
              {perm.groups.map((g) => <ScopeGroupRow key={g.label} group={g} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PermCard ─────────────────────────────────────────────────────────────────

function PermCard({ item }: { item: CardData }) {
  return (
    <div style={{
      background: 'var(--bg-default)',
      border: '1px solid var(--divider)',
      borderRadius: 12,
      boxShadow: '0px 1px 1px rgba(16,24,40,0.05)',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid var(--divider)' }}>
        <div style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'var(--bg-paper-elev-1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--icon-strong)',
        }}>
          <span className="ico" style={{ fontSize: 20 }}>{item.icon}</span>
        </div>
        <div>
          <h2 style={{
            margin: 0,
            font: '600 1rem/1.75rem var(--font-inter)',
            letterSpacing: '0.15px',
            color: 'var(--fg-1)',
          }}>
            {item.title}
          </h2>
          <p style={{ margin: 0, font: 'var(--type-body2)', color: '#616a7e' }}>
            {item.desc}
          </p>
        </div>
      </div>

      <div className="perm-card-cols">
        <PermColumn label="Perform" perm={item.perform} />
        <div className="perm-card-col-right">
          <PermColumn label="Approve" perm={item.approve} />
        </div>
      </div>
    </div>
  )
}

// ─── MyPermissionsPage ────────────────────────────────────────────────────────

interface Props {
  siteData: SiteData
}

export function MyPermissionsPage({ siteData }: Props) {
  const cards = buildCardData(siteData)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', paddingBottom: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {cards.map((item) => <PermCard key={item.title} item={item} />)}
      </div>
    </div>
  )
}
