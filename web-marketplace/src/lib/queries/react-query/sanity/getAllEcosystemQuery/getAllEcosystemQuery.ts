import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllProjectEcosystemDocument,
  AllProjectEcosystemQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllEcosystemQueryParams,
  ReactQueryAllEcosystemQueryResponse,
} from './getAllEcosystemQuery.types';

export const getAllEcosystemQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryAllEcosystemQueryParams): ReactQueryAllEcosystemQueryResponse => ({
  queryKey: ['allEcosystemQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectEcosystemQuery>({
      query: AllProjectEcosystemDocument,
    });

    return {
      allProjectEcosystem: getLocalizedData({
        data: data.allProjectEcosystem,
        languageCode,
      }),
    };
  },
  ...params,
});
