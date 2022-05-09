import { useState, useCallback } from 'react';
import { StdFee, DeliverTxResponse } from '@cosmjs/stargate';

import { useLedger } from '../ledger';
import { Wallet } from '../lib/wallet';

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
  setError: (error: string | undefined) => void;
  error?: string;
  wallet?: Wallet;
};

function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw error;
  }
}

export default function useMsgClient(
  handleTxQueued: () => void,
  handleTxDelivered: () => void,
  handleError: () => void,
): MsgClientType {
  const { api, wallet } = useLedger();
  const [error, setError] = useState<string | undefined>();
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

      const txBytes = await api.msgClient.sign(
        wallet.address,
        msgs,
        fee || defaultFee,
        memo || '',
      );

      return txBytes;
    },
    [api?.msgClient, wallet?.address],
  );

  const broadcast = useCallback(
    async (txBytes: Uint8Array) => {
      if (!api?.msgClient || !txBytes) return;
      handleTxQueued();
      const _deliverTxResponse = await api.msgClient.broadcast(txBytes);
      setDeliverTxResponse(_deliverTxResponse);
      handleTxDelivered();
      // The transaction suceeded iff code is 0.
      if (_deliverTxResponse.code !== 0) {
        setError(_deliverTxResponse.rawLog);
      }
    },
    [api?.msgClient, handleTxQueued, handleTxDelivered],
  );

  const signAndBroadcast = useCallback(
    async (tx: TxData, closeForm?: () => void) => {
      try {
        const txBytes = await sign(tx);
        if (txBytes) {
          if (closeForm) closeForm();
          await broadcast(txBytes);
        }
      } catch (err) {
        if (closeForm) closeForm();
        handleError();
        assertIsError(err);
        setError(err.message);
      }

      return;
    },
    [sign, broadcast, handleError],
  );

  return {
    signAndBroadcast,
    setDeliverTxResponse,
    deliverTxResponse,
    setError,
    error,
    wallet,
  };
}
