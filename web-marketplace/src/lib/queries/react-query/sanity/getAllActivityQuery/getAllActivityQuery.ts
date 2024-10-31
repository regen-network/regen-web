import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllProjectActivityDocument,
  AllProjectActivityQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllActivityQueryParams,
  ReactQueryAllActivityQueryResponse,
} from './getAllActivityQuery.types';

export const getAllActivityQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryAllActivityQueryParams): ReactQueryAllActivityQueryResponse => ({
  queryKey: ['allActivityQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectActivityQuery>({
      query: AllProjectActivityDocument,
    });

    return {
      allProjectActivity: getLocalizedData({
        data: data.allProjectActivity,
        languageCode,
      }),
    };
  },
  ...params,
});
