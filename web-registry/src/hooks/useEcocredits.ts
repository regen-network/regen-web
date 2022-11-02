import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BatchInfo,
  QueryBatchesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

import { client as sanityClient } from '../sanity';
import useEcocreditQuery from './useEcocreditQuery';
import useQueryBalances from './useQueryBalances';

const hasBatchBalance = (batchWithBalance: BatchInfoWithBalance): boolean => {
  return (
    batchWithBalance?.balance?.tradableAmount !== '0' ||
    batchWithBalance.balance.retiredAmount !== '0' ||
    batchWithBalance.balance.escrowedAmount !== '0'
  );
};

type Props = {
  address?: string;
  paginationParams?: TablePaginationParams;
};

export default function useEcocredits({ address, paginationParams }: Props): {
  credits: BatchInfoWithBalance[];
  fetchCredits: () => Promise<void>;
  reloadBalances: () => Promise<void>;
  isLoadingCredits: boolean;
} {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>();
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const isFetchingRef = useRef(false);

  const batchesResponse = useEcocreditQuery<QueryBatchesResponse>({
    params: {},
    query: 'batches',
  });
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
      batchesResponse.data &&
      sanityCreditClassData &&
      !credits
    ) {
      const initialCredits = balancesResponse?.balances
        .map(balance => {
          const batch = batchesResponse?.data?.batches.find(
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
  }, [balancesResponse, batchesResponse, credits, sanityCreditClassData]);

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address || isFetchingRef.current) {
      return;
    }

    try {
      isFetchingRef.current = true;
      const newCredits = await getEcocreditsForAccount({
        address,
        paginationParams,
        loadedCredits: credits ?? [],
        balances: balancesResponse?.balances,
        batches: batchesResponse?.data?.batches,
        sanityCreditClassData,
      });
      if (newCredits) setCredits(newCredits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    } finally {
      isFetchingRef.current = false;
    }
  }, [
    address,
    credits,
    paginationParams,
    balancesResponse,
    batchesResponse,
    sanityCreditClassData,
  ]);

  const reloadBalances = useCallback(async () => {
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
