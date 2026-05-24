export type ActionKey = 'onboard' | 'edit' | 'offboard'

export type QuickCheckAction =
  | 'onboard'
  | 'edit'
  | 'offboard'
  | 'approve_onboard'
  | 'approve_edit'
  | 'approve_offboard'

export interface ActionPermission {
  canPerform: boolean
  performScopes: string[]
  canApprove: boolean
  approveScopes: string[]
}

export interface SitePermissions {
  siteId: string
  onboard: ActionPermission
  edit: ActionPermission
  offboard: ActionPermission
}

export type TreeRelation =
  | 'parent'
  | 'self'
  | 'child-in-reach'
  | 'child-approve-only'
  | 'child-out-of-scope'

export interface TreeNode {
  id: string
  name: string
  relation: TreeRelation
}

export interface Site {
  id: string
  name: string
  isPrimary: boolean
}

export interface SiteData {
  site: Site
  permissions: SitePermissions
  tree: TreeNode[]
}
