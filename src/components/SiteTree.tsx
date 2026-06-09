import type { SiteData, TreeRelation } from '../types'

// ─── Badge config ─────────────────────────────────────────────────────────────

function getBadges(relation: TreeRelation): Array<{ label: string; bg: string; color: string }> {
  switch (relation) {
    case 'parent':
      return [
        { label: 'Out of Scope', bg: '#e8e9f2', color: '#616a7e' },
        { label: 'Above you',    bg: '#ffa726', color: '#fff'     },
      ]
    case 'self':
      return [{ label: 'You', bg: '#16b364', color: '#fff' }]
    case 'child-in-reach':
      return [{ label: 'In Reach', bg: '#d3f8df', color: '#084c2e' }]
    case 'child-approve-only':
      return [{ label: 'Approve Requests Only', bg: '#cce3f1', color: '#0071ba' }]
    case 'child-out-of-scope':
      return [{ label: 'Out of Scope', bg: '#e8e9f2', color: '#616a7e' }]
  }
}

function BadgePill({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0 6.5px', borderRadius: 100,
      font: '500 0.75rem/20px var(--font-inter)', letterSpacing: '0.14px',
      background: bg, color, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
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
      border: `1px solid ${isSelf ? 'rgba(46,125,50,0.5)' : '#d0d5dd'}`,
      background: isSelf ? '#edfcf2' : isGhosted ? '#f0f2f9' : '#ffffff',
    }}>
      {isSelf && (
        <span
          className="ico"
          style={{ fontSize: 18, color: '#16b364', flexShrink: 0, fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        >
          star
        </span>
      )}
      <span style={{
        flex: 1, minWidth: 0,
        font: '400 0.875rem/1.43 var(--font-inter)',
        color: isSelf ? '#084c2e' : isGhosted ? '#9aa2b2' : '#202938',
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

const LINE_COLOR = '#d0d5dd'
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
  const parentNode = tree.find((n) => n.relation === 'parent')
  const selfNode   = tree.find((n) => n.relation === 'self')
  const childNodes = tree.filter((n) => n.relation !== 'parent' && n.relation !== 'self')

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #eaecf0',
      borderRadius: 12,
      boxShadow: '0 1px 1px rgba(16,24,40,0.05)',
      padding: 24,
      marginTop: 24,
    }}>
      <h2 style={{
        margin: '0 0 4px',
        font: '600 1rem/1.75 var(--font-inter)', letterSpacing: '0.15px',
        color: '#202938',
      }}>
        Where you can act at {site.name}
      </h2>
      <p style={{ margin: '0 0 16px', font: '400 0.875rem/1.43 var(--font-inter)', color: '#616a7e' }}>
        Sites where your permissions extend, based on your role here. Hover any badge to learn what it means.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {parentNode && <NodeRow relation="parent" name={parentNode.name} />}
        {parentNode && selfNode && <ConnectorStraight />}
        {selfNode && <NodeRow relation="self" name={selfNode.name} />}
        {selfNode && childNodes.length > 0 && <ConnectorBranch />}
        {childNodes.length > 0 && (
          <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {childNodes.map((n) => (
              <NodeRow key={n.id} relation={n.relation} name={n.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
