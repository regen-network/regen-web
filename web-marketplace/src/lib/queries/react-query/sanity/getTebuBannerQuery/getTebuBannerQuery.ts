import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import { TebuBannerDocument, TebuBannerQuery } from 'generated/sanity-graphql';

import {
  ReactQueryTebuBannerQueryParams,
  ReactQueryTebuBannerQueryResponse,
} from './getTebuBannerQuery.types';

export const getTebuBannerQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryTebuBannerQueryParams): ReactQueryTebuBannerQueryResponse => ({
  queryKey: ['tebuBannerQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<TebuBannerQuery>({
      query: TebuBannerDocument,
    });

    return {
      allTebuBanner: getLocalizedData({
        data: data.allTebuBanner,
        languageCode,
      }),
    };
  },
  ...params,
});
