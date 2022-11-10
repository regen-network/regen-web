import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { addDataToBatch } from 'lib/ecocredit/api';

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
  const queryClient = useQueryClient();
  const { page: routePage } = useParams();
  const page = routePage ? Number(routePage) - 1 : 0;
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page,
      rowsPerPage: ROWS_PER_PAGE,
      offset: 0,
    });
  const { rowsPerPage } = paginationParams;
  const [batchesResponse, setBatchesResponse] = useState<
    QueryBatchesResponse | undefined
  >();

  const [batchesWithSupply, setBatchesWithSupply] = useState<
    BatchInfoWithSupply[] | undefined
  >();

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const allBatchesCount = Number(batchesResponse?.pagination?.total ?? 0);
  const batches = batchesResponse?.batches;
  const batchesWithDefaultSupply: BatchInfoWithSupply[] | undefined =
    batches?.map(batch => ({
      ...batch,
      cancelledAmount: '',
      retiredAmount: '',
      tradableAmount: '',
    }));

  useEffect(() => {
    const fetchBatches = async (): Promise<void> => {
      if (ecocreditClient) {
        const query = batchesQuery({
          client: ecocreditClient,
          request: {
            pagination: {
              offset: page * rowsPerPage,
              limit: routePage !== undefined ? rowsPerPage : undefined,
              countTotal: true,
            },
          },
        });

        const batchesResponse =
          queryClient.getQueryData<QueryBatchesResponse>(query.queryKey) ??
          (await queryClient.fetchQuery(query));

        setBatchesResponse(batchesResponse);
        setBatchesWithSupply(undefined);
      }
    };

    fetchBatches();
  }, [ecocreditClient, page, queryClient, routePage, rowsPerPage]);

  useEffect(() => {
    const fetchBatchWithSupply = async (): Promise<void> => {
      if (queryClient && batches && sanityCreditClassData) {
        const query = addDataToBatchesQuery({ batches, sanityCreditClassData });
        const batchesWithSupply =
          queryClient.getQueryData<BatchInfoWithSupply[]>(query.queryKey) ??
          (await queryClient.fetchQuery(query));
        setBatchesWithSupply(batchesWithSupply);
      }
    };

    fetchBatchWithSupply();
  }, [batches, sanityCreditClassData, queryClient]);

  return {
    batchesWithSupply: batchesWithSupply ?? batchesWithDefaultSupply,
    setPaginationParams,
    paginationParams: { ...paginationParams, count: allBatchesCount },
  };
};
