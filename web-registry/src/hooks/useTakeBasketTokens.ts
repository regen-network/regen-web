import { useState, useEffect } from 'react';
import { StdFee } from '@cosmjs/stargate';
import {
  MsgTake,
  MsgTakeResponse,
  MsgClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { MessageClient } from '@regen-network/api/lib/tx';

import { useLedger } from '../ledger';

interface TakeBasketsAPI {
  signTake: (
    address: string,
    basketDenom: string,
    amount: number,
    retirementLocation?: string,
    retireOnTake?: boolean,
  ) => Promise<Uint8Array>;
}

export default function useTakeBasketTokens(): TakeBasketsAPI {
  const { api } = useLedger();
  const [msgClient, setMsgClient] = useState<MessageClient | undefined>();

  useEffect(() => {
    if (!api?.msgClient) return;

    setMsgClient(api.msgClient);
  }, [api?.msgClient]);

  const signTake = (
    address: string,
    basketDenom: string,
    amount: number,
    retirementLocation?: string,
    retireOnTake?: boolean,
  ): Promise<Uint8Array> => {
    console.log('api?', api);
    if (!api?.msgClient) return Promise.reject();
    const msg: MsgTake = {
      $type: 'regen.ecocredit.basket.v1.MsgTake',
      /** owner is the owner of the basket tokens. */
      owner: address,
      /** basket_denom is the basket bank denom to take credits from. */
      basketDenom,
      /** amount is the integer number of basket tokens to convert into credits. */
      amount: amount.toString(),
      /**
       * retirement_location is the optional retirement location for the credits
       * which will be used only if retire_on_take is true for this basket.
       */
      retirementLocation: retirementLocation || '',
      /**
       * retire_on_take is a boolean that dictates whether the ecocredits
       * received in exchange for the basket tokens will be received as
       * retired or tradable credits.
       */
      retireOnTake: retireOnTake || false,
    };

    const fee: StdFee = {
      amount: [{ amount: '0', denom: 'uregen' }],
      gas: '0',
    };

    const memo = '';

    return api.msgClient.sign(address, msg, fee, memo);
  };

  return { signTake };
}
