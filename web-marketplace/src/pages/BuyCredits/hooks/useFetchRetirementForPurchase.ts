import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { timer } from 'utils/timer';
import { L } from 'vitest/dist/chunks/reporters.C_zwCd4j';

import {
  processingModalAtom,
  txBuySuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getTxHashForPaymentIntentQuery } from 'lib/queries/react-query/registry-server/graphql/getTxHashForPaymentIntent/getTxHashForPaymentIntentQuery';
import { getRetirementByTxHash } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByTxHash/getRetirementByTxHash';

import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { EMAIL_RECEIPT, VIEW_CERTIFICATE } from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';
import { getCardItems, getSteps } from '../BuyCredits.utils';

type UseFetchRetirementForPurchaseParams = {
  paymentIntentId?: string;
  txHash?: string;
  paymentOption: PaymentOptionsType;
  retiring: boolean;
  project?: NormalizeProject;
  currency?: Currency;
  creditsAmount?: number;
  currencyAmount?: number;
  displayDenom?: string;
  email?: string | null;
};
export const useFetchRetirementForPurchase = ({
  paymentIntentId,
  txHash,
  paymentOption,
  retiring,
  project,
  currency,
  creditsAmount,
  currencyAmount,
  displayDenom,
  email,
}: UseFetchRetirementForPurchaseParams) => {
  const { _ } = useLingui();
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const navigate = useNavigate();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setTxBuySuccessfulModalAtom = useSetAtom(txBuySuccessfulModalAtom);
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

  const fetchTxHash = useCallback(async () => {
    setProcessingModalAtom(atom => void (atom.open = true));
    let i = 1;
    while (!txHash && i < 10) {
      const res = await refetchTxHash();
      const txHash = res.data?.data.getTxHashForPaymentIntent;
      if (!!txHash) {
        break;
      }
      i++;
      await timer(1000);
    }
  }, [refetchTxHash, setProcessingModalAtom, txHash]);

  const fetchRetirement = useCallback(async () => {
    // setProcessingModalAtom(atom => void (atom.open = true));
    let i = 1;
    while (i < 10) {
      const res = await refetchRetirement();
      const retirement = res.data?.data.retirementByTxHash;
      if (!!retirement) {
        break;
      }
      i++;
      await timer(1000);
    }
    // TODO what should we do if no retirement found after 10sec?
  }, [refetchRetirement]);

  useEffect(() => {
    if (paymentIntentId) fetchTxHash();
  }, [fetchTxHash, paymentIntentId]);

  useEffect(() => {
    if (txHash) fetchRetirement();
  }, [fetchRetirement, txHash]);

  const onSuccess = useCallback(async () => {
    if (
      retirement &&
      creditsAmount &&
      currencyAmount &&
      project &&
      currency &&
      displayDenom
    ) {
      setProcessingModalAtom(atom => void (atom.open = false));

      setTxBuySuccessfulModalAtom(atom => {
        atom.open = true;
        atom.cardItems = getCardItems({
          retiring,
          creditsAmount,
          currencyAmount,
          project,
          currency,
          displayDenom,
        });
        atom.buttonTitle = _(VIEW_CERTIFICATE);
        atom.onButtonClick = () =>
          setTxBuySuccessfulModalAtom(atom => void (atom.open = false));
        atom.txHash = retirement.txHash;
        atom.steps = getSteps(paymentOption, retiring);
        atom.description = email ? `${_(EMAIL_RECEIPT)} ${email}` : undefined;
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
    creditsAmount,
    currency,
    currencyAmount,
    displayDenom,
    email,
    handleSuccess,
    navigate,
    paymentOption,
    project,
    reactQueryClient,
    retirement,
    retiring,
    setProcessingModalAtom,
    setTxBuySuccessfulModalAtom,
  ]);

  useEffect(() => {
    if (retirement) {
      onSuccess();
    }
  }, [_, handleSuccess, navigate, onSuccess, retirement]);
};
