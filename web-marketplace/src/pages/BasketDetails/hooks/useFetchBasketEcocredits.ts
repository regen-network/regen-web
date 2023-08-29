import { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { getBasketBalancesQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketBalances/getBasketBalancesQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useBatchesWithMetadata } from 'hooks/batches/useBatchesWithMetadata';

import {
  BasketBatchInfoWithBalance,
  normalizeBasketEcocredits,
} from '../utils/normalizeBasketEcocredits';

type Params = {
  basketDenom?: string;
};

export interface FetchBasketEcocreditsType {
  basketCredits: BasketBatchInfoWithBalance[];
  reloadBalances: () => void;
  isLoadingCredits: boolean;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
}

export const useFetchBasketEcocredits = ({
  basketDenom,
}: Params): FetchBasketEcocreditsType => {
  const { basketClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });

  const { page, rowsPerPage } = paginationParams;

  // Balances
  const balancesQuery = useMemo(
    () =>
      getBasketBalancesQuery({
        enabled: !!basketClient,
        client: basketClient,
        request: {
          basketDenom,
          pagination: {
            offset: page * rowsPerPage,
            limit: rowsPerPage,
            countTotal: true,
          },
        },
        keepPreviousData: true,
      }),
    [basketClient, page, rowsPerPage, basketDenom],
  );
  const { data: balancesData, isLoading: isLoadingCredits } =
    useQuery(balancesQuery);
  const balances = balancesData?.balancesInfo ?? [];
  const balancesPagination = balancesData?.pagination;
  const allBalancesCount = Number(balancesPagination?.total ?? 0);

  const {
    batches,
    isBatchesLoading,
    projects,
    isProjectsLoading,
    projectsMetadata,
    isProjectsMetadataLoading,
    classesMetadata,
    isClassesMetadataLoading,
  } = useBatchesWithMetadata(balances);

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Normalization
  // isLoading -> undefined: return empty strings in normalizer to trigger skeleton
  // !isLoading -> null/result: return results with field value different from empty strings and stop displaying the skeletons
  const basketCredits = balances.map((balance, index) =>
    normalizeBasketEcocredits({
      balance,
      batch: isBatchesLoading ? undefined : batches[index]?.batch,
      projectMetadata: isProjectsMetadataLoading
        ? undefined
        : projectsMetadata[index],
      creditClassMetadata: isClassesMetadataLoading
        ? undefined
        : classesMetadata[index],
      project: isProjectsLoading ? undefined : projects[index]?.project,
      sanityCreditClassData: creditClassData,
    }),
  );

  const paginationParamsWithCount = useMemo(
    () => ({ ...paginationParams, count: allBalancesCount }),
    [paginationParams, allBalancesCount],
  );

  // Reload callback
  const reloadBalances = useCallback((): void => {
    reactQueryClient.invalidateQueries({
      queryKey: balancesQuery.queryKey,
    });
  }, [reactQueryClient, balancesQuery]);

  return {
    basketCredits,
    isLoadingCredits,
    reloadBalances,
    setPaginationParams,
    paginationParams: paginationParamsWithCount,
  };
};
