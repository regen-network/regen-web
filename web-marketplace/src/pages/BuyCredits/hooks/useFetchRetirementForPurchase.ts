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

import { FailedFnType } from 'lib/atoms/error.atoms';
import {
  processingModalAtom,
  txBuySuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { BLOCKCHAIN_RECORD } from 'lib/constants/shared.constants';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
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
import {
  getCardItems,
  getCertificateHref,
  getSteps,
  sendPurchaseConfirmationEmail,
} from '../BuyCredits.utils';
import { invalidateBalancesWithRetries } from './invalidateBalancesWithRetries';

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
  shouldRefreshProfileData: boolean;
  token: string | undefined;
  retryCsrfRequest: (failedFunction: FailedFnType) => Promise<void>;
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
  shouldRefreshProfileData,
  token,
  retryCsrfRequest,
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
  const { activeAccount } = useAuth();

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
  const retirement = data?.data?.allRetirements?.nodes?.[0];

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
      navigate(
        `/certificate/${paymentIntentId}?name=${encodeURIComponent(
          name || '',
        )}`,
      );
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
  }, [onPending, refetchTxHash, txHash]);

  const fetchRetirement = useCallback(async () => {
    let i = 1;
    let refetchedRetirement;
    while (i < 10) {
      const res = await refetchRetirement();
      refetchedRetirement = res.data?.data?.allRetirements?.nodes?.[0];
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
    if (paymentIntentId && !retirement) {
      setProcessingModalAtom(atom => void (atom.open = true));
      fetchTxHash();
    }
  }, [fetchTxHash, paymentIntentId, retirement, setProcessingModalAtom]);

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

        // After tx success the ledger may not reflect updated balances immediately.
        // Briefly re-invalidate the balances query to pull the new retired amounts as soon as they're visible,
        // so the portfolio updates behind the success modal without requiring a manual reload.
        (async () => {
          if (wallet?.address) {
            await invalidateBalancesWithRetries(
              reactQueryClient,
              wallet.address,
            );
          }
        })();
      }
      handleSuccess();
      navigate(
        `/certificate/${retirement.nodeId}?name=${encodeURIComponent(
          name || '',
        )}`,
      );

      // Reload account data with fiat orders or new name
      // Doing it after navigating otherwise can cause the page to reload before
      // since the app header depends on the account data
      if (
        activeAccount?.id &&
        (paymentOption === PAYMENT_OPTIONS.CARD || shouldRefreshProfileData)
      ) {
        await reactQueryClient.invalidateQueries({
          queryKey: getAccountByIdQueryKey({ id: activeAccount?.id }),
        });
      }

      if (
        email &&
        token &&
        paymentOption !== PAYMENT_OPTIONS.CARD &&
        _txHash &&
        retiring
      ) {
        await sendPurchaseConfirmationEmail({
          currency,
          retiring,
          email,
          currencyAmount,
          displayDenom,
          projectName: project?.name,
          creditsAmount,
          txHash: _txHash,
          token,
          retryCsrfRequest,
          certificateHref: getCertificateHref(retirement.nodeId, name),
        });
      }
    }
  }, [
    _,
    _txHash,
    activeAccount?.id,
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
    retryCsrfRequest,
    setProcessingModalAtom,
    setTxBuySuccessfulModalAtom,
    shouldRefreshProfileData,
    token,
    wallet?.address,
  ]);

  useEffect(() => {
    if (retirement) {
      onSuccess();
    }
    // Excluding onSuccess from deps to avoid unnecessary calls when its reference changes.
    // We only need to run it once when retirement is available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retirement]);
};
