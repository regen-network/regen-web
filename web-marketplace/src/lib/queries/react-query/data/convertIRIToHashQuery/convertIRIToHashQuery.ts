import {
  ReactQueryIRIToHashProps,
  ReactQueryIRIToHashResponse,
} from './convertIRIToHashQuery.types';
import { convertIRIToHashQueryKey } from './convertIRIToHashQuery.utils';

export const convertIRIToHashQuery = ({
  client,
  request,
  ...params
}: ReactQueryIRIToHashProps): ReactQueryIRIToHashResponse => ({
  queryKey: convertIRIToHashQueryKey({
    iri: request.iri,
  }),
  queryFn: async () => {
    if (!client) return null;
    return await client.ConvertIRIToHash(request);
  },
  ...params,
});
