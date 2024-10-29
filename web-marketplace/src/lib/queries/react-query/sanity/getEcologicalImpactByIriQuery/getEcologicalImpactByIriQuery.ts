import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryGetEcologicalImpactByIriQueryParams): ReactQueryGetEcologicalImpactByIriResponse => ({
  queryKey: [getEcologicalImpactByIriKey(iris), languageCode],
  queryFn: async () => {
    const { data: ecologicalImpactByIri } =
      await sanityClient.query<EcologicalImpactByIriQuery>({
        query: EcologicalImpactByIriDocument,
        variables: { iris },
      });

    return {
      allEcologicalImpact: getLocalizedData({
        data: ecologicalImpactByIri.allEcologicalImpact,
        languageCode,
      }),
    };
  },
  ...params,
});
