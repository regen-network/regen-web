import { useEffect } from 'react';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { BatchInfoWithBalance } from '../../../types/ledger/ecocredit';
import { useStateSetter } from '../../../types/react/use-state';

type Props = {
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  credits: BatchInfoWithBalance[];
  setCreditBaskets: useStateSetter<(QueryBasketResponse | undefined)[][]>;
};

type ReturnType = void;

const useUpdateCrediBaskets = ({
  basketsWithClasses,
  credits,
  setCreditBaskets,
}: Props): ReturnType => {
  useEffect(() => {
    // Get available baskets to put credits into
    if (basketsWithClasses && basketsWithClasses.length > 0) {
      setCreditBaskets(
        credits.map(c =>
          basketsWithClasses.filter(b => b?.classes.includes(c.class_id)),
        ),
      );
    }
  }, [credits, basketsWithClasses, setCreditBaskets]);
};

export default useUpdateCrediBaskets;
