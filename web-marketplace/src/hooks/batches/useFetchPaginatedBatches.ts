import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getBatchesByClassQuery } from 'lib/queries/react-query/ecocredit/getBatchesByClass/getBatchesByClass';
import { getBatchesByIssuerQuery } from 'lib/queries/react-query/ecocredit/getBatchesByIssuerQuery/getBatchesByIssuerQuery';
import { getBatchesByProjectQuery } from 'lib/queries/react-query/ecocredit/getBatchesByProjectQuery/getBatchesByProjectQuery';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { client as sanityClient } from '../../lib/clients/apolloSanity';
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
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
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
    offset: BigInt(page * rowsPerPage),
    limit: BigInt(rowsPerPage),
    countTotal: true,
    key: new Uint8Array(),
    reverse: false,
  };

  const sanityCreditClassDataResult = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  /* Default batches fetch */
  const batchesResult = useQuery(
    getBatchesQuery({
      client: queryClient,
      request: {
        pagination: paginationRequest,
      },
      placeholderData: keepPreviousData,
      enabled: !!queryClient && !projectId && !address && !creditClassId,
    }),
  );

  /* By Issuer batches fetch */
  const batchesByIssuerResult = useQuery(
    getBatchesByIssuerQuery({
      client: queryClient,
      request: {
        pagination: paginationRequest,
        issuer: address as string,
      },
      placeholderData: keepPreviousData,
      enabled: !!queryClient && !!address,
    }),
  );

  /* By Project batches fetch */
  const batchesByProjectResult = useQuery(
    getBatchesByProjectQuery({
      client: queryClient,
      request: {
        pagination: paginationRequest,
        projectId: projectId as string,
      },
      placeholderData: keepPreviousData,
      enabled: !!queryClient && !!projectId,
    }),
  );

  /* By Class batches fetch */
  const batchesByClassResult = useQuery(
    getBatchesByClassQuery({
      client: queryClient,
      request: {
        pagination: paginationRequest,
        classId: creditClassId as string,
      },
      placeholderData: keepPreviousData,
      enabled: !!queryClient && !!creditClassId,
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
    client: queryClient,
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
