import {
  AllProfilePageDocument,
  AllProfilePageQuery,
} from 'generated/sanity-graphql';

import { SANITY_ALL_PROFILE_PAGE_KEY } from './getAllProfilePageQuery.constants';
import {
  ReactQueryGetAllProfilePageQueryParams,
  ReactQueryGetAllProfilePageResponse,
} from './getAllProfilePageQuery.types';

export const getAllProfilePageQuery = ({
  sanityClient,
  ...params
}: ReactQueryGetAllProfilePageQueryParams): ReactQueryGetAllProfilePageResponse => ({
  queryKey: [SANITY_ALL_PROFILE_PAGE_KEY],
  queryFn: async () => {
    const { data: sanityProfilePageData } =
      await sanityClient.query<AllProfilePageQuery>({
        query: AllProfilePageDocument,
      });

    return sanityProfilePageData;
  },
  ...params,
});
