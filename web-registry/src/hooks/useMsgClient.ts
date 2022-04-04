import { useState, useCallback } from 'react';
import { StdFee, DeliverTxResponse } from '@cosmjs/stargate';

import { useLedger } from '../ledger';
import { Sender } from '../lib/wallet';

type MsgClientType = {
  sign: (msgs: any, fee?: StdFee, memo?: string) => Promise<void>;
  setDeliverTxResponse: (txResult: DeliverTxResponse | undefined) => void;
  deliverTxResponse?: DeliverTxResponse;
  error?: unknown;
  wallet?: Sender;
};

export default function useMsgClient(
  handleTxQueued: () => void,
): MsgClientType {
  const { api, wallet } = useLedger();
  const [error, setError] = useState<unknown | undefined>();
  const [deliverTxResponse, setDeliverTxResponse] = useState<
    DeliverTxResponse | undefined
  >();

  const sign = useCallback(
    async (msgs: any, fee?: StdFee, memo?: string) => {
      if (!api?.msgClient || !wallet?.address) return;

      const defaultFee = {
        amount: [
          {
            denom: 'uregen',
            amount: '5000', // TODO: what should fee and gas be?
          },
        ],
        gas: '200000',
      };
      try {
        const txBytes = await api.msgClient.sign(
          wallet.address,
          msgs,
          fee || defaultFee,
          memo || '',
        );
        if (txBytes) {
          handleTxQueued();
          const _deliverTxResponse = await api.msgClient.broadcast(txBytes);
          setDeliverTxResponse(_deliverTxResponse);
        }
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
        setError(err);
      }

      return;
    },
    [api?.msgClient, wallet?.address, handleTxQueued],
  );

  return {
    sign,
    setDeliverTxResponse,
    deliverTxResponse,
    error,
    wallet,
  };
}
