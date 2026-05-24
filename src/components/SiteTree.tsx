import type { TreeNode, TreeRelation } from '../types'
import { IconStar } from '../icons'

interface Props {
  siteName: string
  nodes: TreeNode[]
}

interface BadgeConfig {
  label: string
  className: string
  tooltip: string
}

const BADGE: Record<TreeRelation, BadgeConfig> = {
  parent: {
    label: 'Above you',
    className: 'bg-amber-100 text-amber-700',
    tooltip: "This site sits above yours in the org. Your permissions don't extend there.",
  },
  self: {
    label: 'You',
    className: 'bg-green-100 text-green-700',
    tooltip: "This is your home site — the one you're directly a member of.",
  },
  'child-in-reach': {
    label: 'In Reach',
    className: 'bg-green-100 text-green-700',
    tooltip: 'Your full permissions carry over to this site, just like at your home site.',
  },
  'child-approve-only': {
    label: 'Approve Requests Only',
    className: 'bg-blue-100 text-blue-700',
    tooltip: "You can review and sign off on requests here, but you can't take direct action.",
  },
  'child-out-of-scope': {
    label: 'Out of Scope',
    className: 'bg-gray-100 text-gray-500',
    tooltip: "Your permissions don't extend to this site.",
  },
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="relative group/tip inline-flex">
      {children}
      <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden group-hover/tip:block z-50 w-56 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg leading-relaxed whitespace-normal">
        {text}
        <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function RelationBadge({ relation }: { relation: TreeRelation }) {
  const { label, className, tooltip } = BADGE[relation]
  return (
    <Tooltip text={tooltip}>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-default ${className}`}>
        {label}
      </span>
    </Tooltip>
  )
}

// ─── Site Tree ────────────────────────────────────────────────────────────────

export function SiteTree({ siteName, nodes }: Props) {
  const parentNodes = nodes.filter((n) => n.relation === 'parent')
  const selfNode = nodes.find((n) => n.relation === 'self')
  const childNodes = nodes.filter(
    (n) => n.relation === 'child-in-reach' || n.relation === 'child-approve-only' || n.relation === 'child-out-of-scope'
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-6 pt-5 pb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Where you can act at {siteName}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Sites where your permissions extend, based on your role here. Hover any badge to learn what it means.
        </p>
      </div>

      <div className="px-6 pb-6 space-y-1.5">
        {/* Parent nodes */}
        {parentNodes.map((node) => (
          <div
            key={node.id}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
          >
            <span className="text-sm text-gray-600">{node.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Out of Scope</span>
              <RelationBadge relation={node.relation} />
            </div>
          </div>
        ))}

        {/* Self node */}
        {selfNode && (
          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2">
              <IconStar className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-900">{selfNode.name}</span>
            </div>
            <RelationBadge relation="self" />
          </div>
        )}

        {/* Children with connector line */}
        {childNodes.length > 0 && (
          <div className="flex">
            <div className="ml-6 mr-3 flex flex-col">
              <div className="flex-1 my-[22px] w-px bg-gray-200" />
            </div>

            <div className="flex-1 space-y-1.5">
              {childNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-200"
                >
                  <span className="text-sm text-gray-700">{node.name}</span>
                  <RelationBadge relation={node.relation} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
