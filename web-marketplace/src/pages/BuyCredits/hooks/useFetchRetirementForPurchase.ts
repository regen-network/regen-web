import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { timer } from 'utils/timer';

import {
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getTxHashForPaymentIntentQuery } from 'lib/queries/react-query/registry-server/graphql/getTxHashForPaymentIntent/getTxHashForPaymentIntentQuery';
import { getRetirementByTxHash } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByTxHash/getRetirementByTxHash';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { PURCHASE_SUCCESSFUL, VIEW_CERTIFICATE } from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes } from '../BuyCredits.types';

type UseFetchRetirementForPurchaseParams = {
  paymentIntentId?: string;
  txHash?: string;
};
export const useFetchRetirementForPurchase = ({
  paymentIntentId,
  txHash,
}: UseFetchRetirementForPurchaseParams) => {
  const { _ } = useLingui();
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const navigate = useNavigate();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const { handleSuccess } = useMultiStep<BuyCreditsSchemaTypes>();
  const reactQueryClient = useQueryClient();

  const { data: txHashData, refetch: refetchTxHash } = useQuery(
    getTxHashForPaymentIntentQuery({
      client: apolloClient,
      enabled: !!paymentIntentId && !!apolloClient,
      paymentIntentId: paymentIntentId as string,
    }),
  );
  const _txHash = txHash || txHashData?.data.getTxHashForPaymentIntent;
  const { data, refetch: refetchRetirement } = useQuery(
    getRetirementByTxHash({
      client: apolloClient,
      enabled: !!_txHash && !!apolloClient,
      txHash: _txHash as string,
    }),
  );
  const retirement = data?.data?.retirementByTxHash;

  const fetchRetirement = useCallback(async () => {
    setProcessingModalAtom(atom => void (atom.open = true));
    let i = 1;
    while (i < 10) {
      if (!txHash) await refetchTxHash();
      await refetchRetirement();

      i++;
      if (!!retirement) {
        break;
      }
      await timer(1000);
    }
    // TODO what should we do if no retirement found after 10sec?
    setProcessingModalAtom(atom => void (atom.open = false));
  }, [
    refetchRetirement,
    refetchTxHash,
    retirement,
    setProcessingModalAtom,
    txHash,
  ]);

  useEffect(() => {
    if (paymentIntentId) fetchRetirement();
  }, [fetchRetirement, paymentIntentId]);

  const onSuccess = useCallback(async () => {
    if (retirement) {
      setTxSuccessfulModalAtom(atom => {
        atom.open = true;
        // atom.cardItems = cardItems; // TODO
        atom.title = _(PURCHASE_SUCCESSFUL);
        atom.buttonTitle = _(VIEW_CERTIFICATE);
        atom.onButtonClick = () =>
          setTxSuccessfulModalAtom(atom => void (atom.open = false));
        atom.txHash = retirement.txHash;
        atom.keepOpenOnLocationChange = true;
      });
      // Reload sell orders
      await reactQueryClient.invalidateQueries({
        queryKey: [SELL_ORDERS_EXTENTED_KEY],
      });
      handleSuccess();
      navigate(`/certificate/${retirement.nodeId}`);
    }
  }, [
    _,
    handleSuccess,
    navigate,
    reactQueryClient,
    retirement,
    setTxSuccessfulModalAtom,
  ]);

  useEffect(() => {
    if (retirement) {
      onSuccess();
    }
  }, [
    _,
    handleSuccess,
    navigate,
    onSuccess,
    retirement,
    setTxSuccessfulModalAtom,
  ]);
};
