import { useState } from 'react'
import type { SiteData } from '../types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ActionInfo {
  key: 'onboard' | 'offboard' | 'edit'
  icon: string
  title: string
  desc: string
}

const ACTIONS: ActionInfo[] = [
  { key: 'onboard',  icon: 'person_add',      title: 'Onboard a user',  desc: 'Bring someone new onto your team' },
  { key: 'offboard', icon: 'person_remove',    title: 'Offboard a user', desc: "End a person's employment" },
  { key: 'edit',     icon: 'manage_accounts',  title: 'Edit a user',     desc: 'Update profiles & roles' },
]

// ─── JobChips ─────────────────────────────────────────────────────────────────

function JobChips({ jobs }: { jobs: string[] }) {
  const [showAll, setShowAll] = useState(false)

  if (jobs.length === 0) return null

  const chipBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 10px', borderRadius: 'var(--radius-pill)',
    font: '500 0.75rem/1.125rem var(--font-inter)', whiteSpace: 'nowrap',
  }

  if (jobs.length === 1 && jobs[0] === 'All job titles') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ ...chipBase, border: '1px solid #CFE9D7', background: '#E7F4EA', color: '#1B7A43' }}>
          All job titles
        </span>
      </div>
    )
  }

  const preview = 8
  const hidden = jobs.length - preview
  const visible = showAll ? jobs : jobs.slice(0, preview)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {visible.map((j) => (
        <span key={j} style={{ ...chipBase, border: '1px solid #d0d5dd', background: 'var(--bg-default)', color: 'var(--secondary)' }}>
          {j}
        </span>
      ))}
      {hidden > 0 && !showAll && (
        <button onClick={() => setShowAll(true)} style={{ ...chipBase, border: '1px solid var(--brand-300)', background: 'var(--brand-50)', color: 'var(--brand-600)', cursor: 'pointer' }}>
          +{hidden} more
        </button>
      )}
      {hidden > 0 && showAll && (
        <button onClick={() => setShowAll(false)} style={{ ...chipBase, border: '1px solid var(--brand-300)', background: 'var(--brand-50)', color: 'var(--brand-600)', cursor: 'pointer', gap: 2 }}>
          Show less <span className="ico" style={{ fontSize: 15, marginLeft: 2 }}>expand_less</span>
        </button>
      )}
    </div>
  )
}

// ─── ActionCard ───────────────────────────────────────────────────────────────

interface ActionCardProps {
  action: ActionInfo
  allowed: boolean
  jobs: string[]
}

function ActionCard({ action, allowed, jobs }: ActionCardProps) {
  return (
    <div style={{
      flex: '1 0 0',
      borderRadius: 12,
      border: '1px solid #eaecf0',
      padding: 18,
      display: 'flex', flexDirection: 'column',
      background: allowed ? 'var(--bg-default)' : '#fcfbfd',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <div style={{
          flexShrink: 0, width: 36, height: 36, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: allowed ? '#E7F4EA' : 'var(--bg-paper-elev-1)',
          color: allowed ? '#1B7A43' : 'var(--icon-subtle)',
          border: allowed ? 'none' : '1px solid var(--divider)',
        }}>
          <span className="ico" style={{ fontSize: 20 }}>{action.icon}</span>
        </div>
        <div>
          <h3 style={{
            margin: 0, font: 'var(--type-subtitle1)', letterSpacing: 'var(--type-subtitle1-tracking)',
            color: allowed ? 'var(--fg-1)' : '#616a7e',
          }}>{action.title}</h3>
          <p style={{ margin: '2px 0 0', font: 'var(--type-body2)', color: allowed ? 'var(--fg-2)' : '#9aa2b2' }}>{action.desc}</p>
        </div>
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        font: '600 0.8125rem/1.125rem var(--font-inter)', whiteSpace: 'nowrap',
        color: allowed ? '#084c2e' : '#9aa2b2',
      }}>
        <span className="ico" style={{ fontSize: 17, color: allowed ? '#2E9E5B' : '#9aa2b2' }}>
          {allowed ? 'check_circle' : 'do_not_disturb_on'}
        </span>
        {allowed ? 'You can do this' : 'Not available for you'}
      </div>

      {allowed && (
        <>
          <div style={{ height: 1, background: 'var(--divider)', margin: '14px 0' }} />
          <div style={{
            font: '400 0.75rem/1.66rem var(--font-inter)',
            letterSpacing: '0.4px',
            color: 'var(--fg-1)',
            marginBottom: 8,
          }}>
            For people with these job titles
          </div>
          <JobChips jobs={jobs} />
        </>
      )}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface SectionProps {
  icon: string
  title: string
  subtitle: string
  mode: 'perform' | 'approve'
  siteData: SiteData
}

function Section({ icon, title, subtitle, mode, siteData }: SectionProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{
          margin: '0 0 3px',
          font: 'var(--type-h6)', letterSpacing: 'var(--type-h6-tracking)',
          color: 'var(--fg-1)',
          display: 'flex', alignItems: 'center', gap: 9,
        }}>
          <span className="ico" style={{ fontSize: 22, color: 'var(--icon-base)' }}>{icon}</span>
          {title}
        </h2>
        <p style={{ margin: 0, font: 'var(--type-body2)', color: 'var(--fg-2)' }}>{subtitle}</p>
      </div>
      <div className="perm-cards-row">
        {ACTIONS.map((action) => {
          const perm = siteData.permissions[action.key]
          const allowed = mode === 'perform' ? perm.canPerform : perm.canApprove
          const jobs = mode === 'perform' ? perm.performScopes : perm.approveScopes
          return <ActionCard key={action.key} action={action} allowed={allowed} jobs={jobs} />
        })}
      </div>
    </div>
  )
}

// ─── MyPermissionsPage ────────────────────────────────────────────────────────

interface Props {
  siteData: SiteData
}

export function MyPermissionsPage({ siteData }: Props) {
  return (
    <>
      <Section
        icon="bolt"
        title="What you can do yourself"
        subtitle="Actions you can perform directly, right now."
        mode="perform"
        siteData={siteData}
      />
      <Section
        icon="how_to_reg"
        title="What you can approve for others"
        subtitle="Requests you can authorize when a teammate submits them."
        mode="approve"
        siteData={siteData}
      />
    </>
  )
}
