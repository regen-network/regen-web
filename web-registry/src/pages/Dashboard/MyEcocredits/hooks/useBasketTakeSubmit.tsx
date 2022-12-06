import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgTake } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { MsgTakeValues } from 'web-components/lib/components/form/BasketTakeForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { UseStateSetter } from 'types/react/use-state';
import { takeEventToBatches } from 'lib/events/takeEventToBatches';
import {
  TakeFromBasket2,
  TakeFromBasketFailure,
  TakeFromBasketSuccess,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { BasketTokens } from 'hooks/useBasketTokens';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { TAKE_HEADER } from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  baskets?: QueryBasketsResponse;
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setBasketTakeTokens: UseStateSetter<BasketTokens | undefined>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

type ReturnType = (values: MsgTakeValues) => Promise<void>;

const useBasketTakeSubmit = ({
  accountAddress,
  baskets,
  basketTakeTitle,
  signAndBroadcast,
  setBasketTakeTokens,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
}: Props): ReturnType => {
  const { track } = useTracker();
  const basketTakeSubmit = useCallback(
    async (values: MsgTakeValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const amount = values?.amount;
      const basket = baskets?.basketsInfo?.find(
        basketInfo => basketInfo.basketDenom === values.basketDenom,
      );

      track<'takeFromBasket2', TakeFromBasket2>('takeFromBasket2', {
        basketName: basket?.name,
        quantity: amount,
        retireOnTake: values.retireOnTake,
      });

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
      };
      await signAndBroadcast(tx, () => setBasketTakeTokens(undefined), {
        onError,
        onSuccess,
      });

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
    },
    [
      accountAddress,
      basketTakeTitle,
      baskets?.basketsInfo,
      setBasketTakeTokens,
      setCardItems,
      setTxModalHeader,
      setTxModalTitle,
      signAndBroadcast,
      track,
    ],
  );

  return basketTakeSubmit;
};

export default useBasketTakeSubmit;
