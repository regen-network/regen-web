import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryGetAllProjectPageQueryParams): ReactQueryGetAllProjectPageResponse => ({
  queryKey: [SANITY_ALL_PROJECT_PAGE_KEY, languageCode],
  queryFn: async () => {
    const { data: sanityProjectPageData } =
      await sanityClient.query<AllProjectPageQuery>({
        query: AllProjectPageDocument,
      });

    return {
      allProjectPage: getLocalizedData({
        data: sanityProjectPageData.allProjectPage,
        languageCode,
      }),
    };
  },
  ...params,
});
