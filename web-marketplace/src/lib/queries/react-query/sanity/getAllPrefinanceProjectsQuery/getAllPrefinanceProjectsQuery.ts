/* eslint-disable lingui/no-unlocalized-strings */
import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryGetAllPrefinanceProjectsParams): ReactQueryGetAllPrefinanceProjectsResponse => ({
  queryKey: ['AllPrefinanceProjectQuery', languageCode],
  queryFn: async () => {
    const { data: sanityPrefinanceProjectData } =
      await sanityClient.query<AllPrefinanceProjectQuery>({
        query: AllPrefinanceProjectDocument,
      });

    return {
      allProject: getLocalizedData({
        data: sanityPrefinanceProjectData.allProject,
        languageCode,
      }),
    };
  },
  ...params,
});
