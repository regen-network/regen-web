import { useMemo } from 'react';
import {
  BatchBalanceInfo,
  BatchInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getEcocreditsQuery } from 'lib/queries/react-query/ecocredit/getEcocreditsQuery/getEcocreditsQuery';

import { useLedger } from '../ledger';
import { client as sanityClient } from '../lib/clients/sanity';
import useQueryBalances from './useQueryBalances';

const hasBatchBalance = (batchWithBalance: BatchInfoWithBalance): boolean => {
  return (
    Number(batchWithBalance?.balance?.tradableAmount) !== 0 ||
    Number(batchWithBalance?.balance?.retiredAmount) !== 0 ||
    Number(batchWithBalance?.balance?.escrowedAmount) !== 0
  );
};

/* If a creditClassId is provided, filter by that. */
export const isOfCreditClass =
  (creditClassId?: string) =>
  (balance: BatchBalanceInfo): boolean => {
    if (!creditClassId) return true;
    return balance.batchDenom.startsWith(`${creditClassId}-`);
  };

type Props = {
  address?: string;
  paginationParams?: TablePaginationParams;
  creditClassId?: string;
};

/**
 * A custom React hook that manages ecocredit-related data and functionality
 * for a specified user address and optional credit class ID.
 *
 * @param address - The user's address for which ecocredit data is accessed.
 * @param paginationParams - Pagination parameters for querying ecocredit data.
 * @param creditClassId - A credit class ID used to filter fetched ecocredits.
 *
 * See {@link Props} for more details.
 *
 * @returns An object containing:
 * - credits: A list of ecocredit batches with their balances.
 * - fetchCredits: A function to manually refetch the ecocredit data.
 * - reloadBalances: A function to reload balances and invalidate the current query.
 * - isLoadingCredits: A boolean indicating whether the ecocredit data is currently being fetched.
 */
export default function useEcocredits({
  address,
  paginationParams,
  creditClassId,
}: Props): {
  credits: BatchInfoWithBalance[];
  fetchCredits: () => Promise<void>;
  reloadBalances: () => Promise<void>;
  isLoadingCredits: boolean;
} {
  const reactQueryClient = useQueryClient();
  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: batchesData } = useQuery(
    getBatchesQuery({
      enabled: !!queryClient,
      client: queryClient,
      request: {},
    }),
  );

  const { balancesResponse, fetchBalances } = useQueryBalances({
    address,
  });

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const initialCredits = useMemo<BatchInfoWithBalance[] | undefined>(() => {
    if (!balancesResponse?.balances || !batchesData || !sanityCreditClassData) {
      return undefined;
    }

    return balancesResponse.balances
      .filter(isOfCreditClass(creditClassId))
      .map(balance => {
        const batch = batchesData.batches.find(
          batch => batch.denom === balance.batchDenom,
        ) as BatchInfo;

        return {
          ...batch,
          balance,
          className: '',
          classId: '',
          projectName: '',
          projectLocation: '',
        };
      })
      .filter(hasBatchBalance);
  }, [
    balancesResponse?.balances,
    batchesData,
    sanityCreditClassData,
    creditClassId,
  ]);

  const queryKey = ['ecocredits', address, paginationParams, creditClassId];

  const ecocreditsQuery = useMemo(
    () =>
      getEcocreditsQuery({
        address: address!,
        paginationParams,
        creditClassId,
        balances: balancesResponse?.balances ?? [],
        batches: batchesData?.batches ?? [],
        sanityCreditClassData: sanityCreditClassData!,
        queryClient: queryClient!,
        selectedLanguage,
        initialCredits: initialCredits ?? [],
      }),
    [
      address,
      paginationParams,
      creditClassId,
      balancesResponse?.balances,
      batchesData?.batches,
      sanityCreditClassData,
      queryClient,
      selectedLanguage,
      initialCredits,
    ],
  );

  const {
    data: credits = initialCredits,
    isFetching: isLoadingCredits,
    refetch,
  } = useQuery<BatchInfoWithBalance[]>(ecocreditsQuery);

  const fetchCredits = async (): Promise<void> => {
    await refetch();
  };

  const reloadBalances = async (): Promise<void> => {
    if (!address) return;
    await fetchBalances({ address });
    await reactQueryClient.invalidateQueries(queryKey);
  };

  return {
    credits: credits ?? [],
    fetchCredits,
    reloadBalances,
    isLoadingCredits,
  };
}
