import { useEffect } from 'react';
import type { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';

type Props = {
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  credits: BatchInfoWithBalance[];
  setCreditBaskets: UseStateSetter<(QueryBasketResponse | undefined)[][]>;
};

type ReturnType = void;

const useUpdateCreditBaskets = ({
  basketsWithClasses,
  credits,
  setCreditBaskets,
}: Props): ReturnType => {
  useEffect(() => {
    // Get available baskets to put credits into
    if (credits && basketsWithClasses && basketsWithClasses.length > 0) {
      setCreditBaskets(
        credits.map(credit =>
          basketsWithClasses.filter(
            basket =>
              credit.classId && basket?.classes.includes(credit.classId),
          ),
        ),
      );
    }
  }, [credits, basketsWithClasses, setCreditBaskets]);
};

export default useUpdateCreditBaskets;
