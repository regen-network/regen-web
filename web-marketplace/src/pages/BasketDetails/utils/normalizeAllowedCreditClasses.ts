import { QueryClassResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { UseQueryResult } from '@tanstack/react-query';

export type AllowedCreditClasses = {
  id: string;
  name: string;
};

type Params = {
  basketClassResults?: UseQueryResult<QueryClassResponse | null>[];
  basketsMetadata?: UseQueryResult<any>[];
};

export const normalizeAllowedCreditClasses = ({
  basketClassResults,
  basketsMetadata,
}: Params): AllowedCreditClasses[] => {
  const basketClasses: AllowedCreditClasses[] = [];

  basketClassResults?.forEach((basketClassResult, index) => {
    const basketClass = basketClassResult.data?.class;
    const metadata = basketsMetadata?.[index]?.data;
    const basketClassName =
      metadata && !!basketClass?.id
        ? `${metadata['schema:name']} (${basketClass?.id})`
        : basketClass?.id;

    if (basketClass && metadata) {
      basketClasses.push({
        id: basketClass.id ?? '',
        name: basketClassName ?? '',
      });
    }
  });

  return basketClasses;
};
