/* eslint-disable lingui/no-unlocalized-strings */
import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllProjectsDocument,
  AllProjectsQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryGetAllProjectsParams,
  ReactQueryGetAllProjectsResponse,
} from './getAllProjectsQuery.types';

export const getAllSanityProjectsQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryGetAllProjectsParams): ReactQueryGetAllProjectsResponse => ({
  queryKey: ['AllSanityProjectQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectsQuery>({
      query: AllProjectsDocument,
    });

    return {
      allProject: getLocalizedData({
        data: data.allProject,
        languageCode,
      }),
    };
  },
  ...params,
});
