import { useCallback, useState } from 'react';
import { DeliverTxResponse, StdFee } from '@cosmjs/stargate';

import { useGlobalStore } from 'lib/context/globalContext';

import { useLedger } from '../ledger';
import { assertIsError } from '../lib/error';
import { Wallet } from '../lib/wallet/wallet';

interface TxData {
  msgs: any[];
  fee?: StdFee;
  memo?: string;
}

interface OptionalCallbacks {
  onError?: () => void;
  onSuccess?: () => void;
}

export type SignAndBroadcastType = (
  message: TxData,
  onBroadcast?: () => void, // an optional callback that gets called between sign and broadcast
  { onError, onSuccess }?: OptionalCallbacks,
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
  const [, setGlobalStore] = useGlobalStore(
    store => store['isWaitingForSigning'],
  );
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

      setGlobalStore({ isWaitingForSigning: true });

      const txBytes = await api.msgClient.sign(
        wallet.address,
        msgs,
        fee || defaultFee,
        memo || '',
      );

      setGlobalStore({ isWaitingForSigning: false });

      return txBytes;
    },
    [api?.msgClient, wallet?.address, setGlobalStore],
  );

  const broadcast = useCallback(
    async (txBytes: Uint8Array): Promise<void> => {
      if (!api?.msgClient || !txBytes) return;
      handleTxQueued();
      const _deliverTxResponse = await api.msgClient.broadcast(txBytes);
      // The transaction succeeded iff code is 0.
      // TODO: this can give false positives. Some errors return code 0.
      if (_deliverTxResponse.code !== 0) {
        throw new Error(_deliverTxResponse.rawLog);
      } else {
        setDeliverTxResponse(_deliverTxResponse);
        handleTxDelivered(_deliverTxResponse);
      }
    },
    [api?.msgClient, handleTxQueued, handleTxDelivered],
  );

  const signAndBroadcast = useCallback(
    async (
      tx: TxData,
      closeForm?: () => void,
      { onError, onSuccess }: OptionalCallbacks = {},
    ) => {
      try {
        const txBytes = await sign(tx);
        if (txBytes) {
          if (closeForm) closeForm();
          await broadcast(txBytes);
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        if (closeForm) closeForm();
        handleError();
        assertIsError(err);
        setError(err.message);
        if (onError) onError();
        setGlobalStore({ isWaitingForSigning: false });
        return err.message;
      }

      return;
    },
    [sign, broadcast, handleError, setGlobalStore],
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
