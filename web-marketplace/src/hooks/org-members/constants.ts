// Hardcoded organization/project roles and authorizations IDs
// to avoid querying the RBAM contract for them everytime

import { msg } from '@lingui/core/macro';

type OrgRole = {
  roleId: number;
  authorizations: {
    can_manage_members?: number;
    can_create_projects?: number;
    can_manage_projects?: number;
    can_manage_credit_issuance?: number;
    can_manage_credits?: number;
    can_manage_sell_orders?: number;
    can_manage_credit_classes?: number;
    can_edit_organization?: number;
    can_manage_members_except_owner?: number;
    can_update_credit_classes_metadata?: number;
    can_anchor_attest_data?: number;
  };
};
export const orgRoles: {
  owner: OrgRole;
  admin: OrgRole;
  editor: OrgRole;
  viewer: OrgRole;
} = {
  owner: {
    roleId: 1,
    authorizations: {
      can_manage_members: 2,
      can_create_projects: 3,
      can_manage_projects: 4,
      can_manage_credit_issuance: 5,
      can_manage_credits: 6,
      can_manage_sell_orders: 7,
      can_manage_credit_classes: 8,
      can_edit_organization: 9,
      can_anchor_attest_data: 10,
    },
  },
  admin: {
    roleId: 11,
    authorizations: {
      can_manage_members_except_owner: 12,
      can_create_projects: 13,
      can_manage_projects: 14,
      can_manage_credit_issuance: 15,
      can_manage_credits: 16,
      can_manage_sell_orders: 17,
      can_manage_credit_classes: 18,
      can_edit_organization: 19,
      can_anchor_attest_data: 20,
    },
  },
  editor: {
    roleId: 21,
    authorizations: {
      can_update_credit_classes_metadata: 22,
      can_edit_organization: 23,
      can_anchor_attest_data: 24,
    },
  },
  viewer: { roleId: 25, authorizations: {} },
};

type ProjectRole = {
  roleId: number;
  authorizations: {
    can_manage_members?: number;
    can_manage_projects?: number;
    can_manage_credit_issuance?: number;
    can_manage_credits?: number;
    can_manage_sell_orders?: number;
    can_anchor_attest_data?: number;
    can_manage_members_except_owner?: number;
  };
};

export const projectRoles: {
  owner: ProjectRole;
  admin: ProjectRole;
  editor: ProjectRole;
  author: ProjectRole;
  viewer: ProjectRole;
} = {
  owner: {
    roleId: 1,
    authorizations: {
      can_manage_members: 2,
      can_manage_projects: 3,
      can_manage_credit_issuance: 4,
      can_manage_credits: 5,
      can_manage_sell_orders: 6,
      can_anchor_attest_data: 7,
    },
  },
  admin: {
    roleId: 8,
    authorizations: {
      can_manage_members_except_owner: 9,
      can_manage_projects: 10,
      can_manage_credit_issuance: 11,
      can_manage_credits: 12,
      can_manage_sell_orders: 13,
      can_anchor_attest_data: 14,
    },
  },
  editor: {
    roleId: 15,
    authorizations: {
      can_manage_projects: 16,
      can_anchor_attest_data: 17,
    },
  },
  author: {
    roleId: 18,
    authorizations: {
      can_anchor_attest_data: 19,
    },
  },
  viewer: {
    roleId: 20,
    authorizations: {},
  },
};

export const MISSING_REQUIRED_PARAMS = msg`missing required parameters`;
export const MEMBER_NOT_FOUND = msg`member not found`;
export const MEMBER_REMOVED = msg`This user has been removed from your organization`;
