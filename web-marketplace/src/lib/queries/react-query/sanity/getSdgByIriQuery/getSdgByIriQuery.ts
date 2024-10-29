import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import { SdgByIriDocument, SdgByIriQuery } from 'generated/sanity-graphql';

import {
  ReactQuerySdgByIriQueryParams,
  ReactQuerySdgByIriQueryResponse,
} from './getSdgByIriQuery.types';

export const getSdgByIriQuery = ({
  sanityClient,
  iris,
  languageCode,
  ...params
}: ReactQuerySdgByIriQueryParams): ReactQuerySdgByIriQueryResponse => ({
  queryKey: ['sdgByIri', iris, languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<SdgByIriQuery>({
      query: SdgByIriDocument,
      variables: { iris },
    });

    return {
      allSdg: getLocalizedData({
        data: data.allSdg,
        languageCode,
      }),
    };
  },
  ...params,
});
