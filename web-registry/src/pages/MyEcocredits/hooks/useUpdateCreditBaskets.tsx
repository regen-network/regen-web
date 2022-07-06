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

const useUpdateCreditBaskets = ({
  basketsWithClasses,
  credits,
  setCreditBaskets,
}: Props): ReturnType => {
  useEffect(() => {
    // Get available baskets to put credits into
    if (basketsWithClasses && basketsWithClasses.length > 0) {
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
