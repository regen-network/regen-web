import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { useLingui } from '@lingui/react';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';

import { getJurisdictionIsoCode } from 'web-components/src/utils/locationStandard';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { useMsgClient } from 'hooks';

import { PAYMENT_OPTIONS, VIEW_CERTIFICATE } from '../BuyCredits.constants';
import { PaymentOptionsType } from '../BuyCredits.types';

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
};
export const usePurchase = () => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signAndBroadcast } = useMsgClient();
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);

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
    }: PurchaseParams) => {
      if (paymentOption === PAYMENT_OPTIONS.CARD) {
        // 1. Create payment intent
        // 2. Confirm payment
      } else {
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
              gas: '210000',
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
            },
          },
        );
      }
    },
    [
      _,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
      signAndBroadcast,
      wallet?.address,
    ],
  );
  return purchase;
};
