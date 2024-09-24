import { TebuBannerDocument, TebuBannerQuery } from 'generated/sanity-graphql';

import {
  ReactQueryAllActivityQueryParams,
  ReactQueryTebuBannerQueryResponse,
} from './getAllTebuBannerQuery.types';

export const getAllTebuBannerQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllActivityQueryParams): ReactQueryTebuBannerQueryResponse => ({
  queryKey: ['tebuBannerQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<TebuBannerQuery>({
      query: TebuBannerDocument,
    });

    return data;
  },
  ...params,
});
