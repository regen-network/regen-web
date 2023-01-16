import { useCallback } from 'react';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import type { UseStateSetter } from 'types/react/use-state';

import type { BasketTokens } from 'hooks/useBasketTokens';

type Props = {
  basketTokens: BasketTokens[];
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  setBasketTakeTokens: UseStateSetter<BasketTokens | undefined>;
};

type ReturnType = (rowIndex: number) => void;

const useOpenTakeModal = ({
  basketsWithClasses,
  basketTokens,
  setBasketTakeTokens,
}: Props): ReturnType => {
  const openTakeModal = useCallback(
    (rowIndex: number): void => {
      const selectedBasketDenom = basketTokens?.[rowIndex]?.basket?.basketDenom;

<<<<<<< HEAD
=======
      track<'takeFromBasket1', TakeFromBasket1>('takeFromBasket1', {
        basketName: basketTokens?.[rowIndex]?.basket?.name,
      });

>>>>>>> 0fae0f14 (feat: backet details page upgrades (#1725))
      const selectedBasketTokenWithClass = basketsWithClasses.find(
        bt => bt?.basket?.basketDenom === selectedBasketDenom,
      );

      if (selectedBasketTokenWithClass) {
        setBasketTakeTokens(basketTokens?.[rowIndex]);
      }
    },
    [basketTokens, basketsWithClasses, setBasketTakeTokens],
  );

  return openTakeModal;
};

export default useOpenTakeModal;
