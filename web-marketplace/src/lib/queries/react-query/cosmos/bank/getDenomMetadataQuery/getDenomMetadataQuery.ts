import {
  ReactQueryDenomMetadataProps,
  ReactQueryDenomMetadataResponse,
} from './getDenomMetadataQuery.types';

export const getDenomMetadataQuery = ({
  client,
  request,
  ...params
}: ReactQueryDenomMetadataProps): ReactQueryDenomMetadataResponse => ({
  queryKey: ['denomMetadata', request.denom],
  queryFn: async () => {
    if (!client || !request.denom) return null;
    return await client.cosmos.bank.v1beta1.denomMetadata(request);
  },
  ...params,
});
