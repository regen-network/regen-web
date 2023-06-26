import {
  AllProjectRatingDocument,
  AllProjectRatingQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllProjectRatingQueryParams,
  ReactQueryAllProjectRatingQueryResponse,
} from './getAllProjectRatingQuery.types';

export const getAllProjectRatingQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllProjectRatingQueryParams): ReactQueryAllProjectRatingQueryResponse => ({
  queryKey: ['allProjectRatingQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectRatingQuery>({
      query: AllProjectRatingDocument,
    });

    return data;
  },
  ...params,
});
