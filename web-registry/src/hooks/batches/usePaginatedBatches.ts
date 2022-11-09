import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import useEcocreditQuery from 'hooks/useEcocreditQuery';

import { useBatchesWithSupply } from './useBatchesWithSupply';

const ROWS_PER_PAGE = 10;

export const usePaginatedBatches = (): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
} => {
  const { page: routePage } = useParams();
  const page = routePage ? Number(routePage) - 1 : 0;
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page,
      rowsPerPage: ROWS_PER_PAGE,
      offset: 0,
    });
  const batchesResponse = useEcocreditQuery<QueryBatchesResponse>({
    params: {},
    query: 'batches',
  });
  const batchesWithSupply = useBatchesWithSupply({
    batches: batchesResponse?.data?.batches,
    paginationParams,
  });

  return { batchesWithSupply, setPaginationParams, paginationParams };
};
