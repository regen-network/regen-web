import {
  ReactQueryDenomMetadataProps,
  ReactQueryDenomMetadataResponse,
} from './getDenomMetadataQuery.types';

export const getBalanceQuery = ({
  client,
  request,
  ...params
}: ReactQueryDenomMetadataProps): ReactQueryDenomMetadataResponse => ({
  queryKey: ['denomMetadata'],
  queryFn: async () => {
    if (!client) return;
    return await client.DenomMetadata(request);
  },
  ...params,
});
