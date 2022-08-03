import { useEffect } from 'react';
<<<<<<< HEAD:web-registry/src/pages/Dashboard/MyEcocredits/hooks/useUpdateCreditBaskets.tsx
import type { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

=======

import type { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
>>>>>>> v4:web-registry/src/pages/MyEcocredits/hooks/useUpdateCreditBaskets.tsx
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
