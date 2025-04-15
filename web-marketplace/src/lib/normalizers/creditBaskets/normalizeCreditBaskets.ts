import type { QueryBasketResponse } from '@regen-network/api/regen/ecocredit/basket/v1/query';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';

type Props = {
  basketsWithClasses?: (QueryBasketResponse | undefined)[];
  credits: BatchInfoWithBalance[];
};

type Response = (QueryBasketResponse | undefined)[][];

const normalizeCreditBaskets = ({
  basketsWithClasses,
  credits,
}: Props): Response => {
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

export default normalizeCreditBaskets;
