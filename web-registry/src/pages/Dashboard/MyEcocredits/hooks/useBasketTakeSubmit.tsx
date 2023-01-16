import { useCallback } from 'react';
<<<<<<< HEAD
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
=======
import { DeliverTxResponse } from '@cosmjs/stargate';
import { BasketInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))
import { MsgTake } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { MsgTakeValues } from 'web-components/lib/components/form/BasketTakeForm';

<<<<<<< HEAD
import type { UseStateSetter } from 'types/react/use-state';
=======
import { takeEventToBatches } from 'lib/events/takeEventToBatches';
import {
  TakeFromBasket2,
  TakeFromBasketFailure,
  TakeFromBasketSuccess,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))

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

type ReturnType = (values: MsgTakeValues) => Promise<void>;

const useBasketTakeSubmit = ({
  accountAddress,
  baskets,
  basketTakeTitle,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): ReturnType => {
  const basketTakeSubmit = useCallback(
    async (values: MsgTakeValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const amount = values?.amount;
      const basket = baskets?.find(
        basketInfo => basketInfo.basketDenom === values.basketDenom,
      );

      const msg = MsgTake.fromPartial({
        owner: accountAddress,
        basketDenom: values.basketDenom,
        amount,
        retireOnTake: values.retireOnTake || false,
        retirementJurisdiction: values.retirementJurisdiction,
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: values?.retirementNote,
      };

<<<<<<< HEAD
      await signAndBroadcast(tx, () => setBasketTakeTokens(undefined));

      if (basket && amount) {
        setCardItems([
          {
            label: 'basket',
            value: { name: basket.name },
          },
          {
            label: 'amount',
            value: { name: parseInt(amount) / Math.pow(10, basket.exponent) },
          },
        ]);
        setTxModalHeader(TAKE_HEADER);
        setTxModalTitle(basketTakeTitle);
      }
=======
      const onError = (err?: Error): void => {
        track<'takeFromBasketFailure', TakeFromBasketFailure>(
          'takeFromBasketFailure',
          {
            basketName: basket?.name,
            quantity: amount,
            retireOnTake: values.retireOnTake,
            errorMessage: err?.message,
          },
        );
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (deliverTxResponse?: DeliverTxResponse): void => {
        const batchesFromTake = takeEventToBatches(deliverTxResponse!);
        track<'takeFromBasketSuccess', TakeFromBasketSuccess>(
          'takeFromBasketSuccess',
          {
            basketName: basket?.name,
            quantity: amount,
            retireOnTake: values.retireOnTake,
            batchDenoms: batchesFromTake?.map(value => value.name),
          },
        );

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
            title: TAKE_HEADER,
            cardTitle: basketTakeTitle,
          });
        }
      };
      await signAndBroadcast(tx, () => onBroadcast(), {
        onError,
        onSuccess,
      });
>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))
    },
    [
      accountAddress,
      basketTakeTitle,
      signAndBroadcast,
<<<<<<< HEAD
=======
      onTxSuccessful,
      track,
      baskets,
      onBroadcast,
      onErrorCallback,
>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))
    ],
  );

  return basketTakeSubmit;
};

export default useBasketTakeSubmit;
