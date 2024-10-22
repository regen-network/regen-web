import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { select } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { getJurisdictionIsoCode } from 'web-components/src/utils/locationStandard';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom, errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { useWallet } from 'lib/wallet/wallet';

import { VIEW_PORTFOLIO } from 'components/organisms/BasketOverview/BasketOverview.constants';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useMsgClient } from 'hooks';

import {
  PAYMENT_OPTIONS,
  PURCHASE_SUCCESSFUL,
  VIEW_CERTIFICATE,
} from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';
import { useFetchLastRetirement } from './useFetchLastRetirement';

type PurchaseParams = {
  paymentOption: PaymentOptionsType;
  selectedSellOrders: ChooseCreditsFormSchemaType['sellOrders'];
  retirementReason?: string;
  country?: string;
  stateProvince?: string;
  postalCode?: string;
  retiring?: boolean;
  email?: string | null;
  name?: string;
  savePaymentMethod?: boolean;
  createActiveAccount?: boolean;
  paymentMethodId?: string;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
  confirmationTokenId?: string;
  creditsAmount: number;
};

export const usePurchase = () => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const { signAndBroadcast } = useMsgClient();
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const retryCsrfRequest = useRetryCsrfRequest();
  const { handleSuccess } = useMultiStep<BuyCreditsSchemaTypes>();
  const fetchLastRetirement = useFetchLastRetirement();

  const purchase = useCallback(
    async ({
      paymentOption,
      selectedSellOrders,
      retirementReason,
      country,
      stateProvince,
      postalCode,
      retiring,
      email,
      name,
      savePaymentMethod,
      createActiveAccount,
      paymentMethodId,
      stripe,
      elements,
      confirmationTokenId,
      creditsAmount,
    }: PurchaseParams) => {
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
                  const { error } = await stripe.confirmCardPayment(
                    clientSecret,
                    {
                      payment_method: paymentMethodId,
                    },
                  );
                  if (error) {
                    setErrorBannerTextAtom(String(error));
                    return;
                  }
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
                }

                const retirement = await fetchLastRetirement({
                  batchDenoms: selectedSellOrders.map(
                    sellOrder => sellOrder.batchDenom,
                  ),
                  retirementJurisdiction,
                  retirementReason,
                  creditsAmount,
                });
                if (retirement) {
                  setTxSuccessfulModalAtom(atom => {
                    atom.open = true;
                    // atom.cardItems = cardItems; // TODO
                    atom.title = _(PURCHASE_SUCCESSFUL);
                    atom.buttonTitle = _(VIEW_CERTIFICATE);
                    atom.onButtonClick = () =>
                      setTxSuccessfulModalAtom(
                        atom => void (atom.open = false),
                      );
                    atom.txHash = retirement.txHash;
                    atom.keepOpenOnLocationChange = true;
                  });
                  handleSuccess();
                  navigate(`/certificate/${retirement.nodeId}`);
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
              // In a follow up, we could to simulate tx.
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
              setProcessingModalAtom(atom => void (atom.open = false));

              // TODO https://regennetwork.atlassian.net/browse/APP-361
              // We need to display a custom success modal here
              // instead of the regular one
              setTxSuccessfulModalAtom(atom => {
                atom.open = true;
                // atom.cardItems = cardItems; // TODO
                atom.title = _(PURCHASE_SUCCESSFUL);
                atom.buttonTitle = retiring
                  ? _(VIEW_CERTIFICATE)
                  : _(VIEW_PORTFOLIO);
                atom.onButtonClick = () =>
                  setTxSuccessfulModalAtom(atom => void (atom.open = false));
                // atom.buttonLink = buttonLink;
                atom.txHash = deliverTxResponse?.transactionHash;
                atom.keepOpenOnLocationChange = true;
              });

              // Reload sell orders
              await reactQueryClient.invalidateQueries({
                queryKey: [SELL_ORDERS_EXTENTED_KEY],
              });

              // Reset BuyCredits forms
              handleSuccess();
            },
          },
        );
      }
    },
    [
      _,
      handleSuccess,
      reactQueryClient,
      retryCsrfRequest,
      setErrorBannerTextAtom,
      setErrorCodeAtom,
      setErrorModalAtom,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
      signAndBroadcast,
      token,
      wallet?.address,
    ],
  );
  return purchase;
};
