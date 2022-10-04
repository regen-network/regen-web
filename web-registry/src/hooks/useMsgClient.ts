import { useCallback, useState } from 'react';
import { DeliverTxResponse, StdFee } from '@cosmjs/stargate';

import { useLedger } from '../ledger';
import { assertIsError } from '../lib/error';
import { Wallet } from '../lib/wallet';

interface TxData {
  msgs: any[];
  fee?: StdFee;
  memo?: string;
}

export type SignAndBroadcastType = (
  message: TxData,
  onBroadcast?: () => void, // an optional callback that gets called between sign and broadcast
) => Promise<void | string>;

type MsgClientType = {
  signAndBroadcast: SignAndBroadcastType;
  setDeliverTxResponse: (txResult: DeliverTxResponse | undefined) => void;
  deliverTxResponse?: DeliverTxResponse;
  setError: (error: string | undefined) => void;
  error?: string;
  wallet?: Wallet;
};

export default function useMsgClient(
  handleTxQueued: () => void,
  handleTxDelivered: (deliverTxResponse: DeliverTxResponse) => void,
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
    async (txBytes: Uint8Array): Promise<void | string> => {
      if (!api?.msgClient || !txBytes) return;
      handleTxQueued();
      const _deliverTxResponse = await api.msgClient.broadcast(txBytes);
      // The transaction succeeded iff code is 0.
      // TODO: this can give false positives. Some errors return code 0.
      if (_deliverTxResponse.code !== 0) {
        setError(_deliverTxResponse.rawLog);
        handleError();
        return _deliverTxResponse.rawLog;
      } else {
        setDeliverTxResponse(_deliverTxResponse);
        handleTxDelivered(_deliverTxResponse);
      }
    },
    [api?.msgClient, handleTxQueued, handleTxDelivered, handleError],
  );

  const signAndBroadcast = useCallback(
    async (tx: TxData, closeForm?: () => void) => {
      try {
        const txBytes = await sign(tx);
        if (txBytes) {
          if (closeForm) closeForm();
          return await broadcast(txBytes);
        }
      } catch (err) {
        if (closeForm) closeForm();
        handleError();
        assertIsError(err);
        setError(err.message);
        return err.message;
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
