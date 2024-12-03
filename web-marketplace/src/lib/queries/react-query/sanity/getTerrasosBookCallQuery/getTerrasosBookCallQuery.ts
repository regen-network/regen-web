import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  TerrasosBookCallDocument,
  TerrasosBookCallQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryTerrasosBookCallQueryParams,
  ReactQueryTerrasosBookCallQueryResponse,
} from './getTerrasosBookCallQuery.types';

export const getTerrasosBookCallQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryTerrasosBookCallQueryParams): ReactQueryTerrasosBookCallQueryResponse => ({
  queryKey: ['terrasosBookCallQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<TerrasosBookCallQuery>({
      query: TerrasosBookCallDocument,
    });
    return {
      allTerrasosBookCall: getLocalizedData({
        data: data.allTerrasosBookCall,
        languageCode,
      }),
    };
  },
  ...params,
});
