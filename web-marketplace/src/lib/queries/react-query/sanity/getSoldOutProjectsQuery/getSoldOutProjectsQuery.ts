import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryGetSoldOutProjectsQueryParams): ReactQueryGetSoldOutProjectsResponse => ({
  queryKey: [SANITY_SOLD_OUT_PROJECTS_KEY, languageCode],
  queryFn: async () => {
    const { data: sanityProjectPageData } =
      await sanityClient.query<AllSoldOutProjectsQuery>({
        query: AllSoldOutProjectsDocument,
      });

    return {
      allSoldOutProjects: getLocalizedData({
        data: sanityProjectPageData.allSoldOutProjects,
        languageCode,
      }),
    };
  },
  ...params,
});
