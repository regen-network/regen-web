import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllBuyFlowChooseCreditsCardDocument,
  AllBuyFlowChooseCreditsCardQuery,
} from 'generated/sanity-graphql';

import { SANITY_BUY_FLOW_CHOOSE_CREDITS_CARD_KEY } from './getBuyFlowChooseCreditsCardQuery.constants';
import {
  ReactQueryBuyFlowChooseCreditsCardQueryParams,
  ReactQueryBuyFlowChooseCreditsCardResponse,
} from './getBuyFlowChooseCreditsCardQuery.types';

export const getBuyFlowChooseCreditsCardQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryBuyFlowChooseCreditsCardQueryParams): ReactQueryBuyFlowChooseCreditsCardResponse => ({
  queryKey: [SANITY_BUY_FLOW_CHOOSE_CREDITS_CARD_KEY, languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllBuyFlowChooseCreditsCardQuery>(
      {
        query: AllBuyFlowChooseCreditsCardDocument,
      },
    );

    return {
      allBuyFlowChooseCreditsCard: getLocalizedData({
        data: data.allBuyFlowChooseCreditsCard,
        languageCode,
      }),
    };
  },
  ...params,
});
