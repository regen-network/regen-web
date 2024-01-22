import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { getBatchesByClassQuery } from 'lib/queries/react-query/ecocredit/getBatchesByClass/getBatchesByClass';
import { getBatchesByIssuerQuery } from 'lib/queries/react-query/ecocredit/getBatchesByIssuerQuery/getBatchesByIssuerQuery';
import { getBatchesByProjectQuery } from 'lib/queries/react-query/ecocredit/getBatchesByProjectQuery/getBatchesByProjectQuery';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { client as sanityClient } from '../../lib/clients/sanity';
import { useAddDataToBatches } from './useAddDataToBatches';

export const PAGINATED_BATCHES_ROWS_PER_PAGE = 10;

type Props = {
  address?: string | null;
  projectId?: string;
  withAllData?: boolean;
  creditClassId?: string | null;
};

export const useFetchPaginatedBatches = ({
  projectId,
  address,
  creditClassId,
  withAllData = true,
}: Props): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
} => {
  const { ecocreditClient, dataClient, txClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { page: routePage } = useParams();
  // Page index starts at 1 for route
  // Page index starts at 0 for MUI Table
  const initialPage = routePage ? Number(routePage) - 1 : 0;
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: initialPage,
      rowsPerPage: PAGINATED_BATCHES_ROWS_PER_PAGE,
      offset: 0,
    });
  const { rowsPerPage, page } = paginationParams;
  const paginationRequest = {
    offset: page * rowsPerPage,
    limit: rowsPerPage,
    countTotal: true,
  };

  const sanityCreditClassDataResult = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  /* Default batches fetch */
  const batchesResult = useQuery(
    getBatchesQuery({
      client: ecocreditClient,
      request: {
        pagination: paginationRequest,
      },
      keepPreviousData: true,
      enabled: !!ecocreditClient && !projectId && !address && !creditClassId,
    }),
  );

  /* By Issuer batches fetch */
  const batchesByIssuerResult = useQuery(
    getBatchesByIssuerQuery({
      client: ecocreditClient,
      request: {
        pagination: paginationRequest,
        issuer: address as string,
      },
      keepPreviousData: true,
      enabled: !!ecocreditClient && !!address,
    }),
  );

  /* By Project batches fetch */
  const batchesByProjectResult = useQuery(
    getBatchesByProjectQuery({
      client: ecocreditClient,
      request: {
        pagination: paginationRequest,
        projectId,
      },
      keepPreviousData: true,
      enabled: !!ecocreditClient && !!projectId,
    }),
  );

  /* By Class batches fetch */
  const batchesByClassResult = useQuery(
    getBatchesByClassQuery({
      client: ecocreditClient,
      request: {
        pagination: paginationRequest,
        classId: creditClassId ?? undefined,
      },
      keepPreviousData: true,
      enabled: !!ecocreditClient && !!creditClassId,
    }),
  );

  const batchesData =
    batchesResult.data ??
    batchesByIssuerResult.data ??
    batchesByProjectResult.data ??
    batchesByClassResult.data;

  const batches = batchesData?.batches ?? [];

  const { batchesWithData: batchesWithSupply } = useAddDataToBatches({
    batches,
    sanityCreditClassData: sanityCreditClassDataResult.data,
    reactQueryClient,
    dataClient,
    ecocreditClient,
    txClient,
    withAllData,
  });

  /* Format hook returned variables */

  const batchesPagination = batchesData?.pagination;
  const allBatchesCount = Number(batchesPagination?.total ?? 0);
  const batchesWithDefaultSupply: BatchInfoWithSupply[] | undefined =
    batches?.map(batch => ({
      ...batch,
      cancelledAmount: '',
      retiredAmount: '',
      tradableAmount: '',
    }));

  return {
    batchesWithSupply: batchesWithSupply ?? batchesWithDefaultSupply,
    setPaginationParams,
    paginationParams: { ...paginationParams, count: allBatchesCount },
  };
};
