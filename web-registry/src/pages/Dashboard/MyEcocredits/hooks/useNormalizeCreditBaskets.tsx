import type { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';

type Props = {
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  credits: BatchInfoWithBalance[];
};

type ReturnType = (QueryBasketResponse | undefined)[][];

const useNormalizeCreditBaskets = ({
  basketsWithClasses,
  credits,
}: Props): ReturnType => {
  // Get available baskets to put credits into
  if (credits && basketsWithClasses && basketsWithClasses.length > 0) {
    return credits.map(credit =>
      basketsWithClasses.filter(
        basket => credit.classId && basket?.classes.includes(credit.classId),
      ),
    );
  }

  return [];
};

export default useNormalizeCreditBaskets;
