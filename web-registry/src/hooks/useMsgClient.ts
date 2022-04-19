import { useState, useCallback } from 'react';
import { StdFee, DeliverTxResponse } from '@cosmjs/stargate';

import { useLedger } from '../ledger';
import { Sender } from '../lib/wallet';

interface TxData {
  msgs: any[];
  fee?: StdFee;
  memo?: string;
}

type MsgClientType = {
  signAndBroadcast: (
    message: TxData,
    onBroadcast?: () => void, // an optional callback that gets called between sign and broadcast
  ) => Promise<void>;
  setDeliverTxResponse: (txResult: DeliverTxResponse | undefined) => void;
  deliverTxResponse?: DeliverTxResponse;
  error?: unknown;
  wallet?: Sender;
};

export default function useMsgClient(
  handleTxQueued: () => void,
  handleTxDelivered: () => void,
): MsgClientType {
  const { api, wallet } = useLedger();
  const [error, setError] = useState<unknown | undefined>();
  const [deliverTxResponse, setDeliverTxResponse] = useState<
    DeliverTxResponse | undefined
  >();

  const sign = useCallback(
    async (tx: TxData): Promise<Uint8Array | undefined> => {
      if (!api?.msgClient || !wallet?.address) return;
      const { msgs, fee, memo } = tx;

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

        return txBytes;
      } catch (err) {
        setError(err);
        return;
      }
    },
    [api?.msgClient, wallet?.address],
  );

  const broadcast = useCallback(
    async (txBytes: Uint8Array) => {
      if (!api?.msgClient || !txBytes) return;
      try {
        handleTxQueued();
        const _deliverTxResponse = await api.msgClient.broadcast(txBytes);
        setDeliverTxResponse(_deliverTxResponse);
        handleTxDelivered();
      } catch (err) {
        setError(err);
      }
    },
    [api?.msgClient, handleTxQueued, handleTxDelivered],
  );

  const signAndBroadcast = useCallback(
    async (tx: TxData, onBroadcast?: () => void) => {
      try {
        const txBytes = await sign(tx);
        if (txBytes) {
          if (onBroadcast) onBroadcast();
          await broadcast(txBytes);
        }
      } catch (err) {
        setError(err);
      }

      return;
    },
    [sign, broadcast],
  );

  return {
    signAndBroadcast,
    setDeliverTxResponse,
    deliverTxResponse,
    error,
    wallet,
  };
}
