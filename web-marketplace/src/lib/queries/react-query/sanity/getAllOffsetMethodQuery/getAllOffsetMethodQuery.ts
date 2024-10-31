import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryAllOffsetMethodQueryParams): ReactQueryAllOffsetMethodQueryResponse => ({
  queryKey: ['allOffsetMethodQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllOffsetMethodQuery>({
      query: AllOffsetMethodDocument,
    });

    return {
      allOffsetMethod: getLocalizedData({
        data: data.allOffsetMethod,
        languageCode,
      }),
    };
  },
  ...params,
});
