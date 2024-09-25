import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
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

import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useMsgClient } from 'hooks';

import { PAYMENT_OPTIONS, VIEW_CERTIFICATE } from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';

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
};

export const usePurchase = () => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
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
    }: PurchaseParams) => {
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
                      return_url: window.location.origin, // TODO APP-361 redirect to certificate with success modal, this return_url might be used when using 3DS
                    },
                  );
                  if (error) {
                    setErrorBannerTextAtom(String(error));
                  }
                  handleSuccess();
                } else {
                  // or new credit card
                  const { error } = await stripe.confirmPayment({
                    clientSecret,
                    confirmParams: {
                      confirmation_token: confirmationTokenId,
                      return_url: window.location.origin, // TODO APP-361 redirect to certificate with success modal
                      // return_url comes with following url params: payment_intent (id), payment_intent_client_secret and redirect_status
                      // on this return_url, we need to getGetTxsEventQuery + show success modal
                    },
                  });
                  if (error) {
                    // This point is only reached if there's an immediate error when
                    // confirming the payment. Show the error to your customer (for example, payment details incomplete)
                    setErrorBannerTextAtom(String(error.message));
                  }
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
            retirementJurisdiction:
              retiring && country
                ? getJurisdictionIsoCode({
                    country,
                    stateProvince,
                    postalCode,
                  })
                : '',
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
                // atom.title = _(POST_CREATED);
                atom.buttonTitle = _(VIEW_CERTIFICATE);
                // atom.buttonLink = buttonLink;
                atom.txHash = deliverTxResponse?.transactionHash;
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
