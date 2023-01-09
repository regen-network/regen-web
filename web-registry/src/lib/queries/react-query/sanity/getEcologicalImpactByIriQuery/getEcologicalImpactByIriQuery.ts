import {
  EcologicalImpactByIriDocument,
  EcologicalImpactByIriQuery,
} from 'generated/sanity-graphql';

import { getEcologicalImpactByIriKey } from './getEcologicalImpactByIriQuery.constants';
import {
  ReactQueryGetEcologicalImpactByIriQueryParams,
  ReactQueryGetEcologicalImpactByIriResponse,
} from './getEcologicalImpactByIriQuery.types';

export const getEcologicalImpactByIriQuery = ({
  sanityClient,
  iris,
  ...params
}: ReactQueryGetEcologicalImpactByIriQueryParams): ReactQueryGetEcologicalImpactByIriResponse => ({
  queryKey: getEcologicalImpactByIriKey(iris),
  queryFn: async () => {
    const { data: ecologicalImpactByIri } =
      await sanityClient.query<EcologicalImpactByIriQuery>({
        query: EcologicalImpactByIriDocument,
        variables: { iris },
      });

    return ecologicalImpactByIri;
  },
  ...params,
});
