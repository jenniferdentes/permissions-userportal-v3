import { useState } from 'react'
import type { SiteData } from '../types'
import { JOB_TITLES } from '../data'

type ActionKey = 'onboard' | 'offboard' | 'edit'
type Mode = 'perform' | 'approve'

const ACTIONS: { key: ActionKey; label: string }[] = [
  { key: 'onboard',  label: 'Onboard a user' },
  { key: 'offboard', label: 'Offboard a user' },
  { key: 'edit',     label: 'Edit a user' },
]

const SELECT_STYLE: React.CSSProperties = {
  appearance: 'none',
  font: '400 0.9375rem/1 var(--font-inter)',
  padding: '10px 34px 10px 12px',
  border: '1px solid var(--secondary-outlined-border)',
  borderRadius: 'var(--radius-base)',
  background: `var(--bg-default) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center`,
  color: 'var(--fg-1)',
  cursor: 'pointer',
  minWidth: 190,
}

interface Props {
  activeSiteData: SiteData
}

export function QuickCheck({ activeSiteData }: Props) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('perform')
  const [actionKey, setActionKey] = useState<ActionKey>('onboard')
  const [job, setJob] = useState(JOB_TITLES[0])

  const perm = activeSiteData.permissions[actionKey]
  const allowed = mode === 'perform' ? perm.canPerform : perm.canApprove
  const scopes = mode === 'perform' ? perm.performScopes : perm.approveScopes
  const ok = allowed && (scopes.length === 0 || scopes.includes(job))
  const verb = mode === 'perform' ? 'do this yourself' : 'approve this'
  const siteName = activeSiteData.site.name

  return (
    <div style={{
      marginTop: 8,
      border: '1px solid var(--divider)',
      borderRadius: 'var(--radius-base)',
      background: 'var(--bg-default)',
      overflow: 'hidden',
    }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 20px',
          background: 'none', border: 0,
          cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--font-inter)',
        }}
      >
        <span className="ico" style={{ fontSize: 22, color: 'var(--icon-base)', flexShrink: 0 }}>help</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <strong style={{ font: 'var(--type-subtitle2)', letterSpacing: 'var(--type-subtitle2-tracking)', color: 'var(--fg-1)' }}>
            Don't see your exact situation?
          </strong>
          <span style={{ font: 'var(--type-body2)', color: 'var(--fg-2)' }}>
            Check one specific action, job title, and site.
          </span>
        </span>
        <span className="ico" style={{
          marginLeft: 'auto', flexShrink: 0,
          fontSize: 22, color: 'var(--icon-base)',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: `transform var(--duration-shorter) var(--easing-standard)`,
        }}>expand_more</span>
      </button>

      {/* Animated body */}
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: `grid-template-rows var(--duration-standard) var(--easing-standard)`,
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '4px 20px 22px', borderTop: '1px solid var(--divider)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 14, paddingTop: 18 }}>

              {/* Mode toggle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ font: 'var(--type-caption)', letterSpacing: 'var(--type-caption-tracking)', color: 'var(--fg-2)' }}>
                  I want to
                </label>
                <div style={{
                  display: 'inline-flex',
                  border: '1px solid var(--secondary-outlined-border)',
                  borderRadius: 'var(--radius-base)',
                  overflow: 'hidden',
                }}>
                  {(['perform', 'approve'] as Mode[]).map((m, i) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      style={{
                        appearance: 'none',
                        border: 0,
                        borderLeft: i > 0 ? '1px solid var(--secondary-outlined-border)' : 'none',
                        background: mode === m ? 'var(--brand-600)' : 'var(--bg-default)',
                        padding: '9px 14px',
                        font: '600 0.8125rem/1 var(--font-inter)',
                        color: mode === m ? '#fff' : 'var(--fg-2)',
                        cursor: 'pointer',
                        transition: `background var(--duration-shortest) var(--easing-standard)`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {m === 'perform' ? 'Do it myself' : 'Approve for someone'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ font: 'var(--type-caption)', letterSpacing: 'var(--type-caption-tracking)', color: 'var(--fg-2)' }}>
                  Action
                </label>
                <select value={actionKey} onChange={(e) => setActionKey(e.target.value as ActionKey)} style={SELECT_STYLE}>
                  {ACTIONS.map((a) => (
                    <option key={a.key} value={a.key}>{a.label}</option>
                  ))}
                </select>
              </div>

              {/* Job title select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ font: 'var(--type-caption)', letterSpacing: 'var(--type-caption-tracking)', color: 'var(--fg-2)' }}>
                  For a
                </label>
                <select value={job} onChange={(e) => setJob(e.target.value)} style={SELECT_STYLE}>
                  {JOB_TITLES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Auto-computed result */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginTop: 18,
              padding: '12px 16px',
              borderRadius: 'var(--radius-base)',
              font: 'var(--type-body2)',
              background: ok ? '#E7F4EA' : 'var(--bg-paper-elev-1)',
              color: ok ? '#1B7A43' : 'var(--fg-2)',
            }}>
              <span className="ico" style={{ fontSize: 20, flexShrink: 0, color: ok ? '#2E9E5B' : 'var(--icon-subtle)' }}>
                {ok ? 'check_circle' : 'do_not_disturb_on'}
              </span>
              <div>
                {ok ? (
                  <span>Yes — you can <strong>{verb}</strong> for a <strong>{job}</strong> at <strong>{siteName}</strong>.</span>
                ) : (
                  <span>No — you can't <strong>{verb}</strong> for a <strong>{job}</strong> at <strong>{siteName}</strong>.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
