import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import { Tx } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/tx';
import { Any } from '@regen-network/api/lib/generated/google/protobuf/any';
import { Credits } from '@regen-network/api/lib/generated/regen/ecocredit/v1/types';

export interface TxWithResponse extends Tx {
  txResponse: TxResponse;
}

export interface TxMessages {
  txIndex: number;
  messages: Any[];
}

export interface TxCredits extends Credits {
  txIndex: number;
}
