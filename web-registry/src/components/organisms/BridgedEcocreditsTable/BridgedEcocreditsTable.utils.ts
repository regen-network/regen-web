import { TxBody } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/tx';

import { TxMessages } from './BridgedEcocreditsTable.types';

export const hasTxBody = (txBody: TxBody): txBody is TxBody => {
  return !!txBody;
};

export const hasMessages = (
  txMessages: Partial<TxMessages>,
): txMessages is TxMessages => {
  return !!txMessages.messages;
};
