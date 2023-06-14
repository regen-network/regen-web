import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { getAddDataToBatchesQuery } from 'lib/queries/react-query/ecocredit/getAddDataToBatchesQuery/getAddDataToBatchesQuery';
import { getBatchesByProjectQuery } from 'lib/queries/react-query/ecocredit/getBatchesByProjectQuery/getBatchesByProjectQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { client as sanityClient } from '../../lib/clients/sanity';

export const PAGINATED_BATCHES_BY_PROJECT_ROWS_PER_PAGE = 5;

type Params = { projectId: string };

export const usePaginatedBatchesByProject = ({
  projectId,
}: Params): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
} => {
  const { ecocreditClient, dataClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: PAGINATED_BATCHES_BY_PROJECT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { rowsPerPage, page } = paginationParams;

  const sanityCreditClassDataResult = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  /* Fetch current page batches */
  const batchesByProjectResult = useQuery(
    getBatchesByProjectQuery({
      client: ecocreditClient,
      request: {
        pagination: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          countTotal: true,
        },
        projectId,
      },
      keepPreviousData: true,
      enabled: !!ecocreditClient && !!projectId,
    }),
  );

  /* Fetch current page batches supplies */

  const batches = batchesByProjectResult.data?.batches;
  const batchesWithSupplyResult = useQuery(
    getAddDataToBatchesQuery({
      batches,
      sanityCreditClassData: sanityCreditClassDataResult.data,
      enabled: !!sanityCreditClassDataResult.data,
      reactQueryClient,
      dataClient,
    }),
  );

  /* Format hook returned variables */

  const batchesPagination = batchesByProjectResult.data?.pagination;
  const allBatchesCount = Number(batchesPagination?.total ?? 0);
  const batchesWithDefaultSupply: BatchInfoWithSupply[] | undefined =
    batches?.map(batch => ({
      ...batch,
      cancelledAmount: '',
      retiredAmount: '',
      tradableAmount: '',
    }));
  const batchesWithSupply = batchesWithSupplyResult.data;

  return {
    batchesWithSupply: batchesWithSupply ?? batchesWithDefaultSupply,
    setPaginationParams,
    paginationParams: { ...paginationParams, count: allBatchesCount },
  };
};
