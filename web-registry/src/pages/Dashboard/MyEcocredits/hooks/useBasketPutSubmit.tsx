import { useCallback } from 'react';
import type { BasketInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm/BasketPutForm';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
<<<<<<< HEAD
import type { UseStateSetter } from 'types/react/use-state';
=======
import {
  PutInBasket2Event,
  PutInBasketFailureEvent,
  PutInBasketSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))

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

type ReturnType = (values: BasketPutFormValues) => Promise<void>;

const useBasketPutSubmit = ({
  accountAddress,
  baskets,
  basketPutTitle,
  credit,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): ReturnType => {
  const basketPutSubmit = useCallback(
    async (values: BasketPutFormValues): Promise<void> => {
      const amount = values.amount?.toString();
<<<<<<< HEAD
=======
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

>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))
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
<<<<<<< HEAD
      await signAndBroadcast({ msgs: [msg] }, () => setBasketPutOpen(-1));
      const basket = baskets?.baskets.find(
        b => b.basketDenom === values.basketDenom,
      );
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
=======

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
>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))
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
    ],
  );

  return basketPutSubmit;
};

export default useBasketPutSubmit;
