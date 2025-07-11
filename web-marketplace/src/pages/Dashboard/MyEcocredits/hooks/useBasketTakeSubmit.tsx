import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { BasketInfo } from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { MsgTake } from '@regen-network/api/regen/ecocredit/basket/v1/tx';

import type { MsgTakeValues } from 'web-components/src/components/form/BasketTakeForm';

import { takeEventToBatches } from 'lib/events/takeEventToBatches';
import {
  TakeFromBasket2,
  TakeFromBasketFailure,
  TakeFromBasketSuccess,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { TAKE_HEADER } from '../MyEcocredits.constants';
import { OnTxSuccessfulProps } from '../MyEcocredits.types';

type Props = {
  accountAddress?: string;
  baskets?: BasketInfo[];
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  onBroadcast: () => void;
  onErrorCallback?: (error?: Error) => void;
  onTxSuccessful: ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps) => void;
};

type Params = (values: MsgTakeValues) => Promise<void>;

const useBasketTakeSubmit = ({
  accountAddress,
  baskets,
  basketTakeTitle,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): Params => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const basketTakeSubmit = useCallback(
    async (values: MsgTakeValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const amount = values?.amount;
      const basket = baskets?.find(
        basketInfo => basketInfo.basketDenom === values.basketDenom,
      );

      track<TakeFromBasket2>('takeFromBasket2', {
        basketName: basket?.name,
        quantity: amount,
        retireOnTake: values.retireOnTake,
      });

      const msg = regen.ecocredit.basket.v1.MessageComposer.withTypeUrl.take({
        owner: accountAddress,
        basketDenom: values.basketDenom,
        amount,
        retireOnTake: values.retireOnTake || false,
        retirementJurisdiction: values.retirementJurisdiction || '',
        retirementReason: values?.retirementReason || '',
      } as MsgTake); // retirementLocation is set as required by MsgTake but deprecated (in favor of retirementJurisdiction)

      const tx = {
        msgs: [msg],
        fee: undefined,
      };

      const onError = (err?: Error): void => {
        track<TakeFromBasketFailure>('takeFromBasketFailure', {
          basketName: basket?.name,
          quantity: amount,
          retireOnTake: values.retireOnTake,
          errorMessage: err?.message,
        });
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (deliverTxResponse?: DeliverTxResponse): void => {
        const batchesFromTake = takeEventToBatches(deliverTxResponse!);
        track<TakeFromBasketSuccess>('takeFromBasketSuccess', {
          basketName: basket?.name,
          quantity: amount,
          retireOnTake: values.retireOnTake,
          batchDenoms: batchesFromTake?.map(value => value.name),
        });

        if (basket && amount) {
          const cardItems = [
            {
              label: 'basket',
              value: { name: basket.name },
            },
            {
              label: 'amount',
              value: { name: parseInt(amount) / Math.pow(10, basket.exponent) },
            },
          ];

          onTxSuccessful({
            cardItems,
            title: _(TAKE_HEADER),
            cardTitle: basketTakeTitle,
          });
        }
      };
      await signAndBroadcast(tx, () => onBroadcast(), {
        onError,
        onSuccess,
      });
    },
    [
      accountAddress,
      baskets,
      track,
      signAndBroadcast,
      onErrorCallback,
      onTxSuccessful,
      _,
      basketTakeTitle,
      onBroadcast,
    ],
  );

  return basketTakeSubmit;
};

export default useBasketTakeSubmit;
