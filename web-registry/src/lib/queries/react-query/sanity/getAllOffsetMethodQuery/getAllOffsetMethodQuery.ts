import {
  AllOffsetMethodDocument,
  AllOffsetMethodQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllOffsetMethodQueryParams,
  ReactQueryAllOffsetMethodQueryResponse,
} from './getAllOffsetMethodQuery.types';

export const getAllOffsetMethodQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllOffsetMethodQueryParams): ReactQueryAllOffsetMethodQueryResponse => ({
  queryKey: ['allOffsetMethodQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllOffsetMethodQuery>({
      query: AllOffsetMethodDocument,
    });

    return data;
  },
  ...params,
});
