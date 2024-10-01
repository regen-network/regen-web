import { TebuBannerDocument, TebuBannerQuery } from 'generated/sanity-graphql';

import {
  ReactQueryTebuBannerQueryParams,
  ReactQueryTebuBannerQueryResponse,
} from './getTebuBannerQuery.types';

export const getTebuBannerQuery = ({
  sanityClient,
  ...params
}: ReactQueryTebuBannerQueryParams): ReactQueryTebuBannerQueryResponse => ({
  queryKey: ['tebuBannerQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<TebuBannerQuery>({
      query: TebuBannerDocument,
    });

    return data;
  },
  ...params,
});
