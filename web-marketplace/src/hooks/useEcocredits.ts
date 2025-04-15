import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BatchBalanceInfo,
  BatchInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';

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
const isOfCreditClass =
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
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>();
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const isFetchingRef = useRef(false);
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

  useEffect(() => {
    // Initialize credits with empty classId and projectLocation to render components consuming data right away
    if (
      balancesResponse?.balances &&
      batchesData &&
      sanityCreditClassData &&
      !credits
    ) {
      const initialCredits = balancesResponse?.balances
        .filter(isOfCreditClass(creditClassId))
        .map(balance => {
          const batch = batchesData?.batches.find(
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

      if (initialCredits) {
        setCredits(initialCredits);
        setIsLoadingCredits(false);
      }
    }
  }, [
    balancesResponse,
    batchesData,
    creditClassId,
    credits,
    sanityCreditClassData,
  ]);

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address || isFetchingRef.current || !queryClient) {
      return;
    }

    try {
      isFetchingRef.current = true;
      const newCredits = await getEcocreditsForAccount({
        address,
        paginationParams,
        loadedCredits: credits ?? [],
        balances: balancesResponse?.balances.filter(
          isOfCreditClass(creditClassId),
        ),
        batches: batchesData?.batches,
        sanityCreditClassData,
        client: queryClient,
        selectedLanguage,
      });

      if (newCredits) setCredits(newCredits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    } finally {
      isFetchingRef.current = false;
    }
  }, [
    address,
    paginationParams,
    credits,
    balancesResponse?.balances,
    creditClassId,
    batchesData?.batches,
    sanityCreditClassData,
    queryClient,
    selectedLanguage,
  ]);

  const reloadBalances = useCallback(async () => {
    if (!address) return;

    const newBalancesReponse = await fetchBalances({ address });
    const updatedCredits = credits?.map(credit => {
      if (credit.balance) {
        const newBalance = newBalancesReponse?.balances.find(
          balance => balance.batchDenom === credit.denom,
        ) ?? {
          ...credit.balance,
          escrowedAmount: '0',
          retiredAmount: '0',
          tradableAmount: '0',
        };
        return {
          ...credit,
          balance: newBalance,
        };
      }

      return credit;
    });

    setCredits(updatedCredits);
  }, [address, credits, fetchBalances]);

  useEffect(() => {
    if (!ledgerRESTUri || !address) return;
    // this variable is used to prevent race condition
    let shouldFetch = false;
    if (paginationParams && credits) {
      // Fetch only one page of credits if current page has at least one row without classId or projectLocation
      const { offset, rowsPerPage } = paginationParams;
      const displayedCredits = credits.slice(offset, offset + rowsPerPage);
      shouldFetch = displayedCredits?.some(
        credit => credit.classId === '' && credit.projectLocation === '',
      );
    } else if (credits) {
      // Fetch all credits if at least one row without classId or projectLocation
      shouldFetch = credits?.some(
        credit => credit.classId === '' && credit.projectLocation === '',
      );
    }

    if (shouldFetch) {
      fetchCredits();
    }
  }, [fetchCredits, address, paginationParams, credits]);

  return {
    credits: credits ?? [],
    fetchCredits,
    reloadBalances,
    isLoadingCredits,
  };
}
