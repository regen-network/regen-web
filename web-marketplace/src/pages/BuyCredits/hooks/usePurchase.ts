import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { getJurisdictionIsoCode } from 'web-components/src/utils/locationStandard';
import { truncate } from 'web-components/src/utils/truncate';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom, errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  connectedEmailErrorModalAtom,
  errorModalAtom,
  processingModalAtom,
  txBuySuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getHashUrl } from 'lib/block-explorer';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { useWallet } from 'lib/wallet/wallet';

import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { VIEW_PORTFOLIO } from 'components/organisms/BasketOverview/BasketOverview.constants';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { CONNECTED_EMAIL_ERROR } from 'components/organisms/RegistryLayout/RegistryLayout.constants';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useMsgClient } from 'hooks';

import { EMAIL_RECEIPT, PAYMENT_OPTIONS } from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';
import {
  getCardItems,
  getCryptoCurrencyIconSrc,
  getSteps,
  updateAccountData,
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
};
type PurchaseParams = {
  selectedSellOrders: ChooseCreditsFormSchemaType['sellOrders'];
  retirementReason?: string;
  country?: string;
  stateProvince?: string;
  postalCode?: string;
  retiring: boolean;
  savePaymentMethod?: boolean;
  createActiveAccount?: boolean;
  paymentMethodId?: string;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
  confirmationTokenId?: string;
};

export const usePurchase = ({
  paymentOption,
  retiring,
  project,
  currency,
  creditsAmount,
  currencyAmount,
  allowedDenoms,
}: UsePurchaseParams) => {
  const { _ } = useLingui();
  const { wallet, activeWalletAddr } = useWallet();
  const { activeAccount, privActiveAccount } = useAuth();
  const navigate = useNavigate();
  const { signAndBroadcast } = useMsgClient();
  const { data } = useMultiStep<BuyCreditsSchemaTypes>();
  const email = data?.email;
  const name = data?.name;

  const setTxBuySuccessfulModalAtom = useSetAtom(txBuySuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const setConnectedEmailErrorModalAtom = useSetAtom(
    connectedEmailErrorModalAtom,
  );

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
  });

  const purchase = useCallback(
    async ({
      selectedSellOrders,
      retirementReason,
      country,
      stateProvince,
      postalCode,
      retiring,
      savePaymentMethod,
      createActiveAccount,
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

      // If a logged in user with no email address (web3 account) provides one,
      // we send a confirmation email
      if (!!activeAccount && !privActiveAccount?.email && email && token) {
        try {
          const response: { error?: string } = await postData({
            url: `${apiUri}/marketplace/v1/auth/email/create-token`,
            data: {
              email,
            },
            token,
            retryCsrfRequest,
          });
          if (response.error) {
            if (response.error === CONNECTED_EMAIL_ERROR) {
              setConnectedEmailErrorModalAtom(atom => {
                atom.open = true;
                atom.email = email as string;
              });
              return;
            }
          }
        } catch (e) {
          setErrorBannerTextAtom(String(e));
        }
      }

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
            await postData({
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
                    setErrorBannerTextAtom(String(error));
                    return;
                  }
                  setPaymentIntentId(paymentIntent.id);
                } else {
                  // or new credit card
                  const { error, paymentIntent } = await stripe.confirmPayment({
                    clientSecret,
                    confirmParams: {
                      confirmation_token: confirmationTokenId,
                    },
                    redirect: 'if_required',
                  });
                  if (error) {
                    // This point is only reached if there's an immediate error when
                    // confirming the payment. Show the error to your customer (for example, payment details incomplete)
                    setErrorBannerTextAtom(String(error.message));
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
                      setErrorBannerTextAtom(String(actionError.message));
                      return;
                    }
                  }
                  setPaymentIntentId(paymentIntent.id);

                  // await updateAccountData(reactQueryClient, selectedLanguage);
                }
              },
            });
          }
        } catch (error) {
          setErrorBannerTextAtom(String(error));
        }
      } else {
        // Crypto payment
        const msgBuyDirect = MsgBuyDirect.fromPartial({
          buyer: wallet?.address,
          orders: selectedSellOrders.map(order => ({
            sellOrderId: order.sellOrderId,
            bidPrice: order.bidPrice,
            disableAutoRetire: !retiring,
            quantity: String(order.quantity),
            retirementReason: retirementReason,
            retirementJurisdiction,
          })),
        });

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
              setErrorModalAtom(
                atom => void (atom.description = String(error)),
              );
            },
            onSuccess: async (deliverTxResponse?: DeliverTxResponse) => {
              const _txHash = deliverTxResponse?.transactionHash;
              setTxHash(_txHash);

              // Send purchase confirmation if email provided
              if (email && token) {
                const currencyIconSrc = getCryptoCurrencyIconSrc(
                  currency.askBaseDenom,
                  currency.askDenom,
                );
                const amountLabel = retiring
                  ? _(msg`amount retired`)
                  : _(msg`amount tradable`);

                await postData({
                  url: `${apiUri}/marketplace/v1/confirm-crypto-order`,
                  data: {
                    email,
                    currencyAmount,
                    currencyIconSrc,
                    displayDenom,
                    projectName: project?.name,
                    amountLabel,
                    creditsAmount,
                    txHref: getHashUrl(_txHash),
                    txHash: truncate(_txHash),
                    orderHref: `${
                      window.location.origin
                    }/dashboard/admin/my-orders#${_txHash?.toLowerCase()}`,
                  },
                  token,
                  retryCsrfRequest,
                });
              }

              // In case of retirement, it's handled in useFetchRetirementForPurchase
              if (!retiring) {
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

                // Reset BuyCredits forms
                handleSuccess();
                navigate(`/dashboard/portfolio`);
              }
              // if (activeWalletAddr) {
              //   // Invalidate queries to refetch orders
              //   reactQueryClient.invalidateQueries(
              //     getOrdersByBuyerAddressKey(activeWalletAddr),
              //   );
              // }
            },
          },
        );
      }
    },
    [
      _,
      activeAccount,
      // activeWalletAddr,
      creditsAmount,
      currency,
      currencyAmount,
      displayDenom,
      email,
      handleSuccess,
      name,
      navigate,
      paymentOption,
      privActiveAccount?.email,
      project,
      reactQueryClient,
      retryCsrfRequest,
      setConnectedEmailErrorModalAtom,
      setErrorBannerTextAtom,
      setErrorCodeAtom,
      setErrorModalAtom,
      setProcessingModalAtom,
      setTxBuySuccessfulModalAtom,
      signAndBroadcast,
      token,
      wallet?.address,
    ],
  );
  return purchase;
};
