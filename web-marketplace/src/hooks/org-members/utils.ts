import {
  AllowedMsgAllowance,
  BasicAllowance,
} from '@regen-network/api/cosmos/feegrant/v1beta1/feegrant';
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
} from '@regen-network/api/cosmos/feegrant/v1beta1/tx';
import { Any } from '@regen-network/api/google/protobuf/any';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import {
  adminMembersAuthorization,
  encodeJsonToBase64,
} from 'legacy-pages/CreateOrganization/hooks/useCreateDao/useCreateDao.utils';
import { getStargateAction } from 'utils/cosmwasm';

import {
  DaoByAddressWithAssignmentsQuery,
  OrganizationProjectsByDaoAddressQuery,
} from 'generated/graphql';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import {
  BaseMemberRole,
  ProjectRole,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

import { orgRoles, projectRoles } from './constants';
import { Project } from '@regen-network/api/regen/ecocredit/v1/state';

type UpdateAuthorizationActionParams = {
  /** the address of the dao-rbam contract */
  daoRbamAddress: string;
  /** the address of the cw4_group contract */
  cw4GroupAddress: string;
  /** the id of the role that includes an authorization to update members */
  roleId: number;
  /** the id of the authorization that has permission to update members */
  authorizationId: number;
  /** the address of the new owner to be assigned during the update */
  newOwnerAddress: string;
  /** the id of the 'can_manage_members_except_owner' authorization to update */
  authorizationIdToUpdate: number;
};

export const updateAuthorizationAction = ({
  daoRbamAddress,
  authorizationId,
  roleId,
  cw4GroupAddress,
  newOwnerAddress,
  authorizationIdToUpdate,
}: UpdateAuthorizationActionParams) => {
  return {
    authorization_id: authorizationId,
    role_id: roleId,
    msg: {
      wasm: {
        execute: {
          funds: [],
          contract_addr: daoRbamAddress,
          msg: encodeJsonToBase64({
            update_authorization: {
              authorization_id: authorizationIdToUpdate,
              filter: {
                set: adminMembersAuthorization(
                  newOwnerAddress,
                  cw4GroupAddress,
                  daoRbamAddress,
                ).filter,
              },
            },
          }),
        },
      },
    },
  };
};

type AssignNewOrgOwnerActionsParams = Pick<
  AssignNewOwnerActionsParams,
  | 'daoRbamAddress'
  | 'cw4GroupAddress'
  | 'authorizationId'
  | 'roleId'
  | 'currentOwnerAddress'
  | 'newOwnerAddress'
  | 'newOwnerOldRoleId'
>;

export const assignNewOrgOwnerActions = ({
  daoRbamAddress,
  authorizationId,
  roleId,
  cw4GroupAddress,
  currentOwnerAddress,
  newOwnerAddress,
  newOwnerOldRoleId,
}: AssignNewOrgOwnerActionsParams) => {
  const ownerRoleId = orgRoles.owner.roleId;
  const adminRoleId = orgRoles.admin.roleId;
  return assignNewOwnerActions({
    daoRbamAddress,
    authorizationId,
    roleId,
    cw4GroupAddress,
    currentOwnerAddress,
    newOwnerAddress,
    newOwnerOldRoleId,
    ownerRoleId,
    adminRoleId,
  });
};

type AssignNewOwnerActionsParams = {
  /** the address of the dao-rbam contract */
  daoRbamAddress: string;
  /** the address of the cw4_group contract */
  cw4GroupAddress: string;
  /** the id of the role that includes an authorization to update members */
  roleId: number;
  /** the id of the authorization that has permission to update members */
  authorizationId: number;
  /** the address of the current owner */
  currentOwnerAddress: string;
  /** the address of the new owner */
  newOwnerAddress: string;
  /** the old role id of the new owner, to be able to revoke it */
  newOwnerOldRoleId: number;
  /** the role id of the owner role */
  ownerRoleId: number;
  /** the role id of the admin role */
  adminRoleId: number;
};
const assignNewOwnerActions = ({
  daoRbamAddress,
  authorizationId,
  roleId,
  cw4GroupAddress,
  currentOwnerAddress,
  newOwnerAddress,
  newOwnerOldRoleId,
  ownerRoleId,
  adminRoleId,
}: AssignNewOwnerActionsParams) => {
  return [
    updateMembersAction({
      authorizationId,
      roleId,
      cw4GroupAddress,
      updateMembers: {
        add: [
          {
            addr: newOwnerAddress,
            weight: 1,
          },
        ],
        remove: [],
      },
    }),
    assignAction({
      daoRbamAddress,
      authorizationId,
      roleId,
      assignments: [
        {
          addr: newOwnerAddress,
          role_id: ownerRoleId,
        },
        // Downgrade the current owner as admin
        {
          addr: currentOwnerAddress,
          role_id: adminRoleId,
        },
      ],
    }),
    revokeAction({
      daoRbamAddress,
      authorizationId,
      roleId,
      assignments: [
        {
          addr: newOwnerAddress,
          role_id: newOwnerOldRoleId,
        },
        {
          addr: currentOwnerAddress,
          role_id: ownerRoleId,
        },
      ],
    }),
  ];
};

type AddMemberActions = {
  /** the address of the dao-rbam contract */
  daoRbamAddress: string;
  /** the address of the cw4_group contract */
  cw4GroupAddress: string;
  /** the id of the role that includes an authorization to add members */
  roleId: number;
  /** the id of the authorization that has permission to add members */
  authorizationId: number;
  /** the address of the member to add */
  memberAddress: string;
  /** the id of the role to assign to the added member */
  roleIdToAdd: number;
  /** whether to grant a feegrant allowance to the member or not */
  withFeegrant?: boolean;
  /** the address of the dao, only useful if withFeegrant is true */
  daoAddress?: string;
};

export const addMemberActions = ({
  daoRbamAddress,
  cw4GroupAddress,
  authorizationId,
  roleId,
  memberAddress,
  roleIdToAdd,
  withFeegrant,
  daoAddress,
}: AddMemberActions) => [
  updateMembersAction({
    authorizationId,
    roleId,
    cw4GroupAddress,
    updateMembers: {
      add: [
        {
          addr: memberAddress,
          weight: 1,
        },
      ],
      remove: [],
    },
  }),
  assignAction({
    daoRbamAddress,
    authorizationId,
    roleId,
    assignments: [
      {
        addr: memberAddress,
        role_id: roleIdToAdd,
      },
    ],
  }),
  ...(withFeegrant && daoAddress
    ? [
        feegrantGrantAllowanceAction({
          daoAddress,
          authorizationId,
          roleId,
          memberAddress,
        }),
      ]
    : []),
];

type FeegrantActionParams = {
  /** the address of the dao */
  daoAddress: string;
  /** the id of the role that includes an authorization to grant feegrant allowance */
  roleId: number;
  /** the id of the authorization that has permission to grant feegrant allowance */
  authorizationId: number;
  /** the address of the member to add */
  memberAddress: string;
};

export const feegrantGrantAllowanceAction = ({
  daoAddress,
  authorizationId,
  roleId,
  memberAddress,
}: FeegrantActionParams) => {
  // First create a BasicAllowance with no spend limit and no expiration
  const basicAllowance = BasicAllowance.fromPartial({});

  // Then wrap it inside AllowedMsgAllowance
  const allowedMsgAllowance = AllowedMsgAllowance.fromPartial({
    allowance: Any.fromPartial({
      typeUrl: BasicAllowance.typeUrl,
      value: BasicAllowance.encode(basicAllowance).finish(),
    }),
    allowedMessages: [MsgExecuteContract.typeUrl],
  });

  const protoBytes = MsgGrantAllowance.encode({
    granter: daoAddress,
    grantee: memberAddress,
    allowance: Any.fromPartial({
      typeUrl: AllowedMsgAllowance.typeUrl,
      value: AllowedMsgAllowance.encode(allowedMsgAllowance).finish(),
    }),
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgGrantAllowance.typeUrl,
    value: protoBytes,
  });
};

export const feegrantRevokeAllowanceAction = ({
  daoAddress,
  authorizationId,
  roleId,
  memberAddress,
}: FeegrantActionParams) => {
  const protoBytes = MsgRevokeAllowance.encode({
    granter: daoAddress,
    grantee: memberAddress,
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgRevokeAllowance.typeUrl,
    value: protoBytes,
  });
};

type UpdateMemberRoleActionsParams = {
  /** the address of the dao-rbam contract */
  daoRbamAddress: string;
  /** the id of the role that includes an authorization to update roles */
  roleId: number;
  /** the id of the authorization that has permission to update roles */
  authorizationId: number;
  /** the address of the member whose role is being updated */
  memberAddress: string;
  /** the new role id to assign to the member */
  newRoleId: number;
  /** the old role id to revoke from the member */
  oldRoleId: number;
};

export const updateMemberRoleActions = ({
  daoRbamAddress,
  authorizationId,
  roleId,
  memberAddress,
  newRoleId,
  oldRoleId,
}: UpdateMemberRoleActionsParams) => [
  assignAction({
    daoRbamAddress,
    authorizationId,
    roleId,
    assignments: [
      {
        addr: memberAddress,
        role_id: newRoleId,
      },
    ],
  }),
  revokeAction({
    daoRbamAddress,
    authorizationId,
    roleId,
    assignments: [
      {
        addr: memberAddress,
        role_id: oldRoleId,
      },
    ],
  }),
];

type RemoveMemberActionsParams = {
  /** the address of the dao-rbam contract */
  daoRbamAddress: string;
  /** the address of the cw4_group contract */
  cw4GroupAddress: string;
  /** the id of the role that includes an authorization to remove members */
  roleId: number;
  /** the id of the authorization that has permission to remove members */
  authorizationId: number;
  /** the address of the member to remove */
  memberAddress: string;
  /** the role id of the member to remove, to be able to revoke it */
  memberRoleId: number;
  /** whether to revoke a feegrant allowance from the member or not */
  withFeegrant?: boolean;
  /** the address of the dao, only useful if withFeegrant is true */
  daoAddress?: string;
};
export const removeMemberActions = ({
  daoAddress,
  daoRbamAddress,
  cw4GroupAddress,
  authorizationId,
  roleId,
  memberAddress,
  memberRoleId,
  withFeegrant,
}: RemoveMemberActionsParams) => [
  updateMembersAction({
    authorizationId,
    roleId,
    cw4GroupAddress,
    updateMembers: {
      add: [],
      remove: [memberAddress],
    },
  }),
  revokeAction({
    daoRbamAddress,
    authorizationId,
    roleId,
    assignments: [
      {
        addr: memberAddress,
        role_id: memberRoleId,
      },
    ],
  }),
  ...(withFeegrant && daoAddress
    ? [
        feegrantRevokeAllowanceAction({
          daoAddress,
          authorizationId,
          roleId,
          memberAddress,
        }),
      ]
    : []),
];

type UpdateMembersActionParams = {
  /** the address of the cw4_group contract */
  cw4GroupAddress: string;
  /** the id of the role that includes an authorization to update members */
  roleId: number;
  /** the id of the authorization that has permission to update members */
  authorizationId: number;
  /** the id of the role to assign to the added member */
  updateMembers: {
    add: {
      addr: string;
      weight: number;
    }[];
    remove: string[];
  };
};

const updateMembersAction = ({
  cw4GroupAddress,
  authorizationId,
  roleId,
  updateMembers,
}: UpdateMembersActionParams) => ({
  authorization_id: authorizationId,
  role_id: roleId,
  msg: {
    wasm: {
      execute: {
        contract_addr: cw4GroupAddress,
        msg: encodeJsonToBase64({
          update_members: updateMembers,
        }),
        funds: [],
      },
    },
  },
});

type Assignment = {
  addr: string;
  role_id: number;
};

type UpdateAssignmentsActionParams = {
  /** the address of the dao-rbam contract */
  daoRbamAddress: string;
  /** the id of the role that includes an authorization to assign roles */
  roleId: number;
  /** the id of the authorization that has permission to assign roles */
  authorizationId: number;
  /** the list of assignments to assign/revoke */
  assignments: Assignment[];
};

const assignAction = ({
  daoRbamAddress,
  authorizationId,
  roleId,
  assignments,
}: UpdateAssignmentsActionParams) => ({
  authorization_id: authorizationId,
  role_id: roleId,
  msg: {
    wasm: {
      execute: {
        contract_addr: daoRbamAddress,
        msg: encodeJsonToBase64({
          assign: {
            assign: assignments,
          },
        }),
        funds: [],
      },
    },
  },
});

const revokeAction = ({
  daoRbamAddress,
  authorizationId,
  roleId,
  assignments,
}: UpdateAssignmentsActionParams) => ({
  authorization_id: authorizationId,
  role_id: roleId,
  msg: {
    wasm: {
      execute: {
        contract_addr: daoRbamAddress,
        msg: encodeJsonToBase64({
          revoke: {
            revoke: assignments,
          },
        }),
        funds: [],
      },
    },
  },
});

type FindNewAssignmentParams = {
  data?: DaoByAddressWithAssignmentsQuery | null;
  daoAddress?: string;
  accountId: string;
  roleName: string;
};

export function findAssignment({
  data,
  daoAddress,
  accountId,
  roleName,
}: FindNewAssignmentParams) {
  if (!daoAddress) return;
  const assignments = data?.daoByAddress?.assignmentsByDaoAddress?.nodes;
  return assignments?.find(
    assig => assig?.accountId === accountId && assig?.roleName === roleName,
  );
}

type GetRoleAuthorizationIdsParams = {
  type: 'organization' | 'project';
  currentUserRole?: BaseMemberRole;
  authorizationName?: 'can_manage_members' | 'can_manage_members_except_owner';
};
export function getRoleAuthorizationIds({
  type,
  currentUserRole,
  authorizationName,
}: GetRoleAuthorizationIdsParams) {
  const roles = type === 'organization' ? orgRoles : projectRoles;

  const roleId = currentUserRole ? roles[currentUserRole].roleId : undefined;
  const authorizationId =
    currentUserRole && authorizationName
      ? roles[currentUserRole].authorizations[authorizationName]
      : undefined;
  return { roleId, authorizationId };
}

export function getNewOrgRoleId(role: BaseMemberRole) {
  return orgRoles[role]?.roleId;
}

export function getNewProjectRoleId(role: ProjectRole) {
  return projectRoles[role]?.roleId;
}

export function getAuthorizationName(currentUserRole?: string) {
  if (!currentUserRole) return;
  return currentUserRole === ROLE_OWNER
    ? 'can_manage_members'
    : 'can_manage_members_except_owner';
}

type GetProjectsCurrentUserCanManageMembers = {
  orgData?: OrganizationProjectsByDaoAddressQuery | null;
  activeAccountId?: string;
};
export function getProjectsCurrentUserCanManageMembers({
  orgData,
  activeAccountId,
}: GetProjectsCurrentUserCanManageMembers) {
  return orgData?.organizationByDaoAddress?.organizationProjectsByOrganizationId?.nodes?.filter(
    project =>
      project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress?.nodes?.some(
        assignment =>
          assignment?.accountId === activeAccountId &&
          (assignment?.roleName === ROLE_OWNER ||
            assignment?.roleName === ROLE_ADMIN),
      ),
  );
}
