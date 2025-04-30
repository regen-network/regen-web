import {
  BatchBalanceInfo,
  BatchInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { QueryClient } from 'ledger';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';

import { isOfCreditClass } from '../../../../../hooks/useEcocredits'; // or move this into a shared util
import { getEcocreditsQueryKey } from './getEcocreditsQuery.utils';

export interface GetEcocreditsQueryParams {
  address: string;
  paginationParams?: TablePaginationParams;
  creditClassId?: string;
  balances: BatchBalanceInfo[];
  batches: BatchInfo[];
  sanityCreditClassData: any;
  queryClient: QueryClient;
  selectedLanguage: string;
  initialCredits: BatchInfoWithBalance[];
}

export const getEcocreditsQuery = ({
  address,
  paginationParams,
  creditClassId,
  balances,
  batches,
  sanityCreditClassData,
  queryClient,
  selectedLanguage,
  initialCredits,
}: GetEcocreditsQueryParams) => ({
  queryKey: getEcocreditsQueryKey({ address, paginationParams, creditClassId }),
  queryFn: async () => {
    const filtered = balances.filter(isOfCreditClass(creditClassId));
    const newCredits = await getEcocreditsForAccount({
      address,
      paginationParams,
      loadedCredits: [],
      balances: filtered,
      batches,
      sanityCreditClassData,
      client: queryClient,
      selectedLanguage,
    });
    return newCredits ?? [];
  },
  enabled:
    !!address &&
    balances.length > 0 &&
    batches.length > 0 &&
    !!sanityCreditClassData &&
    !!queryClient,
  placeholderData: initialCredits,
  keepPreviousData: true,
});
