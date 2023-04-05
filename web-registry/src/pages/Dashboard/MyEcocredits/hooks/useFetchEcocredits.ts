import { useCallback, useMemo, useState } from 'react';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { normalizeEcocredits } from 'lib/normalizers/ecocredits/normalizeEcocredits';
import { getBalancesQuery } from 'lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { client as sanityClient } from '../../../../lib/clients/sanity';
import { isOfCreditClass } from '../MyEcocredits.utils';

interface Response {
  credits: BatchInfoWithBalance[];
  reloadBalances: () => void;
  isLoadingCredits: boolean;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
}

interface Props {
  address?: string;
  creditClassId?: string;
  isPaginatedQuery?: boolean;
}

export const useFetchEcocredits = ({
  address,
  creditClassId,
  isPaginatedQuery = true,
}: Props): Response => {
  const { ecocreditClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
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
      getBalancesQuery({
        enabled: !!ecocreditClient,
        client: ecocreditClient,
        request: {
          address: address ?? wallet?.address,
          pagination: isPaginatedQuery
            ? {
                offset: page * rowsPerPage,
                limit: rowsPerPage,
                countTotal: true,
              }
            : undefined,
        },
      }),
    [
      ecocreditClient,
      page,
      rowsPerPage,
      wallet?.address,
      address,
      isPaginatedQuery,
    ],
  );
  const { data: balancesData, isLoading: isLoadingCredits } =
    useQuery(balancesQuery);
  const balances =
    balancesData?.balances.filter(isOfCreditClass(creditClassId)) ?? [];
  const balancesPagination = balancesData?.pagination;
  const allBalancesCount = Number(balancesPagination?.total ?? 0);

  // Batches
  const batchesResult = useQueries({
    queries: balances.map(balance =>
      getBatchQuery({
        client: ecocreditClient,
        request: { batchDenom: balance.batchDenom },
      }),
    ),
  });
  const batches = batchesResult?.map(batchResult => batchResult.data) ?? [];
  const isBatchesLoading = batchesResult.some(
    batchResult => batchResult.isLoading,
  );

  // Projects
  const projectsResults = useQueries({
    queries: batches.map(batch =>
      getProjectQuery({
        request: {
          projectId: batch?.batch?.projectId,
        },
        client: ecocreditClient,
      }),
    ),
  });
  const projects = projectsResults.map(projectResult => projectResult.data);
  const isProjectsLoading = projectsResults.some(
    projectResult => projectResult.isLoading,
  );

  // Metadatas
  const metadatasResults = useQueries({
    queries: projects.map(project =>
      getMetadataQuery({ iri: project?.project?.metadata }),
    ),
  });

  const metadatas = metadatasResults.map(metadataResult => {
    return metadataResult.data;
  });
  const isMetadatasLoading = metadatasResults.some(
    metadataResult => metadataResult.isLoading,
  );

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Normalization
  // isLoading -> undefined: return empty strings in normalizer to trigger skeleton
  // !isLoading -> null/result: return results with field value different from empty strings and stop displaying the skeletons
  const credits = balances
    .filter(
      balance =>
        balance.escrowedAmount !== '0' ||
        balance.retiredAmount !== '0' ||
        balance.tradableAmount !== '0',
    )
    .map((balance, index) =>
      normalizeEcocredits({
        balance,
        batch: isBatchesLoading ? undefined : batches[index]?.batch,
        metadata: isMetadatasLoading ? undefined : metadatas[index],
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
    credits,
    isLoadingCredits,
    reloadBalances,
    setPaginationParams,
    paginationParams: paginationParamsWithCount,
  };
};
