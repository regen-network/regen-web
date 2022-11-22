import {
  DenomTraceWithHash,
  QueryDenomTraceByHashesParams,
} from 'lib/ibc/transfer/api';

export type ReactQueryDenomTraceByHashesProps =
  QueryDenomTraceByHashesParams & {
    enabled?: boolean;
  };

export type ReactQueryDenomTraceByHashesResponse = {
  queryKey: string[];
  queryFn: () => Promise<DenomTraceWithHash[] | void>;
  enabled: boolean;
  keepPreviousData: boolean;
  staleTime: number;
};
