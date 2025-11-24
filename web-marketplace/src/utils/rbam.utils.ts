import { regen } from '@regen-network/api';
import {
  MsgPut,
  MsgTake,
} from '@regen-network/api/regen/ecocredit/basket/v1/tx';
import {
  MsgCancelSellOrder,
  MsgSell,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import { MsgRetire, MsgSend } from '@regen-network/api/regen/ecocredit/v1/tx';

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

type RoleAuthorizationIds = {
  /** the id of the role that includes an authorization */
  roleId: number;
  /** the id of the authorization that has permission */
  authorizationId: number;
};

type CreditSendActionParams = RoleAuthorizationIds & MsgSend;

export const creditSendAction = ({
  roleId,
  authorizationId,
  ...msg
}: CreditSendActionParams) => {
  const protoBytes = MsgSend.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgSend.typeUrl,
    value: protoBytes,
  });
};

type CreditRetireActionParams = RoleAuthorizationIds & MsgRetire;

export const creditRetireAction = ({
  roleId,
  authorizationId,
  ...msgParams
}: CreditRetireActionParams) => {
  const protoBytes = MsgRetire.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgRetire.typeUrl,
    value: protoBytes,
  });
};

type BasketPutActionParams = RoleAuthorizationIds & MsgPut;

export const basketPutAction = ({
  roleId,
  authorizationId,
  ...msgParams
}: BasketPutActionParams) => {
  const protoBytes = MsgPut.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgPut.typeUrl,
    value: protoBytes,
  });
};

type BasketTakeActionParams = RoleAuthorizationIds & MsgTake;

export const basketTakeAction = ({
  roleId,
  authorizationId,
  ...msgParams
}: BasketTakeActionParams) => {
  const protoBytes = MsgTake.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgTake.typeUrl,
    value: protoBytes,
  });
};

type SellOrderActionParams = RoleAuthorizationIds & MsgSell;

export const sellOrderAction = ({
  roleId,
  authorizationId,
  ...msg
}: SellOrderActionParams) => {
  const protoBytes = MsgSell.encode(msg).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgSell.typeUrl,
    value: protoBytes,
  });
};

type CancelSellOrderActionParams = RoleAuthorizationIds & MsgCancelSellOrder;

export const cancelSellOrderAction = ({
  roleId,
  authorizationId,
  ...msgParams
}: CancelSellOrderActionParams) => {
  const protoBytes = MsgCancelSellOrder.encode(msgParams).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: MsgCancelSellOrder.typeUrl,
    value: protoBytes,
  });
};

type GetRoleAuthorizationIdsParams = {
  type: 'organization' | 'project';
  currentUserRole?: string;
  authorizationName?: string;
};

export function getRoleAuthorizationIds({
  type,
  currentUserRole,
  authorizationName,
}: GetRoleAuthorizationIdsParams) {
  const roles = type === 'organization' ? orgRoles : projectRoles;

  const normalizedRole = currentUserRole?.toLowerCase() as keyof typeof roles;
  const roleConfig = normalizedRole ? roles[normalizedRole] : undefined;

  const roleId = roleConfig?.roleId;
  const authorizationId =
    roleConfig && authorizationName
      ? roleConfig.authorizations[
          authorizationName as keyof typeof roleConfig.authorizations
        ]
      : undefined;

  return { roleId, authorizationId, roleConfig };
}
