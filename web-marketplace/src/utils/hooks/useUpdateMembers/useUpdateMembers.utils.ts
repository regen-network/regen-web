import { encodeJsonToBase64 } from '../useCreateDao/useCreateDao.utils';

type AssignNewOrgOwnerActionsParams = Pick<
  AssignNewOwnerActionsParams,
  | 'rbamAddress'
  | 'cw4GroupAddress'
  | 'authorizationId'
  | 'roleId'
  | 'currentOwnerAddress'
  | 'newOwnerAddress'
  | 'newOwnerOldRoleId'
>;

export const assignNewOrgOwnerActions = ({
  rbamAddress,
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
    rbamAddress,
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
  rbamAddress: string;
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
  rbamAddress,
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
      rbamAddress,
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
      rbamAddress,
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
  rbamAddress: string;
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
};

export const addMemberActions = ({
  rbamAddress,
  cw4GroupAddress,
  authorizationId,
  roleId,
  memberAddress,
  roleIdToAdd,
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
    rbamAddress,
    authorizationId,
    roleId,
    assignments: [
      {
        addr: memberAddress,
        role_id: roleIdToAdd,
      },
    ],
  }),
];

type UpdateMemberRoleActionsParams = {
  /** the address of the dao-rbam contract */
  rbamAddress: string;
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
  rbamAddress,
  authorizationId,
  roleId,
  memberAddress,
  newRoleId,
  oldRoleId,
}: UpdateMemberRoleActionsParams) => [
  assignAction({
    rbamAddress,
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
    rbamAddress,
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
  rbamAddress: string;
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
};
export const removeMemberActions = ({
  rbamAddress,
  cw4GroupAddress,
  authorizationId,
  roleId,
  memberAddress,
  memberRoleId,
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
    rbamAddress,
    authorizationId,
    roleId,
    assignments: [
      {
        addr: memberAddress,
        role_id: memberRoleId,
      },
    ],
  }),
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
  rbamAddress: string;
  /** the id of the role that includes an authorization to assign roles */
  roleId: number;
  /** the id of the authorization that has permission to assign roles */
  authorizationId: number;
  /** the list of assignments to assign/revoke */
  assignments: Assignment[];
};

const assignAction = ({
  rbamAddress,
  authorizationId,
  roleId,
  assignments,
}: UpdateAssignmentsActionParams) => ({
  authorization_id: authorizationId,
  role_id: roleId,
  msg: {
    wasm: {
      execute: {
        contract_addr: rbamAddress,
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
  rbamAddress,
  authorizationId,
  roleId,
  assignments,
}: UpdateAssignmentsActionParams) => ({
  authorization_id: authorizationId,
  role_id: roleId,
  msg: {
    wasm: {
      execute: {
        contract_addr: rbamAddress,
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
