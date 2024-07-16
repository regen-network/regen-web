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
  ...params
}: ReactQueryAllHomePageQueryParams): ReactQueryAllHomePageQueryResponse => ({
  queryKey: ['allHomePageQuery'],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllHomePageQuery>({
        query: AllHomePageDocument,
      });

    return sanityCreditClassData;
  },
  ...params,
});
