/* eslint-disable lingui/no-unlocalized-strings */
import { MsgSend as MsgSendCosmos } from '@regen-network/api/cosmos/bank/v1beta1/tx';
import { MsgUpdateClient } from '@regen-network/api/ibc/core/client/v1/tx';
import {
  MsgCreate,
  MsgPut,
  MsgTake,
} from '@regen-network/api/regen/ecocredit/basket/v1/tx';
import {
  MsgBuyDirect,
  MsgCancelSellOrder,
  MsgSell,
  MsgUpdateSellOrders,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import {
  MsgBridge,
  MsgBridgeReceive,
  MsgCancel,
  MsgCreateBatch,
  MsgCreateClass,
  MsgCreateProject,
  MsgRetire,
  MsgSend,
  MsgUpdateClassAdmin,
  MsgUpdateClassIssuers,
  MsgUpdateClassMetadata,
  MsgUpdateProjectAdmin,
  MsgUpdateProjectMetadata,
} from '@regen-network/api/regen/ecocredit/v1/tx';
import {
  MsgCancel as MsgCancelAlpha,
  MsgCreateBatch as MsgCreateBatchAlpha,
  MsgCreateClass as MsgCreateClassAlpha,
  MsgRetire as MsgRetireAlpha,
  MsgSend as MsgSendAlpha,
  MsgUpdateClassAdmin as MsgUpdateClassAdminAlpha,
  MsgUpdateClassIssuers as MsgUpdateClassIssuersAlpha,
  MsgUpdateClassMetadata as MsgUpdateClassMetadataAlpha,
} from '@regen-network/api/regen/ecocredit/v1alpha1/tx';

export const messageActionEquals = 'message.action=';

/* An allowlist of event and/or message types we query for in Activity table */
export const ECOCREDIT_MESSAGE_TYPES = {
  CANCEL: {
    message: MsgCancel.typeUrl,
    readable: 'cancel',
  },
  CREATE_BATCH: {
    message: MsgCreateBatch.typeUrl,
    readable: 'create batch',
  },
  CREATE_CLASS: {
    message: MsgCreateClass.typeUrl,
    readable: 'create class',
  },
  RETIRE: {
    message: MsgRetire.typeUrl,
    readable: 'retire',
  },
  SEND: {
    message: MsgSend.typeUrl,
    readable: 'send',
  },
  SEND_COSMOS: {
    message: MsgSendCosmos.typeUrl,
    readable: 'send',
  },
  UPDATE_CLASS_ADMIN: {
    message: MsgUpdateClassAdmin.typeUrl,
    readable: 'update class admin',
  },
  UPDATE_CLASS_ISSUERS: {
    message: MsgUpdateClassIssuers.typeUrl,
    readable: 'update class issuers',
  },
  UPDATE_CLASS_META: {
    message: MsgUpdateClassMetadata.typeUrl,
    readable: 'update class metadata',
  },
  CANCEL_ALPHA: {
    message: MsgCancelAlpha.typeUrl,
    readable: 'cancel',
  },
  CREATE_BATCH_ALPHA: {
    message: MsgCreateBatchAlpha.typeUrl,
    readable: 'create batch',
  },
  CREATE_CLASS_ALPHA: {
    message: MsgCreateClassAlpha.typeUrl,
    readable: 'create class',
  },
  RETIRE_ALPHA: {
    message: MsgRetireAlpha.typeUrl,
    readable: 'retire',
  },
  SEND_ALPHA: {
    message: MsgSendAlpha.typeUrl,
    readable: 'send',
  },
  UPDATE_CLASS_ADMIN_ALPHA: {
    message: MsgUpdateClassAdminAlpha.typeUrl,
    readable: 'update class admin',
  },
  UPDATE_CLASS_ISSUERS_ALPHA: {
    message: MsgUpdateClassIssuersAlpha.typeUrl,
    readable: 'update class issuers',
  },
  UPDATE_CLASS_META_ALPHA: {
    message: MsgUpdateClassMetadataAlpha.typeUrl,
    readable: 'update class metadata',
  },
  UPDATE_CLIENT: {
    message: MsgUpdateClient.typeUrl,
    readable: 'update client',
  },
  CREATE_BASKET: {
    message: MsgCreate.typeUrl,
    readable: 'create basket',
  },
  PUT_IN_BASKET: {
    message: MsgPut.typeUrl,
    readable: 'put in basket',
  },
  TAKE_FROM_BASKET: {
    message: MsgTake.typeUrl,
    readable: 'take from basket',
  },
  CREATE_PROJECT: {
    message: MsgCreateProject.typeUrl,
    readable: 'create project',
  },
  BUY_DIRECT: {
    message: MsgBuyDirect.typeUrl,
    readable: 'buy sell order',
  },
  ISSUE_SELL_ORDER: {
    message: MsgSell.typeUrl,
    readable: 'issue sell order',
  },
  CANCEL_SELL_ORDER: {
    message: MsgCancelSellOrder.typeUrl,
    readable: 'cancel sell order',
  },
  UPDATE_SELL_ORDER: {
    message: MsgUpdateSellOrders.typeUrl,
    readable: 'update sell order',
  },
  BRIDGE: {
    message: MsgBridge.typeUrl,
    readable: 'bridge',
  },
  BRIDGE_RECEIVE: {
    message: MsgBridgeReceive.typeUrl,
    readable: 'bridge receive',
  },
  UPDATE_PROJECT_METADATA: {
    message: MsgUpdateProjectMetadata.typeUrl,
    readable: 'update project metadata',
  },
  UPDATE_PROJECT_ADMIN: {
    message: MsgUpdateProjectAdmin.typeUrl,
    readable: 'update project admin',
  },
};
