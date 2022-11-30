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
    if (!client) return undefined;
    return await client.DenomMetadata(request);
  },
  ...params,
});
