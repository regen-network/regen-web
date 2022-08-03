import {
  MsgCreate,
  MsgPut,
  MsgTake,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import {
  MsgCancel,
  MsgCreateBatch,
  MsgCreateClass,
  MsgCreateProject,
  MsgRetire,
  MsgSend,
  MsgUpdateClassAdmin,
  MsgUpdateClassIssuers,
  MsgUpdateClassMetadata,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

export const messageActionEquals = 'message.action=';

/* An allowlist of event and/or message types we query for in Activity table */
export const ECOCREDIT_MESSAGE_TYPES = {
  SEND: {
    message: `/${MsgSend.$type}`,
    readable: 'send',
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
  CANCEL: {
    message: `/${MsgCancel.$type}`,
    readable: 'cancel',
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
};
