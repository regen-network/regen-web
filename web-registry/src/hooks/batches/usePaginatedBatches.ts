import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';

import {
  addDataToBatchesQuery,
  batchesQuery,
} from 'pages/EcocreditBatches/EcocreditBatches.loader';

import { client as sanityClient } from '../../sanity';

const ROWS_PER_PAGE = 10;

export const usePaginatedBatches = (): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
} => {
  const { ecocreditClient } = useLedger();
  const { page: routePage } = useParams();
  const page = routePage ? Number(routePage) - 1 : 0;
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page,
      rowsPerPage: ROWS_PER_PAGE,
      offset: 0,
    });
  const { rowsPerPage } = paginationParams;

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const batchesResult = useQuery(
    batchesQuery({
      client: ecocreditClient,
      request: {
        pagination: {
          offset: page * rowsPerPage,
          limit: routePage !== undefined ? rowsPerPage : undefined,
          countTotal: true,
        },
      },
    }),
  );
  const batches = batchesResult.data?.batches;
  const batchesPagination = batchesResult.data?.pagination;
  const allBatchesCount = Number(batchesPagination?.total ?? 0);
  const batchesWithDefaultSupply: BatchInfoWithSupply[] | undefined =
    batches?.map(batch => ({
      ...batch,
      cancelledAmount: '',
      retiredAmount: '',
      tradableAmount: '',
    }));

  const batchesWithSupplyResult = useQuery(
    addDataToBatchesQuery({
      batches,
      sanityCreditClassData,
    }),
  );
  const batchesWithSupply = batchesWithSupplyResult.data;

  return {
    batchesWithSupply: batchesWithSupply ?? batchesWithDefaultSupply,
    setPaginationParams,
    paginationParams: { ...paginationParams, count: allBatchesCount },
  };
};
