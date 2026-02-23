import { MsgGrant } from '@regen-network/api/cosmos/authz/v1beta1/tx';
import { MsgAttest } from '@regen-network/api/regen/data/v2/tx';
import {
  MsgPut,
  MsgTake,
} from '@regen-network/api/regen/ecocredit/basket/v1/tx';
import {
  MsgCancelSellOrder,
  MsgSell,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import {
  MsgCreateProject,
  MsgRetire,
  MsgSend,
  MsgUpdateProjectAdmin,
  MsgUpdateProjectMetadata,
} from '@regen-network/api/regen/ecocredit/v1/tx';

import { Assignment } from 'generated/graphql';

import { orgRoles, projectRoles } from 'hooks/org-members/constants';

import { getMsgExecuteContract, getStargateAction } from './cosmwasm';

/**
 * Helper to wrap RBAM actions in a MsgExecuteContract for signing.
 * Used when executing portfolio operations through RBAM in organization dashboard.
 */
export const wrapRbamActions = ({
  walletAddress,
  rbamAddress,
  actions,
}: {
  walletAddress: string;
  rbamAddress: string;
  actions: Array<ReturnType<typeof getStargateAction>>;
}) => {
  const executeActionsMsg = {
    execute_actions: {
      actions,
    },
  };

  return getMsgExecuteContract({
    walletAddress,
    contract: rbamAddress,
    executeActionsMsg,
  });
};

type AuthorizationId = {
  /** the id of the authorization that has permission */
  authorizationId: number;
};

type AttestActionParams = AuthorizationId & MsgAttest;

export const attestAction = ({
  authorizationId,
  ...msg
}: AttestActionParams) => {
  const protoBytes = MsgAttest.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgAttest.typeUrl,
    value: protoBytes,
  });
};

type CreateProjectActionParams = AuthorizationId & MsgCreateProject;

export const createProjectAction = ({
  authorizationId,
  ...msg
}: CreateProjectActionParams) => {
  const protoBytes = MsgCreateProject.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgCreateProject.typeUrl,
    value: protoBytes,
  });
};

type UpdateProjectAdminActionParams = AuthorizationId & MsgUpdateProjectAdmin;

export const updateProjectAdminAction = ({
  authorizationId,
  ...msg
}: UpdateProjectAdminActionParams) => {
  const protoBytes = MsgUpdateProjectAdmin.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgUpdateProjectAdmin.typeUrl,
    value: protoBytes,
  });
};

type UpdateProjectMetadataActionParams = AuthorizationId &
  MsgUpdateProjectMetadata;

export const updateProjectMetadataAction = ({
  authorizationId,
  ...msg
}: UpdateProjectMetadataActionParams) => {
  const protoBytes = MsgUpdateProjectMetadata.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgUpdateProjectMetadata.typeUrl,
    value: protoBytes,
  });
};

type CreditSendActionParams = AuthorizationId & MsgSend;

export const creditSendAction = ({
  authorizationId,
  ...msg
}: CreditSendActionParams) => {
  const protoBytes = MsgSend.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgSend.typeUrl,
    value: protoBytes,
  });
};

type CreditRetireActionParams = AuthorizationId & MsgRetire;

export const creditRetireAction = ({
  authorizationId,
  ...msgParams
}: CreditRetireActionParams) => {
  const protoBytes = MsgRetire.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgRetire.typeUrl,
    value: protoBytes,
  });
};

type BasketPutActionParams = AuthorizationId & MsgPut;

export const basketPutAction = ({
  authorizationId,
  ...msgParams
}: BasketPutActionParams) => {
  const protoBytes = MsgPut.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgPut.typeUrl,
    value: protoBytes,
  });
};

type BasketTakeActionParams = AuthorizationId & MsgTake;

export const basketTakeAction = ({
  authorizationId,
  ...msgParams
}: BasketTakeActionParams) => {
  const protoBytes = MsgTake.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgTake.typeUrl,
    value: protoBytes,
  });
};

type SellOrderActionParams = AuthorizationId & MsgSell;

export const sellOrderAction = ({
  authorizationId,
  ...msg
}: SellOrderActionParams) => {
  const protoBytes = MsgSell.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgSell.typeUrl,
    value: protoBytes,
  });
};

type CancelSellOrderActionParams = AuthorizationId & MsgCancelSellOrder;

export const cancelSellOrderAction = ({
  authorizationId,
  ...msgParams
}: CancelSellOrderActionParams) => {
  const protoBytes = MsgCancelSellOrder.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgCancelSellOrder.typeUrl,
    value: protoBytes,
  });
};

type AuthzGrantActionParams = AuthorizationId & MsgGrant;

export const authzGrantAction = ({
  authorizationId,
  ...msgParams
}: AuthzGrantActionParams) => {
  const protoBytes = MsgGrant.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    typeUrl: MsgGrant.typeUrl,
    value: protoBytes,
  });
};

type GetAuthorizationIdParams = {
  type: 'organization' | 'project';
  currentUserRole?: string;
  authorizationName?: string;
};

export function getAuthorizationId({
  type,
  currentUserRole,
  authorizationName,
}: GetAuthorizationIdParams) {
  const roles = type === 'organization' ? orgRoles : projectRoles;

  const normalizedRole = currentUserRole?.toLowerCase() as keyof typeof roles;
  const roleConfig = normalizedRole ? roles[normalizedRole] : undefined;

  const authorizationId =
    roleConfig && authorizationName
      ? roleConfig.authorizations[
          authorizationName as keyof typeof roleConfig.authorizations
        ]
      : undefined;

  return { authorizationId };
}

type GetAccountAssignmentParams = {
  accountId?: string;
  assignments?: Array<Pick<
    Assignment,
    'accountId' | 'roleName' | 'visible' | 'onChainRoleId'
  > | null>;
};

export function getAccountAssignment({
  accountId,
  assignments,
}: GetAccountAssignmentParams) {
  return assignments?.find(assignment => assignment?.accountId === accountId);
}
