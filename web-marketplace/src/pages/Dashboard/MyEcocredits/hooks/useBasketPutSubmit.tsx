import { useCallback } from 'react';
import type { BasketInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { FormValues as BasketPutFormValues } from 'web-components/src/components/form/BasketPutForm/BasketPutForm';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import {
  PutInBasket2Event,
  PutInBasketFailureEvent,
  PutInBasketSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { PUT_HEADER } from '../MyEcocredits.constants';
import { OnTxSuccessfulProps } from '../MyEcocredits.types';

type Props = {
  accountAddress?: string;
  baskets?: BasketInfo[];
  basketPutTitle: string;
  credit: BatchInfoWithBalance;
  signAndBroadcast: SignAndBroadcastType;
  onBroadcast: () => void;
  onErrorCallback?: (error?: Error) => void;
  onTxSuccessful: ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps) => void;
};

type Return = (values: BasketPutFormValues) => Promise<void>;

const useBasketPutSubmit = ({
  accountAddress,
  baskets,
  basketPutTitle,
  credit,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): Return => {
  const { track } = useTracker();

  const basketPutSubmit = useCallback(
    async (values: BasketPutFormValues): Promise<void> => {
      const amount = values.amount?.toString();
      const basket = baskets?.find(
        basketInfo => basketInfo.basketDenom === values.basketDenom,
      );

      track<'putInBasket2', PutInBasket2Event>('putInBasket2', {
        quantity: values.amount,
        basketName: basket?.name,
        batchDenom: credit.denom,
        creditClassId: credit.classId,
        projectId: credit.projectId,
      });

      const msg = MsgPut.fromPartial({
        basketDenom: values.basketDenom,
        owner: accountAddress,
        credits: [
          {
            batchDenom: credit.denom,
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
            batchDenom: credit.denom,
            creditClassId: credit.classId,
            projectId: credit.projectId,
            errorMessage: err?.message,
          },
        );
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (): void => {
        track<'putInBasketSuccess', PutInBasketSuccessEvent>(
          'putInBasketSuccess',
          {
            quantity: values.amount,
            basketName: basket?.name,
            batchDenom: credit.denom,
            creditClassId: credit.classId,
            projectId: credit.projectId,
          },
        );

        if (basket && amount) {
          const cardItems = [
            {
              label: 'basket',
              value: { name: basket.name },
            },
            {
              label: 'project',
              value: {
                name: credit.projectName || credit.projectId,
                url: `/project/${credit.projectId}`,
              },
            },
            {
              label: 'credit batch id',
              value: {
                name: credit.denom,
                url: `/credit-batches/${credit.denom}`,
              },
            },
            {
              label: 'amount',
              value: { name: amount },
            },
          ];

          onTxSuccessful({
            cardItems,
            title: PUT_HEADER,
            cardTitle: basketPutTitle,
          });
        }
      };
      await signAndBroadcast({ msgs: [msg] }, () => onBroadcast(), {
        onError,
        onSuccess,
      });
    },
    [
      accountAddress,
      basketPutTitle,
      baskets,
      credit,
      onBroadcast,
      onTxSuccessful,
      onErrorCallback,
      signAndBroadcast,
      track,
    ],
  );

  return basketPutSubmit;
};

export default useBasketPutSubmit;
