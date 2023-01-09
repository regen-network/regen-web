import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { getAddDataToBatchesQuery } from 'lib/queries/react-query/ecocredit/getAddDataToBatchesQuery/getAddDataToBatchesQuery';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { client as sanityClient } from '../../lib/clients/sanity';

export const PAGINATED_BATCHES_ROWS_PER_PAGE = 10;

export const usePaginatedBatches = (): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
} => {
  const { ecocreditClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { page: routePage } = useParams();
  // Page index starts at 1 for route
  // Page index starts at 0 for MUI Table
  const page = Number(routePage) - 1;
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page,
      rowsPerPage: PAGINATED_BATCHES_ROWS_PER_PAGE,
      offset: 0,
    });
  const { rowsPerPage } = paginationParams;

  const sanityCreditClassDataResult = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  /* Fetch current page batches */
  const batchesResult = useQuery(
    getBatchesQuery({
      client: ecocreditClient,
      request: {
        pagination: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          countTotal: true,
        },
      },
      enabled: !!ecocreditClient,
    }),
  );

  /* Fetch current page batches supplies */

  const batches = batchesResult.data?.batches;
  const batchesWithSupplyResult = useQuery(
    getAddDataToBatchesQuery({
      batches,
      sanityCreditClassData: sanityCreditClassDataResult.data,
      enabled: !!sanityCreditClassDataResult.data,
      reactQueryClient,
    }),
  );

  /* Format hook returned variables */

  const batchesPagination = batchesResult.data?.pagination;
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
