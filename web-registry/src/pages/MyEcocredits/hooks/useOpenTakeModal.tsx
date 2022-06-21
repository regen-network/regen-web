import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { useCallback } from 'react';
import { BasketTokens } from '../../../hooks/useBasketTokens';
import { useStateSetter } from '../../../types/react/use-state';

type Props = {
  basketTokens: BasketTokens[];
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  setBasketTakeTokens: useStateSetter<BasketTokens | undefined>;
};

type ReturnType = (rowIndex: number) => void;

const useOpenTakeModal = ({
  basketsWithClasses,
  basketTokens,
  setBasketTakeTokens,
}: Props): ReturnType => {
  const openTakeModal = useCallback(
    (rowIndex: number): void => {
      const selectedBasketDenom =
        basketsWithClasses?.[rowIndex]?.basket?.basketDenom;
      if (selectedBasketDenom) {
        const selectedBasketTokens = basketTokens.find(
          bt => bt.basket.basketDenom === selectedBasketDenom,
        );
        setBasketTakeTokens(selectedBasketTokens);
      }
    },
    [basketTokens, basketsWithClasses, setBasketTakeTokens],
  );

  return openTakeModal;
};

export default useOpenTakeModal;
