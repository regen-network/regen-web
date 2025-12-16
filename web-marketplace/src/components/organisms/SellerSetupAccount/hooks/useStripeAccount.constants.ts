import {
  MsgCancelSellOrder,
  MsgUpdateSellOrders,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import { MsgSend } from '@regen-network/api/regen/ecocredit/v1/tx';

export const grantee = process.env.NEXT_PUBLIC_REGEN_WORKER_ADDRESS;
export const msgTypes = [
  MsgCancelSellOrder.typeUrl,
  MsgUpdateSellOrders.typeUrl,
  MsgSend.typeUrl,
];
