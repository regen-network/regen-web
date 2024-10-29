import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryAllProjectRatingQueryParams): ReactQueryAllProjectRatingQueryResponse => ({
  queryKey: ['allProjectRatingQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllProjectRatingQuery>({
      query: AllProjectRatingDocument,
    });

    return {
      allProjectRating: getLocalizedData({
        data: data.allProjectRating,
        languageCode,
      }),
    };
  },
  ...params,
});
