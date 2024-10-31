import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllHomePageDocument,
  AllHomePageQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllHomePageQueryParams,
  ReactQueryAllHomePageQueryResponse,
} from './getAllHomePageQuery.types';

export const getAllHomePageQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryAllHomePageQueryParams): ReactQueryAllHomePageQueryResponse => ({
  queryKey: ['allHomePageQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllHomePageQuery>({
      query: AllHomePageDocument,
    });

    return {
      allHomePage: getLocalizedData({
        data: data.allHomePage,
        languageCode,
      }),
    };
  },
  ...params,
});
