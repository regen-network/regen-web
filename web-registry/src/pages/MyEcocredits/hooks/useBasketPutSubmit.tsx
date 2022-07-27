<<<<<<< HEAD:web-registry/src/pages/MyEcocredits/hooks/useBasketPutSubmit.tsx
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { useCallback } from 'react';
import { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { BasketTokens } from '../../../hooks/useBasketTokens';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import { BatchInfoWithBalance } from '../../../types/ledger/ecocredit';
import { useStateSetter } from '../../../types/react/use-state';
=======
import { useCallback } from 'react';
import type { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
>>>>>>> 92528156 (David/eslint simple import sort (#1075)):web-registry/src/pages/Dashboard/MyEcocredits/hooks/useBasketPutSubmit.tsx

import type { BasketTokens } from 'hooks/useBasketTokens';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

type Props = {
  accountAddress?: string;
  baskets?: QueryBasketsResponse;
  basketPutOpen: number;
  basketPutTitle: string;
  credits: BatchInfoWithBalance[];
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setBasketPutOpen: useStateSetter<number>;
  setBasketTakeTokens: useStateSetter<BasketTokens | undefined>;
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string | undefined>;
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
  setTxModalTitle,
}: Props): ReturnType => {
  const basketPutSubmit = useCallback(
    async (values: BasketPutFormValues): Promise<void> => {
      const amount = values.amount?.toString();
      const msg = MsgPut.fromPartial({
        basketDenom: values.basketDenom,
        owner: accountAddress,
        credits: [
          {
            batchDenom: credits[basketPutOpen].batch_denom,
            amount,
          },
        ],
      });
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
            label: 'amount',
            value: { name: amount },
          },
        ]);
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
      setTxModalTitle,
      signAndBroadcast,
    ],
  );

  return basketPutSubmit;
};

export default useBasketPutSubmit;
