import { useEffect } from 'react';
<<<<<<< HEAD:web-registry/src/pages/MyEcocredits/hooks/useUpdateCreditBaskets.tsx
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { BatchInfoWithBalance } from '../../../types/ledger/ecocredit';
import { useStateSetter } from '../../../types/react/use-state';
=======
import type { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
>>>>>>> 92528156 (David/eslint simple import sort (#1075)):web-registry/src/pages/Dashboard/MyEcocredits/hooks/useUpdateCreditBaskets.tsx

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
        credits.map(c =>
          basketsWithClasses.filter(b => b?.classes.includes(c.class_id)),
        ),
      );
    }
  }, [credits, basketsWithClasses, setCreditBaskets]);
};

export default useUpdateCreditBaskets;
