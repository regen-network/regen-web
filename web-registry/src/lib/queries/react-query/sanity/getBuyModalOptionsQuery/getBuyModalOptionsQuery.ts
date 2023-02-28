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
  ...params
}: ReactQueryBuyModalOptionsQueryParams): ReactQueryBuyModalOptionsResponse => ({
  queryKey: [SANITY_BUY_MODAL_OPTIONS_KEY],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllBuyModalOptionsQuery>({
      query: AllBuyModalOptionsDocument,
    });

    return data;
  },
  ...params,
});
