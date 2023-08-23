import { MsgSend as MsgSendCosmos } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/tx';
import { MsgUpdateClient } from '@regen-network/api/lib/generated/ibc/core/client/v1/tx';
import {
  MsgCreate,
  MsgPut,
  MsgTake,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import {
  MsgBuyDirect,
  MsgCancelSellOrder,
  MsgSell,
  MsgUpdateSellOrders,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
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
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import {
  MsgCancel as MsgCancelAlpha,
  MsgCreateBatch as MsgCreateBatchAlpha,
  MsgCreateClass as MsgCreateClassAlpha,
  MsgRetire as MsgRetireAlpha,
  MsgSend as MsgSendAlpha,
  MsgUpdateClassAdmin as MsgUpdateClassAdminAlpha,
  MsgUpdateClassIssuers as MsgUpdateClassIssuersAlpha,
  MsgUpdateClassMetadata as MsgUpdateClassMetadataAlpha,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';

export const messageActionEquals = 'message.action=';

/* An allowlist of event and/or message types we query for in Activity table */
export const ECOCREDIT_MESSAGE_TYPES = {
  CANCEL: {
    message: `/${MsgCancel.$type}`,
    readable: 'cancel',
  },
  CREATE_BATCH: {
    message: `/${MsgCreateBatch.$type}`,
    readable: 'create batch',
  },
  CREATE_CLASS: {
    message: `/${MsgCreateClass.$type}`,
    readable: 'create class',
  },
  RETIRE: {
    message: `/${MsgRetire.$type}`,
    readable: 'retire',
  },
  SEND: {
    message: `/${MsgSend.$type}`,
    readable: 'send',
  },
  SEND_COSMOS: {
    message: `/${MsgSendCosmos.$type}`,
    readable: 'send',
  },
  UPDATE_CLASS_ADMIN: {
    message: `/${MsgUpdateClassAdmin.$type}`,
    readable: 'update class admin',
  },
  UPDATE_CLASS_ISSUERS: {
    message: `/${MsgUpdateClassIssuers.$type}`,
    readable: 'update class issuers',
  },
  UPDATE_CLASS_META: {
    message: `/${MsgUpdateClassMetadata.$type}`,
    readable: 'update class metadata',
  },
  CANCEL_ALPHA: {
    message: `/${MsgCancelAlpha.$type}`,
    readable: 'cancel',
  },
  CREATE_BATCH_ALPHA: {
    message: `/${MsgCreateBatchAlpha.$type}`,
    readable: 'create batch',
  },
  CREATE_CLASS_ALPHA: {
    message: `/${MsgCreateClassAlpha.$type}`,
    readable: 'create class',
  },
  RETIRE_ALPHA: {
    message: `/${MsgRetireAlpha.$type}`,
    readable: 'retire',
  },
  SEND_ALPHA: {
    message: `/${MsgSendAlpha.$type}`,
    readable: 'send',
  },
  UPDATE_CLASS_ADMIN_ALPHA: {
    message: `/${MsgUpdateClassAdminAlpha.$type}`,
    readable: 'update class admin',
  },
  UPDATE_CLASS_ISSUERS_ALPHA: {
    message: `/${MsgUpdateClassIssuersAlpha.$type}`,
    readable: 'update class issuers',
  },
  UPDATE_CLASS_META_ALPHA: {
    message: `/${MsgUpdateClassMetadataAlpha.$type}`,
    readable: 'update class metadata',
  },
  UPDATE_CLIENT: {
    message: `/${MsgUpdateClient.$type}`,
    readable: 'update client',
  },
  CREATE_BASKET: {
    message: `/${MsgCreate.$type}`,
    readable: 'create basket',
  },
  PUT_IN_BASKET: {
    message: `/${MsgPut.$type}`,
    readable: 'put in basket',
  },
  TAKE_FROM_BASKET: {
    message: `/${MsgTake.$type}`,
    readable: 'take from basket',
  },
  CREATE_PROJECT: {
    message: `/${MsgCreateProject.$type}`,
    readable: 'create project',
  },
  BUY_DIRECT: {
    message: `/${MsgBuyDirect.$type}`,
    readable: 'buy sell order',
  },
  ISSUE_SELL_ORDER: {
    message: `/${MsgSell.$type}`,
    readable: 'issue sell order',
  },
  CANCEL_SELL_ORDER: {
    message: `/${MsgCancelSellOrder.$type}`,
    readable: 'cancel sell order',
  },
  UPDATE_SELL_ORDER: {
    message: `/${MsgUpdateSellOrders.$type}`,
    readable: 'update sell order',
  },
  BRIDGE: {
    message: `/${MsgBridge.$type}`,
    readable: 'bridge',
  },
  BRIDGE_RECEIVE: {
    message: `/${MsgBridgeReceive.$type}`,
    readable: 'bridge receive',
  },
  UPDATE_PROJECT_METADATA: {
    message: `/${MsgUpdateProjectMetadata.$type}`,
    readable: 'update project metadata',
  },
  UPDATE_PROJECT_ADMIN: {
    message: `/${MsgUpdateProjectAdmin.$type}`,
    readable: 'update project admin',
  },
};
