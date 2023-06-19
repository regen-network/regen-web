import {
  AllProjectEcosystemDocument,
  AllProjectEcosystemQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllEcosystemQueryParams,
  ReactQueryAllEcosystemQueryResponse,
} from './getAllEcosystemQuery.types';

export const getAllBasketDetailsPageQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllEcosystemQueryParams): ReactQueryAllEcosystemQueryResponse => ({
  queryKey: ['allEcosystemQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectEcosystemQuery>({
      query: AllProjectEcosystemDocument,
    });

    return data;
  },
  ...params,
});
