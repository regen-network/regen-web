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
  ...params
}: ReactQueryBuyModalQueryParams): ReactQueryBuyModalResponse => ({
  queryKey: [SANITY_BUY_MODAL_KEY],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllBuyModalQuery>({
      query: AllBuyModalDocument,
    });

    return data;
  },
  ...params,
});
