import {
  AllPrefinanceProjectDocument,
  AllPrefinanceProjectQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryGetAllPrefinanceProjectsParams,
  ReactQueryGetAllPrefinanceProjectsResponse,
} from './getAllPrefinanceProjectsQuery.types';

export const getAllSanityPrefinanceProjectsQuery = ({
  sanityClient,
  ...params
}: ReactQueryGetAllPrefinanceProjectsParams): ReactQueryGetAllPrefinanceProjectsResponse => ({
  queryKey: ['AllPrefinanceProjectQuery'],
  queryFn: async () => {
    const { data: sanityPrefinanceProjectData } =
      await sanityClient.query<AllPrefinanceProjectQuery>({
        query: AllPrefinanceProjectDocument,
      });

    return sanityPrefinanceProjectData;
  },
  ...params,
});
