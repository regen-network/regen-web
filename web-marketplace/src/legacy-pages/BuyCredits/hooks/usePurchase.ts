import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { AllowedDenom } from '@regen-network/api/regen/ecocredit/marketplace/v1/state';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';
import { normalizeToUISellOrderInfo } from 'legacy-pages/Projects/hooks/useProjectsSellOrders.utils';
import { postData } from 'utils/fetch/postData';

import { getJurisdictionIsoCode } from 'web-components/src/utils/locationStandard';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom, errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txBuySuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getBaseTransactionUrl } from 'lib/block-explorer';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getOrdersByBuyerAddressKey } from 'lib/queries/react-query/registry-server/graphql/indexer/getOrdersByBuyerAddress/getOrdersByBuyerAddress.constants';
import { BuyExtendedEvent, BuyFailureEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { VIEW_PORTFOLIO } from 'components/organisms/BasketOverview/BasketOverview.constants';
import { BuyWarningModalContent } from 'components/organisms/BuyWarningModal/BuyWarningModal.types';
import { useFetchSellOrders } from 'components/organisms/UserSellOrders/hooks/useFetchSellOrders';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useMsgClient } from 'hooks';

import { EMAIL_RECEIPT, PAYMENT_OPTIONS } from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';
import {
  findMatchingSellOrders,
  getAmountLabel,
  getBaseCertificateUrl,
  getBaseOrderUrl,
  getCardItems,
  getCryptoCurrencyIconSrc,
  getSellOrdersCredits,
  getSteps,
  getWarningModalContent,
  sendPurchaseConfirmationEmail,
} from '../BuyCredits.utils';
import { useFetchRetirementForPurchase } from './useFetchRetirementForPurchase';

type UsePurchaseParams = {
  paymentOption: PaymentOptionsType;
  retiring: boolean;
  project?: NormalizeProject;
  currency?: Currency;
  creditsAmount?: number;
  currencyAmount?: number;
  allowedDenoms?: AllowedDenom[];
  shouldRefreshProfileData: boolean;
  setWarningModalState: UseStateSetter<{
    openModal: boolean;
    creditsAvailable: number;
  }>;
  warningModalContent: React.MutableRefObject<
    BuyWarningModalContent | undefined
  >;
  pricePerCredit?: number;
};

type PurchaseParams = {
  retirementReason?: string;
  country?: string;
  stateProvince?: string;
  postalCode?: string;
  retiring: boolean;
  paymentMethodId?: string;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
  confirmationTokenId?: string;
  subscribeNewsletter?: boolean;
};

