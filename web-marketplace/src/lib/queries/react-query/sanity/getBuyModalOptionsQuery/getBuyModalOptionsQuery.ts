import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllBuyModalOptionsDocument,
  AllBuyModalOptionsQuery,
} from 'generated/sanity-graphql';

import { SANITY_BUY_MODAL_OPTIONS_KEY } from './getBuyModalOptionsQuery.constants';
import {
  ReactQueryBuyModalOptionsQueryParams,
  ReactQueryBuyModalOptionsResponse,
} from './getBuyModalOptionsQuery.types';

export const getBuyModalOptionsQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryBuyModalOptionsQueryParams): ReactQueryBuyModalOptionsResponse => ({
  queryKey: [SANITY_BUY_MODAL_OPTIONS_KEY, languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllBuyModalOptionsQuery>({
      query: AllBuyModalOptionsDocument,
    });

    return {
      allBuyModalOptions: getLocalizedData({
        data: data.allBuyModalOptions,
        languageCode,
      }),
    };
  },
  ...params,
});
