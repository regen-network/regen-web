import { SdgByIriDocument, SdgByIriQuery } from 'generated/sanity-graphql';

import {
  ReactQuerySdgByIriQueryParams,
  ReactQuerySdgByIriQueryResponse,
} from './getSdgByIriQuery.types';

export const getSdgByIriQuery = ({
  sanityClient,
  iris,
  ...params
}: ReactQuerySdgByIriQueryParams): ReactQuerySdgByIriQueryResponse => ({
  queryKey: ['sdgByIri', iris],
  queryFn: async () => {
    const { data } = await sanityClient.query<SdgByIriQuery>({
      query: SdgByIriDocument,
      variables: { iris },
    });

    return data;
  },
  ...params,
});
