import { keepPreviousData } from '@tanstack/react-query';

import { queryDenomByHashes } from 'lib/ibc/transfer/api';

import {
  ReactQueryAddDataToBatchResponse,
  ReactQueryDenomByHashesProps,
} from './getDenomByHashesQuery.types';

export const getDenomByHashesQuery = ({
  hashes,
  queryClient,
  ...params
}: ReactQueryDenomByHashesProps): ReactQueryAddDataToBatchResponse => ({
  // eslint-disable-next-line lingui/no-unlocalized-strings
  queryKey: ['DenomByHashes', hashes.join('-')],
  queryFn: async () => {
    return queryDenomByHashes({ hashes, queryClient });
  },
  placeholderData: keepPreviousData,
  ...params,
});
