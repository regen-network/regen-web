import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllProjectsPageDocument,
  AllProjectsPageQuery,
} from 'generated/sanity-graphql';

import { SANITY_ALL_PROJECTS_PAGE_KEY } from './getAllProjectsPageQuery.constants';
import {
  ReactQueryGetAllProjectsPageQueryParams,
  ReactQueryGetAllProjectsPageResponse,
} from './getAllProjectsPageQuery.types';

export const getAllProjectsPageQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryGetAllProjectsPageQueryParams): ReactQueryGetAllProjectsPageResponse => ({
  queryKey: [SANITY_ALL_PROJECTS_PAGE_KEY, languageCode],
  queryFn: async () => {
    const { data: sanityProjectPageData } =
      await sanityClient.query<AllProjectsPageQuery>({
        query: AllProjectsPageDocument,
      });

    return {
      allProjectsPage: getLocalizedData({
        data: sanityProjectPageData.allProjectsPage,
        languageCode,
      }),
    };
  },
  ...params,
});
