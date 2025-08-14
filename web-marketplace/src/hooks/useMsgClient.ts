import { useCallback, useState } from 'react';
import { DeliverTxResponse, StdFee } from '@cosmjs/stargate';
import { TxRaw } from '@regen-network/api/cosmos/tx/v1beta1/tx';
import { useQueryClient } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import { txSuccessfulModalAtom } from 'lib/atoms/modals.atoms';
import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { useLedger } from '../ledger';
import { assertIsError } from '../lib/error';
import { useWallet, Wallet } from '../lib/wallet/wallet';

const defaultFee = {
  amount: [
    {
      denom: 'uregen',
      amount: '5000', // TODO: what should fee and gas be?
    },
  ],
  gas: '200000',
} as StdFee;

interface TxData {
  msgs: any[];
  fee?: StdFee;
  memo?: string;
}

interface OptionalCallbacks {
  onError?: (err?: Error) => void;
  onSuccess?: (deliverTxResponse?: DeliverTxResponse) => void;
}

export type SignAndBroadcastType = (
  message: TxData,
  onBroadcast?: () => void, // an optional callback that gets called between sign and broadcast
  callbacks?: OptionalCallbacks,
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
  handleTxQueued?: () => void,
  handleTxDelivered?: (deliverTxResponse: DeliverTxResponse) => void,
  handleError?: () => void,
): MsgClientType {
  const { signingClient, queryClient } = useLedger();
  const { wallet } = useWallet();
  const [error, setError] = useState<string | undefined>();
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setIsWaitingForSigning = useSetAtom(isWaitingForSigningAtom);

  const [deliverTxResponse, setDeliverTxResponse] = useState<
    DeliverTxResponse | undefined
  >();
  const reactQueryClient = useQueryClient();

  const sign = useCallback(
    async (tx: TxData): Promise<Uint8Array | undefined> => {
      if (!signingClient || !wallet?.address) return;
      const { msgs, fee: txFee, memo } = tx;

      const fee = txFee ?? defaultFee;

      const userRegenBalanceRes = await getFromCacheOrFetch({
        query: getBalanceQuery({
          request: { address: wallet?.address as string, denom: REGEN_DENOM },
          client: queryClient,
          enabled: !!queryClient && !!wallet?.address,
        }),
        reactQueryClient: reactQueryClient,
      });
      const userRegenBalance = userRegenBalanceRes?.balance;

      if (
        userRegenBalance === undefined ||
        Number(userRegenBalance?.amount) < Number(fee.amount[0].amount)
      ) {
        setErrorCodeAtom(ERRORS.NOT_ENOUGH_REGEN_FEES);
        return;
      }

      setIsWaitingForSigning(true);

      const txRaw = await signingClient.sign(
        wallet.address,
        msgs,
        fee,
        memo || '',
      );
      setIsWaitingForSigning(false);
      const txBytes = TxRaw.encode(txRaw).finish();
      return txBytes;
    },
    [
      signingClient,
      wallet?.address,
      reactQueryClient,
      setIsWaitingForSigning,
      setErrorCodeAtom,
      queryClient,
    ],
  );

  const broadcast = useCallback(
    async (txBytes: Uint8Array): Promise<DeliverTxResponse | undefined> => {
      if (!signingClient || !txBytes) return;
      handleTxQueued && handleTxQueued();
      const _deliverTxResponse = await signingClient.broadcastTx(txBytes);
      // The transaction succeeded iff code is 0.
      // TODO: this can give false positives. Some errors return code 0.
      if (_deliverTxResponse.code !== 0) {
        throw new Error(_deliverTxResponse.rawLog);
      } else {
        setDeliverTxResponse(_deliverTxResponse);
        handleTxDelivered && handleTxDelivered(_deliverTxResponse);
        setTxSuccessfulModalAtom(
          atom => void (atom.txHash = _deliverTxResponse.transactionHash),
        );
        return _deliverTxResponse;
      }
    },
    [
      signingClient,
      handleTxQueued,
      handleTxDelivered,
      setTxSuccessfulModalAtom,
    ],
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
          const deliverTxResponse = await broadcast(txBytes);
          if (onSuccess) onSuccess(deliverTxResponse);
        }
      } catch (err) {
        if (closeForm) closeForm();
        handleError && handleError();
        assertIsError(err);
        setError(err.message);
        if (onError) onError(err);
        setIsWaitingForSigning(false);
        return err.message;
      }

      return;
    },
    [sign, broadcast, handleError, setIsWaitingForSigning],
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
