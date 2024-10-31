import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllBuyModalDocument,
  AllBuyModalQuery,
} from 'generated/sanity-graphql';

import { SANITY_BUY_MODAL_KEY } from './getBuyModalQuery.constants';
import {
  ReactQueryBuyModalQueryParams,
  ReactQueryBuyModalResponse,
} from './getBuyModalQuery.types';

export const getBuyModalQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryBuyModalQueryParams): ReactQueryBuyModalResponse => ({
  queryKey: [SANITY_BUY_MODAL_KEY, languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllBuyModalQuery>({
      query: AllBuyModalDocument,
    });

    return {
      allBuyModal: getLocalizedData({
        data: data.allBuyModal,
        languageCode,
      }),
    };
  },
  ...params,
});
