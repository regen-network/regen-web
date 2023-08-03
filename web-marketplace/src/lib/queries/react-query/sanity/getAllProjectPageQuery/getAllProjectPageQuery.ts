import {
  AllProjectPageDocument,
  AllProjectPageQuery,
} from 'generated/sanity-graphql';

import { SANITY_ALL_PROJECT_PAGE_KEY } from './getAllProjectPageQuery.constants';
import {
  ReactQueryGetAllProjectPageQueryParams,
  ReactQueryGetAllProjectPageResponse,
} from './getAllProjectPageQuery.types';

export const getAllProjectPageQuery = ({
  sanityClient,
  ...params
}: ReactQueryGetAllProjectPageQueryParams): ReactQueryGetAllProjectPageResponse => ({
  queryKey: [SANITY_ALL_PROJECT_PAGE_KEY],
  queryFn: async () => {
    const { data: sanityProjectPageData } =
      await sanityClient.query<AllProjectPageQuery>({
        query: AllProjectPageDocument,
      });

    return sanityProjectPageData;
  },
  ...params,
});
