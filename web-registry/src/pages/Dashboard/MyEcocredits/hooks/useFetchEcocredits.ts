import { useCallback, useMemo, useState } from 'react';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/ActionsTable.constants';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { normalizeEcocredits } from 'lib/normalizers/normalizeEcocredits/normalizeEcocredits';
import { getBalancesQuery } from 'lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/queries.sanity';
import { useWallet } from 'lib/wallet/wallet';

import { client as sanityClient } from '../../../../sanity';

interface Response {
  credits: BatchInfoWithBalance[];
  reloadBalances: () => void;
  isLoadingCredits: boolean;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
}

export const useFetchEcocredits = (): Response => {
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
          address: wallet?.address,
          pagination: {
            offset: page * rowsPerPage,
            limit: rowsPerPage,
            countTotal: true,
          },
        },
      }),
    [ecocreditClient, page, rowsPerPage, wallet?.address],
  );
  const { data: balancesData, isFetching: isLoadingCredits } =
    useQuery(balancesQuery);
  const balances = balancesData?.balances ?? [];
  const balancesPagination = balancesData?.pagination;
  const allBalancesCount = Number(balancesPagination?.total ?? 0);

  // Batches
  const batchesData = useQueries({
    queries: balances.map(balance =>
      getBatchQuery({
        client: ecocreditClient,
        request: { batchDenom: balance.batchDenom },
      }),
    ),
  });
  const batches = batchesData?.map(batchData => batchData.data) ?? [];

  // Projects
  const projectsData = useQueries({
    queries: batches.map(batch =>
      getProjectQuery({ request: { projectId: batch?.batch?.projectId } }),
    ),
  });
  const projects = projectsData.map(projectData => projectData.data);

  // Metadatas
  const metadatasData = useQueries({
    queries: projects.map(project =>
      getMetadataQuery({ iri: project?.project?.metadata }),
    ),
  });
  const metadatas = metadatasData.map(metadataData => metadataData.data);

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Normalization
  const credits = useMemo(
    () =>
      balances.map((balance, index) =>
        normalizeEcocredits({
          balance,
          batch: batches[index]?.batch,
          metadata: metadatas[index],
          project: projects[index]?.project,
          sanityCreditClassData: creditClassData,
        }),
      ),
    [balances, batches, creditClassData, metadatas, projects],
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
