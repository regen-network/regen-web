import { useCallback } from 'react';
import type { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import {
  PutInBasket2Event,
  PutInBasketFailureEvent,
  PutInBasketSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { BasketTokens } from 'hooks/useBasketTokens';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { PUT_HEADER } from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  baskets?: QueryBasketsResponse;
  basketPutOpen: number;
  basketPutTitle: string;
  credits: BatchInfoWithBalance[];
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setBasketPutOpen: UseStateSetter<number>;
  setBasketTakeTokens: UseStateSetter<BasketTokens | undefined>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

type ReturnType = (values: BasketPutFormValues) => Promise<void>;

const useBasketPutSubmit = ({
  accountAddress,
  baskets,
  basketPutOpen,
  basketPutTitle,
  credits,
  signAndBroadcast,
  setBasketPutOpen,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
}: Props): ReturnType => {
  const { track } = useTracker();

  const basketPutSubmit = useCallback(
    async (values: BasketPutFormValues): Promise<void> => {
      const amount = values.amount?.toString();
      const basket = baskets?.baskets.find(
        b => b.basketDenom === values.basketDenom,
      );

      track<'putInBasket2', PutInBasket2Event>('putInBasket2', {
        quantity: values.amount,
        basketName: basket?.name,
        batchDenom: credits[basketPutOpen].denom,
        creditClassId: credits[basketPutOpen].classId,
        projectId: credits[basketPutOpen].projectId,
      });

      const msg = MsgPut.fromPartial({
        basketDenom: values.basketDenom,
        owner: accountAddress,
        credits: [
          {
            batchDenom: credits[basketPutOpen].denom,
            amount,
          },
        ],
      });

      const onError = (err?: Error): void => {
        track<'putInBasketFailure', PutInBasketFailureEvent>(
          'putInBasketFailure',
          {
            quantity: values.amount,
            basketName: basket?.name,
            batchDenom: credits[basketPutOpen].denom,
            creditClassId: credits[basketPutOpen].classId,
            projectId: credits[basketPutOpen].projectId,
            errorMessage: err?.message,
          },
        );
      };
      const onSuccess = (): void => {
        track<'putInBasketSuccess', PutInBasketSuccessEvent>(
          'putInBasketSuccess',
          {
            quantity: values.amount,
            basketName: basket?.name,
            batchDenom: credits[basketPutOpen].denom,
            creditClassId: credits[basketPutOpen].classId,
            projectId: credits[basketPutOpen].projectId,
          },
        );
      };
      await signAndBroadcast({ msgs: [msg] }, () => setBasketPutOpen(-1), {
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
            label: 'project',
            value: {
              name:
                credits[basketPutOpen].projectName ||
                credits[basketPutOpen].projectId,
              url: `/project/${credits[basketPutOpen].projectId}`,
            },
          },
          {
            label: 'credit batch id',
            value: {
              name: credits[basketPutOpen].denom,
              url: `/credit-batches/${credits[basketPutOpen].denom}`,
            },
          },
          {
            label: 'amount',
            value: { name: amount },
          },
        ]);
        setTxModalHeader(PUT_HEADER);
        setTxModalTitle(basketPutTitle);
      }
    },
    [
      accountAddress,
      basketPutOpen,
      basketPutTitle,
      baskets?.baskets,
      credits,
      setBasketPutOpen,
      setCardItems,
      setTxModalHeader,
      setTxModalTitle,
      signAndBroadcast,
      track,
    ],
  );

  return basketPutSubmit;
};

export default useBasketPutSubmit;
