import { useCallback } from 'react';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import type { UseStateSetter } from 'types/react/use-state';
import { TakeFromBasket1 } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { BasketTokens } from 'hooks/useBasketTokens';

type Props = {
  basketTokens: BasketTokens[];
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  setBasketTakeTokens: UseStateSetter<BasketTokens | undefined>;
};

<<<<<<< HEAD
type ReturnType = (rowIndex: number) => void;
=======
type Return = (rowIndex: number) => void;
>>>>>>> edb3ddf3 (feat: project non-queryable metadata (#1701))

const useOpenTakeModal = ({
  basketsWithClasses,
  basketTokens,
  setBasketTakeTokens,
<<<<<<< HEAD
}: Props): ReturnType => {
=======
}: Props): Return => {
>>>>>>> edb3ddf3 (feat: project non-queryable metadata (#1701))
  const { track } = useTracker();
  const openTakeModal = useCallback(
    (rowIndex: number): void => {
      const selectedBasketDenom = basketTokens?.[rowIndex]?.basket?.basketDenom;

      track<'takeFromBasket1', TakeFromBasket1>('takeFromBasket1', {
        basketName: basketTokens?.[rowIndex]?.basket?.name,
      });

      const selectedBasketTokenWithClass = basketsWithClasses.find(
        bt => bt?.basket?.basketDenom === selectedBasketDenom,
      );

      if (selectedBasketTokenWithClass) {
        setBasketTakeTokens(basketTokens?.[rowIndex]);
      }
    },
    [basketTokens, basketsWithClasses, setBasketTakeTokens, track],
  );

  return openTakeModal;
};

export default useOpenTakeModal;
