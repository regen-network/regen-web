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
  ...params
}: ReactQueryAllActivityQueryParams): ReactQueryAllActivityQueryResponse => ({
  queryKey: ['allActivityQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectActivityQuery>({
      query: AllProjectActivityDocument,
    });

    return data;
  },
  ...params,
});
