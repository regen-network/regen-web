import { useState } from 'react';
import { QueryBatchesByProjectResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import {
  DEFAULT_ROWS_PER_PAGE,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import useEcocreditQuery from 'hooks/useEcocreditQuery';

import { useBatchesWithSupply } from './useBatchesWithSupply';

type Props = { projectId?: string };

export const usePaginatedBatchesByProject = ({
  projectId,
}: Props): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
} => {
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const batchesResponse = useEcocreditQuery<QueryBatchesByProjectResponse>({
    params: { projectId },
    query: 'batchesByProject',
  });
  const batchesWithSupply = useBatchesWithSupply({
    batches: batchesResponse?.data?.batches,
    paginationParams,
  });

  return { batchesWithSupply, setPaginationParams };
};
