import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { timer } from 'utils/timer';

import {
  processingModalAtom,
  txBuySuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { BLOCKCHAIN_RECORD } from 'lib/constants/shared.constants';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { getTxHashForPaymentIntentQuery } from 'lib/queries/react-query/registry-server/graphql/getTxHashForPaymentIntent/getTxHashForPaymentIntentQuery';
import { getOrdersByBuyerAddressKey } from 'lib/queries/react-query/registry-server/graphql/indexer/getOrdersByBuyerAddress/getOrdersByBuyerAddress.constants';
import { getRetirementByTxHash } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByTxHash/getRetirementByTxHash';
import { useWallet } from 'lib/wallet/wallet';

import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import {
  EMAIL_RECEIPT,
  PAYMENT_OPTIONS,
  VIEW_CERTIFICATE,
} from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';
import { getCardItems, getSteps, updateAccountData } from '../BuyCredits.utils';

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
}: UseFetchRetirementForPurchaseParams) => {
  const { _ } = useLingui();
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const navigate = useNavigate();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setTxBuySuccessfulModalAtom = useSetAtom(txBuySuccessfulModalAtom);
  const { handleSuccess, data: multiStepData } =
    useMultiStep<BuyCreditsSchemaTypes>();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
  const email = multiStepData?.email;
  const name = multiStepData?.name;

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

  const onPending = useCallback(() => {
    if (
      paymentIntentId &&
      creditsAmount &&
      currencyAmount &&
      project &&
      currency &&
      displayDenom
    ) {
      setProcessingModalAtom(atom => void (atom.open = false));

      setTxBuySuccessfulModalAtom(atom => {
        atom.open = true;
        atom.cardItems = [
          ...getCardItems({
            retiring,
            creditsAmount,
            currencyAmount,
            project,
            currency,
            displayDenom,
          }),
          {
            label: _(BLOCKCHAIN_RECORD),
            value: {
              name: _(msg`Transfer pending`),
              className: 'text-error-400',
            },
          },
        ];
        atom.title = _(
          msg`Your purchase was successful but the credit transfer process hasn’t been completed just yet.`,
        );
        atom.buttonTitle = _(VIEW_CERTIFICATE);
        atom.onButtonClick = () =>
          setTxBuySuccessfulModalAtom(atom => void (atom.open = false));
        atom.steps = getSteps(paymentOption, retiring);
        atom.description = _(
          t`Your retirement certificate will be generated as soon as the credits are transferred, please check later. Meanwhile, we have emailed you a receipt to ${email}`,
        );
      });
      handleSuccess();
      navigate(`/certificate/${paymentIntentId}?name=${name}`);
    }
  }, [
    _,
    creditsAmount,
    currency,
    currencyAmount,
    displayDenom,
    email,
    handleSuccess,
    name,
    navigate,
    paymentIntentId,
    paymentOption,
    project,
    retiring,
    setProcessingModalAtom,
    setTxBuySuccessfulModalAtom,
  ]);

  const fetchTxHash = useCallback(async () => {
    setProcessingModalAtom(atom => void (atom.open = true));
    let i = 1;
    let refetchedTxHash;
    while (!txHash && i < 10) {
      const res = await refetchTxHash();
      refetchedTxHash = res.data?.data.getTxHashForPaymentIntent;
      if (!!refetchedTxHash) {
        break;
      }
      i++;
      await timer(1000);
    }
    if (!refetchedTxHash) {
      onPending();
    }
  }, [onPending, refetchTxHash, setProcessingModalAtom, txHash]);

  const fetchRetirement = useCallback(async () => {
    let i = 1;
    let refetchedRetirement;
    while (i < 10) {
      const res = await refetchRetirement();
      refetchedRetirement = res.data?.data.retirementByTxHash;
      if (!!refetchedRetirement) {
        break;
      }
      i++;
      await timer(1000);
    }
    if (!refetchedRetirement) {
      onPending();
    }
  }, [onPending, refetchRetirement]);

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

      // Reload crypto orders and balances
      if (wallet?.address && paymentOption === PAYMENT_OPTIONS.CRYPTO) {
        await reactQueryClient.invalidateQueries(
          getOrdersByBuyerAddressKey(wallet?.address),
        );
        await reactQueryClient.invalidateQueries({
          queryKey: ['balances', wallet?.address], // invalidate all query pages
        });
      }

      handleSuccess();
      navigate(`/certificate/${retirement.nodeId}?name=${name}`);

      // Reload account data with fiat orders
      // Doing it after navigating otherwise can cause the page to reload before
      if (paymentOption === PAYMENT_OPTIONS.CARD)
        await updateAccountData(reactQueryClient);
    }
  }, [
    _,
    creditsAmount,
    currency,
    currencyAmount,
    displayDenom,
    email,
    handleSuccess,
    name,
    navigate,
    paymentOption,
    project,
    reactQueryClient,
    retirement,
    retiring,
    setProcessingModalAtom,
    setTxBuySuccessfulModalAtom,
    wallet?.address,
  ]);

  useEffect(() => {
    if (retirement) {
      onSuccess();
    }
  }, [_, handleSuccess, navigate, onSuccess, retirement]);
};
