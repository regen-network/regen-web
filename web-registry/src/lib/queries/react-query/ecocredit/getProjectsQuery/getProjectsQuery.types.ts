import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { QueryProjectsProps } from 'lib/ecocredit/api';

export type ReactQueryProjectsProps = Omit<QueryProjectsProps, 'client'> & {
  client?: QueryProjectsProps['client'];
  enabled: boolean;
};

export type ReactQueryProjectsResponse = {
  queryKey: string[];
  queryFn: () => Promise<QueryProjectsResponse | void>;
  enabled: boolean;
  keepPreviousData: boolean;
  staleTime: number;
};
