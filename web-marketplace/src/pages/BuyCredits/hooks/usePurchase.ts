import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  txBuySuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { useWallet } from 'lib/wallet/wallet';

import { VIEW_PORTFOLIO } from 'components/organisms/BasketOverview/BasketOverview.constants';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useMsgClient } from 'hooks';

import { PAYMENT_OPTIONS, VIEW_CERTIFICATE } from '../BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from '../BuyCredits.types';
import { getSteps } from '../BuyCredits.utils';
import { useFetchRetirementForPurchase } from './useFetchRetirementForPurchase';

type PurchaseParams = {
  selectedSellOrders: ChooseCreditsFormSchemaType['sellOrders'];
  retirementReason?: string;
  country?: string;
  stateProvince?: string;
  postalCode?: string;
  retiring: boolean;
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

export const usePurchase = ({
  paymentOption,
  retiring,
}: {
  paymentOption: PaymentOptionsType;
  retiring: boolean;
}) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const { signAndBroadcast } = useMsgClient();
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

  useFetchRetirementForPurchase({
    paymentIntentId,
    txHash,
    paymentOption,
    retiring,
  });

  const purchase = useCallback(
    async ({
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
              setProcessingModalAtom(atom => void (atom.open = false));
              setTxHash(deliverTxResponse?.transactionHash);

              // In case of retirement, it's handled in useFetchRetirementForPurchase
              if (!retiring) {
                setTxBuySuccessfulModalAtom(atom => {
                  atom.open = true;
                  // atom.cardItems = cardItems; // TODO
                  atom.buttonTitle = retiring
                    ? _(VIEW_CERTIFICATE)
                    : _(VIEW_PORTFOLIO);
                  atom.onButtonClick = () =>
                    setTxBuySuccessfulModalAtom(
                      atom => void (atom.open = false),
                    );
                  atom.txHash = deliverTxResponse?.transactionHash;
                  atom.steps = getSteps(paymentOption, retiring);
                });

                await reactQueryClient.invalidateQueries({
                  queryKey: [SELL_ORDERS_EXTENTED_KEY],
                });

                // Reset BuyCredits forms
                handleSuccess();
                navigate(`/profile/portfolio`);
              }
            },
          },
        );
      }
    },
    [
      _,
      handleSuccess,
      navigate,
      paymentOption,
      reactQueryClient,
      retryCsrfRequest,
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
