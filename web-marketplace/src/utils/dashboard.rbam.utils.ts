import { regen } from '@regen-network/api';

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

type CreditSendActionParams = {
  /** the id of the role that includes an authorization to manage credits */
  roleId: number;
  /** the id of the authorization that has permission to manage credits */
  authorizationId: number;
  /** the address sending credits (DAO address) */
  sender: string;
  /** the recipient address */
  recipient: string;
  /** the batch denom */
  batchDenom: string;
  /** tradable amount to send */
  tradableAmount: string;
  /** retired amount (if retiring on send) */
  retiredAmount: string;
  /** retirement jurisdiction (if retiring on send) */
  retirementJurisdiction?: string;
  /** retirement reason (if retiring on send) */
  retirementReason?: string;
};

export const creditSendAction = ({
  roleId,
  authorizationId,
  sender,
  recipient,
  batchDenom,
  tradableAmount,
  retiredAmount,
  retirementJurisdiction,
  retirementReason,
}: CreditSendActionParams) => {
  const protoBytes = regen.ecocredit.v1.MsgSend.encode({
    sender,
    recipient,
    credits: [
      {
        batchDenom,
        tradableAmount,
        retiredAmount,
        retirementJurisdiction: retirementJurisdiction || '',
        retirementReason: retirementReason || '',
      },
    ],
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: regen.ecocredit.v1.MsgSend.typeUrl,
    value: protoBytes,
  });
};

type CreditRetireActionParams = {
  /** the id of the role that includes an authorization to manage credits */
  roleId: number;
  /** the id of the authorization that has permission to manage credits */
  authorizationId: number;
  /** the owner address (DAO address) */
  owner: string;
  /** the batch denom */
  batchDenom: string;
  /** amount to retire */
  amount: string;
  /** retirement jurisdiction */
  jurisdiction: string;
  /** retirement reason/note */
  reason?: string;
};

export const creditRetireAction = ({
  roleId,
  authorizationId,
  owner,
  batchDenom,
  amount,
  jurisdiction,
  reason,
}: CreditRetireActionParams) => {
  const protoBytes = regen.ecocredit.v1.MsgRetire.encode({
    owner,
    credits: [
      {
        batchDenom,
        amount,
      },
    ],
    jurisdiction,
    reason: reason || '',
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: regen.ecocredit.v1.MsgRetire.typeUrl,
    value: protoBytes,
  });
};

type BasketPutActionParams = {
  /** the id of the role that includes an authorization to manage credits */
  roleId: number;
  /** the id of the authorization that has permission to manage credits */
  authorizationId: number;
  /** the owner address (DAO address) */
  owner: string;
  /** the basket denom */
  basketDenom: string;
  /** the batch denom */
  batchDenom: string;
  /** amount to put in basket */
  amount: string;
};

export const basketPutAction = ({
  roleId,
  authorizationId,
  owner,
  basketDenom,
  batchDenom,
  amount,
}: BasketPutActionParams) => {
  const protoBytes = regen.ecocredit.basket.v1.MsgPut.encode({
    owner,
    basketDenom,
    credits: [
      {
        batchDenom,
        amount,
      },
    ],
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: regen.ecocredit.basket.v1.MsgPut.typeUrl,
    value: protoBytes,
  });
};

type BasketTakeActionParams = {
  /** the id of the role that includes an authorization to manage credits */
  roleId: number;
  /** the id of the authorization that has permission to manage credits */
  authorizationId: number;
  /** the owner address (DAO address) */
  owner: string;
  /** the basket denom */
  basketDenom: string;
  /** amount to take from basket */
  amount: string;
  /** whether to retire credits on take */
  retireOnTake: boolean;
  /** retirement jurisdiction (if retiring on take) */
  retirementJurisdiction?: string;
  /** retirement reason (if retiring on take) */
  retirementReason?: string;
};

export const basketTakeAction = ({
  roleId,
  authorizationId,
  owner,
  basketDenom,
  amount,
  retireOnTake,
  retirementJurisdiction,
  retirementReason,
}: BasketTakeActionParams) => {
  const protoBytes = regen.ecocredit.basket.v1.MsgTake.encode({
    owner,
    basketDenom,
    amount,
    retireOnTake,
    retirementJurisdiction: retirementJurisdiction || '',
    retirementReason: retirementReason || '',
    retirementLocation: '', // deprecated field
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: regen.ecocredit.basket.v1.MsgTake.typeUrl,
    value: protoBytes,
  });
};

type SellOrderActionParams = {
  /** the id of the role that includes an authorization to manage sell orders */
  roleId: number;
  /** the id of the authorization that has permission to manage sell orders */
  authorizationId: number;
  /** the seller address (DAO address) */
  seller: string;
  /** the batch denom */
  batchDenom: string;
  /** quantity to sell */
  quantity: string;
  /** ask price denom */
  askDenom: string;
  /** ask price amount */
  askAmount: string;
  /** whether to disable auto-retire */
  disableAutoRetire: boolean;
};

export const sellOrderAction = ({
  roleId,
  authorizationId,
  seller,
  batchDenom,
  quantity,
  askDenom,
  askAmount,
  disableAutoRetire,
}: SellOrderActionParams) => {
  const protoBytes = regen.ecocredit.marketplace.v1.MsgSell.encode({
    seller,
    orders: [
      {
        batchDenom,
        quantity,
        askPrice: {
          denom: askDenom,
          amount: askAmount,
        },
        disableAutoRetire,
      },
    ],
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: regen.ecocredit.marketplace.v1.MsgSell.typeUrl,
    value: protoBytes,
  });
};

type CancelSellOrderActionParams = {
  /** the id of the role that includes an authorization to manage sell orders */
  roleId: number;
  /** the id of the authorization that has permission to manage sell orders */
  authorizationId: number;
  /** the seller address (DAO address) */
  seller: string;
  /** the sell order id to cancel */
  sellOrderId: bigint;
};

export const cancelSellOrderAction = ({
  roleId,
  authorizationId,
  seller,
  sellOrderId,
}: CancelSellOrderActionParams) => {
  const protoBytes = regen.ecocredit.marketplace.v1.MsgCancelSellOrder.encode({
    seller,
    sellOrderId,
  }).finish();

  return getStargateAction({
    authorizationId,
    roleId,
    typeUrl: regen.ecocredit.marketplace.v1.MsgCancelSellOrder.typeUrl,
    value: protoBytes,
  });
};
