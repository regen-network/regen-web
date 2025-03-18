import { Any } from '@regen-network/api//google/protobuf/any';
import { Credits } from '@regen-network/api//regen/ecocredit/v1/types';
import { TxResponse } from '@regen-network/api/cosmos/base/abci/v1beta1/abci';
import { Tx } from '@regen-network/api/cosmos/tx/v1beta1/tx';

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
