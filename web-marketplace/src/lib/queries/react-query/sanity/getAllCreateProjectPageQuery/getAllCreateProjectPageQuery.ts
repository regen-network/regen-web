import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllCreateProjectPageDocument,
  AllCreateProjectPageQuery,
} from 'generated/sanity-graphql';

import { SANITY_ALL_CREATE_PROJECT_PAGE_KEY } from './getAllCreateProjectPageQuery.constants';
import {
  ReactQueryGetAllCreateProjectPageQueryParams,
  ReactQueryGetAllCreateProjectPageResponse,
} from './getAllCreateProjectPageQuery.types';

export const getAllCreateProjectPageQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryGetAllCreateProjectPageQueryParams): ReactQueryGetAllCreateProjectPageResponse => ({
  queryKey: [SANITY_ALL_CREATE_PROJECT_PAGE_KEY, languageCode],
  queryFn: async () => {
    const { data: sanityCreateProjectPageData } =
      await sanityClient.query<AllCreateProjectPageQuery>({
        query: AllCreateProjectPageDocument,
      });

    return {
      allCreateProjectPage: getLocalizedData({
        data: sanityCreateProjectPageData.allCreateProjectPage,
        languageCode,
      }),
    };
  },
  ...params,
});
