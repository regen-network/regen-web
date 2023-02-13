import {
  AllSoldOutProjectsDocument,
  AllSoldOutProjectsQuery,
} from 'generated/sanity-graphql';

import { SANITY_SOLD_OUT_PROJECTS_KEY } from './getSoldOutProjectsQuery.constants';
import {
  ReactQueryGetSoldOutProjectsQueryParams,
  ReactQueryGetSoldOutProjectsResponse,
} from './getSoldOutProjectsQuery.types';

export const getSoldOutProjectsQuery = ({
  sanityClient,
  ...params
}: ReactQueryGetSoldOutProjectsQueryParams): ReactQueryGetSoldOutProjectsResponse => ({
  queryKey: [SANITY_SOLD_OUT_PROJECTS_KEY],
  queryFn: async () => {
    const { data: sanityProjectPageData } =
      await sanityClient.query<AllSoldOutProjectsQuery>({
        query: AllSoldOutProjectsDocument,
      });

    return sanityProjectPageData;
  },
  ...params,
});