export const usePurchase = ({
  paymentOption,
  retiring,
  project,
  currency,
  creditsAmount,
  currencyAmount,
  allowedDenoms,
  shouldRefreshProfileData,
  setWarningModalState,
  warningModalContent,
  pricePerCredit,
}: UsePurchaseParams) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { track } = useTracker();
  const location = useLocation();

  const { activeAccount } = useAuth();
  const navigate = useNavigate();
  const { signAndBroadcast } = useMsgClient();
  const { data } = useMultiStep<BuyCreditsSchemaTypes>();

  const setTxBuySuccessfulModalAtom = useSetAtom(txBuySuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const reactQueryClient = useQueryClient();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const retryCsrfRequest = useRetryCsrfRequest();
  const { handleSuccess } = useMultiStep<BuyCreditsSchemaTypes>();
  const [paymentIntentId, setPaymentIntentId] = useState<string | undefined>();
  const [txHash, setTxHash] = useState<string | undefined>();

  const displayDenom = useMemo(
    () =>
      currency?.askDenom
        ? findDisplayDenom({
            allowedDenoms,
            bankDenom: currency?.askDenom,
            baseDenom: currency?.askBaseDenom,
          })
        : undefined,
    [allowedDenoms, currency?.askBaseDenom, currency?.askDenom],
  );

  useFetchRetirementForPurchase({
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
  });

  const { refetchSellOrders } = useFetchSellOrders();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const batchDenoms = useMemo(
    () => data?.sellOrders?.map(order => order.batchDenom),
    [data?.sellOrders],
  );

  const purchase = useCallback(
    async ({
      retirementReason,
      country,
      stateProvince,
      postalCode,
      retiring,
      subscribeNewsletter,
      paymentMethodId,
      stripe,
      elements,
      confirmationTokenId,
    }: PurchaseParams) => {
      if (
        !creditsAmount ||
        !currencyAmount ||
        !project ||
        !currency ||
        !displayDenom
      )
        return;

      const trackingEvent = {
        url: location.pathname,
        projectName: project?.name,
        projectId: project?.id,
        creditClassId: project?.creditClassId,
        crypto: paymentOption === PAYMENT_OPTIONS.CRYPTO,
        batchDenoms,
        retiring,
        currencyDenom: data?.currency?.askBaseDenom,
        quantity: data?.creditsAmount,
        pricePerCredit,
      };

      await track<BuyExtendedEvent>('buy4', trackingEvent);

      const sellOrders = await refetchSellOrders();
      const creditsInAllSellOrders = getSellOrdersCredits(sellOrders);
      const creditsToBuy = data?.creditsAmount;
      const requestedSellOrders = findMatchingSellOrders(
        data,
        sellOrders?.map(normalizeToUISellOrderInfo),
      );
      const creditsInRequestedSellOrders =
        getSellOrdersCredits(requestedSellOrders);

      const sellCanProceed =
        creditsToBuy && creditsToBuy <= creditsInRequestedSellOrders;
      if (sellCanProceed) {
        const {
          sellOrders: selectedSellOrders,
          savePaymentMethod,
          createAccount: createActiveAccount,
          email,
          name,
        } = data;

        if (email && subscribeNewsletter) {
          await fetch(`${apiServerUrl}/subscribers/v1/add`, {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ email }),
          });
        }

        if (shouldRefreshProfileData) {
          await updateAccountById({
            variables: {
              input: {
                id: activeAccount?.id,
                accountPatch: {
                  name,
                },
              },
            },
          });
        }

        if (selectedSellOrders && creditsAmount) {
          const retirementJurisdiction =
            retiring && country
              ? getJurisdictionIsoCode({
                  country,
                  stateProvince,
                  postalCode,
                })
              : '';

          // Fiat payment
          if (paymentOption === PAYMENT_OPTIONS.CARD && stripe && elements) {
            // 1. Create payment intent
            if (!paymentMethodId) {
              const submitRes = await elements.submit();
              if (submitRes?.error?.message) {
                setErrorBannerTextAtom(submitRes?.error?.message);
                return;
              }
            }

            try {
              if (token) {
                const res = await postData({
                  url: `${apiUri}/marketplace/v1/stripe/create-payment-intent`,
                  data: {
                    items: selectedSellOrders,
                    email,
                    name,
                    savePaymentMethod,
                    createActiveAccount,
                    paymentMethodId,
                    retirementJurisdiction,
                    retirementReason,
                    creditsAmount,
                    displayDenom,
                    amountLabel: getAmountLabel(retiring),
                    currencyIconSrc: getCryptoCurrencyIconSrc(
                      currency.askBaseDenom,
                      currency.askDenom,
                    ),
                    projectName: project.name,
                    baseTransactionHref: getBaseTransactionUrl(),
                    certificateBaseHref: getBaseCertificateUrl(),
                    baseOrderHref: getBaseOrderUrl(),
                  },
                  token,
                  retryCsrfRequest,
                  onSuccess: async res => {
                    const { clientSecret } = res;
                    // 2. Confirm payment
                    // with saved credit card
                    if (paymentMethodId) {
                      const { error, paymentIntent } =
                        await stripe.confirmCardPayment(clientSecret, {
                          payment_method: paymentMethodId,
                        });
                      if (error) {
                        const errorMessage = String(error.message);
                        setErrorBannerTextAtom(errorMessage);
                        track<BuyFailureEvent>('buyFailure', {
                          ...trackingEvent,
                          errorMessage,
                        });
                        return;
                      }
                      track<BuyExtendedEvent>('buySuccess', trackingEvent);
                      setPaymentIntentId(paymentIntent.id);
                    } else {
                      // or new credit card
                      const { error, paymentIntent } =
                        await stripe.confirmPayment({
                          clientSecret,
                          confirmParams: {
                            confirmation_token: confirmationTokenId,
                          },
                          redirect: 'if_required',
                        });
                      if (error) {
                        // This point is only reached if there's an immediate error when
                        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
                        const errorMessage = String(error.message);
                        setErrorBannerTextAtom(errorMessage);
                        track<BuyFailureEvent>('buyFailure', {
                          ...trackingEvent,
                          errorMessage,
                        });
                        return;
                      }
                      if (
                        paymentIntent?.client_secret &&
                        paymentIntent?.status === 'requires_action'
                      ) {
                        // If action is required (e.g., 3D Secure), handle it manually
                        const { error: actionError } =
                          await stripe.handleCardAction(
                            paymentIntent.client_secret,
                          );
                        if (actionError) {
                          const actionErrorMessage = String(
                            actionError.message,
                          );
                          setErrorBannerTextAtom(actionErrorMessage);
                          track<BuyFailureEvent>('buyFailure', {
                            ...trackingEvent,
                            errorMessage: actionErrorMessage,
                          });
                          return;
                        }
                      }
                      track<BuyExtendedEvent>('buySuccess', trackingEvent);
                      setPaymentIntentId(paymentIntent.id);
                    }
                  },
                });
                // If backend returned an error
                if (res?.error) {
                  const errorMessage = String(res.error);
                  setErrorBannerTextAtom(errorMessage);
                  track<BuyFailureEvent>('buyFailure', {
                    ...trackingEvent,
                    errorMessage,
                  });
                  return;
                }
              }
            } catch (error) {
              const errorMessage = String(error);
              setErrorBannerTextAtom(errorMessage);
              track<BuyFailureEvent>('buyFailure', {
                ...trackingEvent,
                errorMessage,
              });
            }
          } else if (wallet?.address) {
            // Crypto payment
            const msgBuyDirect =
              regen.ecocredit.marketplace.v1.MessageComposer.withTypeUrl.buyDirect(
                {
                  buyer: wallet?.address,
                  orders: selectedSellOrders.map(order => ({
                    sellOrderId: BigInt(order.sellOrderId),
                    bidPrice: order.bidPrice,
                    disableAutoRetire: !retiring,
                    quantity: String(order.quantity),
                    retirementReason: retirementReason || '',
                    retirementJurisdiction,
                  })),
                },
              );

            await signAndBroadcast(
              {
                msgs: [msgBuyDirect],
                fee: {
                  amount: [
                    {
                      denom: 'uregen',
                      amount: '5000',
                    },
                  ],
                  // We set gas higher than normal because if there are many sell orders to process,
                  // more gas will be used.
                  // In a follow up, we could simulate tx.
                  // User can also update that manually from Keplr before signing.
                  gas: '500000',
                },
              },
              (): void => {
                setProcessingModalAtom(atom => void (atom.open = true));
              },
              {
                onError: async (error?: Error) => {
                  setProcessingModalAtom(atom => void (atom.open = false));
                  setErrorCodeAtom(ERRORS.DEFAULT);
                  const errorMessage = String(error);
                  setErrorModalAtom(
                    atom => void (atom.description = errorMessage),
                  );
                  track<BuyFailureEvent>('buyFailure', {
                    ...trackingEvent,
                    errorMessage,
                  });
                },
                onSuccess: async (deliverTxResponse?: DeliverTxResponse) => {
                  const _txHash = deliverTxResponse?.transactionHash;
                  setTxHash(_txHash);

                  track<BuyExtendedEvent>('buySuccess', trackingEvent);

                  // In case of retirement, it's handled in useFetchRetirementForPurchase
                  if (!retiring) {
                    // Send purchase confirmation if email provided
                    if (email && token && _txHash) {
                      await sendPurchaseConfirmationEmail({
                        currency,
                        retiring,
                        email,
                        currencyAmount,
                        displayDenom,
                        projectName: project.name,
                        creditsAmount,
                        txHash: _txHash,
                        token,
                        retryCsrfRequest,
                        certificateHref: '',
                      });
                    }

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
                      atom.buttonTitle = _(VIEW_PORTFOLIO);
                      atom.onButtonClick = () =>
                        setTxBuySuccessfulModalAtom(
                          atom => void (atom.open = false),
                        );
                      atom.txHash = _txHash;
                      atom.steps = getSteps(paymentOption, retiring);
                      atom.description = email
                        ? `${_(EMAIL_RECEIPT)} ${email}`
                        : undefined;
                    });

                    await reactQueryClient.invalidateQueries({
                      queryKey: [SELL_ORDERS_EXTENTED_KEY],
                    });
                    // Reload crypto orders and balances
                    if (wallet?.address) {
                      await reactQueryClient.invalidateQueries(
                        getOrdersByBuyerAddressKey(wallet?.address),
                      );
                      await reactQueryClient.invalidateQueries({
                        queryKey: ['balances', wallet?.address], // invalidate all query pages
                      });
                    }

                    // Reset BuyCredits forms
                    handleSuccess();
                    navigate(`/dashboard/portfolio`);

                    if (shouldRefreshProfileData) {
                      await reactQueryClient.invalidateQueries({
                        queryKey: getAccountByIdQueryKey({
                          id: activeAccount?.id,
                        }),
                      });
                    }
                  }
                },
              },
            );
          }
        }
      } else {
        setWarningModalState({
          openModal: true,
          creditsAvailable: creditsInRequestedSellOrders,
        });
        warningModalContent.current = getWarningModalContent(
          currency,
          creditsInRequestedSellOrders,
          _,
          data,
          creditsInAllSellOrders,
          allowedDenoms,
        );
      }
    },
    [
      _,
      activeAccount,
      allowedDenoms,
      batchDenoms,
      creditsAmount,
      currency,
      currencyAmount,
      data,
      displayDenom,
      handleSuccess,
      location.pathname,
      navigate,
      paymentOption,
      pricePerCredit,
      project,
      reactQueryClient,
      refetchSellOrders,
      retryCsrfRequest,
      setErrorBannerTextAtom,
      setErrorCodeAtom,
      setErrorModalAtom,
      setProcessingModalAtom,
      setTxBuySuccessfulModalAtom,
      setWarningModalState,
      shouldRefreshProfileData,
      signAndBroadcast,
      token,
      track,
      updateAccountById,
      wallet?.address,
      warningModalContent,
    ],
  );
  return purchase;
};
