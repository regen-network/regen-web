import { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { normalizeEcocredits } from 'lib/normalizers/ecocredits/normalizeEcocredits';
import { getBalancesQuery } from 'lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useFetchBatchesWithMetadata } from '../../../../hooks/batches/useFetchBatchesWithMetadata';
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
  address?: string | null;
  creditClassId?: string;
  isPaginatedQuery?: boolean;
  hideEcocredits?: boolean;
}

export const useFetchEcocredits = ({
  address,
  creditClassId,
  isPaginatedQuery = true,
  hideEcocredits,
}: Props): Response => {
  const { ecocreditClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: 10,
      offset: 0,
    });
  const { page, rowsPerPage } = paginationParams;

  // Balances
  const balancesQuery = useMemo(
    () =>
      getBalancesQuery({
        enabled: !!ecocreditClient && !hideEcocredits,
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
      hideEcocredits,
      address,
      wallet?.address,
      isPaginatedQuery,
      page,
      rowsPerPage,
    ],
  );
  const { data: balancesData, isLoading: isLoadingCredits } =
    useQuery(balancesQuery);
  const balances =
    balancesData?.balances.filter(isOfCreditClass(creditClassId)) ?? [];
  const balancesPagination = balancesData?.pagination;
  const allBalancesCount = Number(balancesPagination?.total ?? 0);

  const filteredBalances = balances.filter(
    balance =>
      Number(balance.escrowedAmount) !== 0 ||
      Number(balance.retiredAmount) !== 0 ||
      Number(balance.tradableAmount) !== 0,
  );
  const {
    batches,
    isBatchesLoading,
    projects,
    isProjectsLoading,
    projectsMetadata,
    isProjectsMetadataLoading,
    classesMetadata,
    isClassesMetadataLoading,
  } = useFetchBatchesWithMetadata(filteredBalances);

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      languageCode: selectedLanguage,
      enabled: !!sanityClient && !hideEcocredits,
    }),
  );

  // Normalization
  // isLoading -> undefined: return empty strings in normalizer to trigger skeleton
  // !isLoading -> null/result: return results with field value different from empty strings and stop displaying the skeletons
  const credits = filteredBalances.map((balance, index) =>
    normalizeEcocredits({
      balance,
      batch: isBatchesLoading ? undefined : batches[index]?.batch,
      projectMetadata: isProjectsMetadataLoading
        ? undefined
        : projectsMetadata[index],
      project: isProjectsLoading ? undefined : projects[index],
      sanityCreditClassData: creditClassData,
      creditClassMetadata: isClassesMetadataLoading
        ? undefined
        : classesMetadata[index],
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
