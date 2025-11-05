// Hardcoded organization/project roles and authorizations IDs
// to avoid querying the RBAM contract for them everytime

import { msg } from '@lingui/macro';

export const orgRoles = {
  owner: {
    roleId: 1,
    authorizations: {
      can_manage_members: 2,
      can_create_projects: 3,
      can_manage_credit_issuance: 4,
      can_manage_credits: 5,
      can_manage_sell_orders: 6,
      can_manage_credit_classes: 7,
      can_edit_organization: 8,
    },
  },
  admin: {
    roleId: 9,
    authorizations: {
      can_manage_members_except_owner: 10,
      can_create_projects: 11,
      can_manage_credit_issuance: 12,
      can_manage_credits: 13,
      can_manage_sell_orders: 14,
      can_manage_credit_classes: 15,
      can_edit_organization: 16,
    },
  },
  editor: {
    roleId: 17,
    authorizations: {
      can_update_credit_classes_metadata: 18,
      can_edit_organization: 19,
    },
  },
  viewer: { roleId: 20, authorizations: {} },
} as const;

export const projectRoles = {
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
} as const;

export const MISSING_REQUIRED_PARAMS = msg`missing required parameters`;
export const MEMBER_NOT_FOUND = msg`member not found`;
