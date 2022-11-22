import { QueryProjectsByClassResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { QueryProjectsByClassProps } from 'lib/ecocredit/api';

export type ReactQueryProjectsByClassProps = Omit<
  QueryProjectsByClassProps,
  'client'
> & {
  client?: QueryProjectsByClassProps['client'];
  enabled: boolean;
};

export type ReactQueryProjectsByClassResponse = {
  queryKey: string[];
  queryFn: () => Promise<QueryProjectsByClassResponse | void>;
  enabled: boolean;
  keepPreviousData: boolean;
  staleTime: number;
};
