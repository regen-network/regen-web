import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { getBatchesByIssuerQuery } from 'lib/queries/react-query/ecocredit/getBatchesByIssuerQuery/getBatchesByIssuerQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { client as sanityClient } from '../../lib/clients/sanity';
import { useAddDataToBatches } from './useAddDataToBatches';

type Props = { address?: string };

export const usePaginatedBatchesByIssuer = ({
  address,
}: Props): {
  batchesWithSupply: BatchInfoWithSupply[] | undefined;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
} => {
  const { ecocreditClient, dataClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { rowsPerPage, page } = paginationParams;

  const sanityCreditClassDataResult = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const batchesByIssuerResult = useQuery(
    getBatchesByIssuerQuery({
      client: ecocreditClient,
      request: {
        pagination: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          countTotal: true,
        },
        issuer: address,
      },
      keepPreviousData: true,
      enabled: !!ecocreditClient && !!address,
    }),
  );

  const batches = batchesByIssuerResult.data?.batches ?? [];

  const { batchesWithData: batchesWithSupply } = useAddDataToBatches({
    batches,
    sanityCreditClassData: sanityCreditClassDataResult.data,
    reactQueryClient,
    dataClient,
    ecocreditClient,
    withAllData: true,
  });

  const batchesPagination = batchesByIssuerResult.data?.pagination;
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
