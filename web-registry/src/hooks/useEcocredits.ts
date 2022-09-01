import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BatchInfo,
  QueryBalancesResponse,
  QueryBatchesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

import useEcocreditQuery from './useEcocreditQuery';

type Props = {
  address?: string;
  paginationParams?: TablePaginationParams;
};

export default function useEcocredits({ address, paginationParams }: Props): {
  credits: BatchInfoWithBalance[];
  fetchCredits: () => Promise<void>;
  isLoadingCredits: boolean;
} {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>();
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const isFetchingRef = useRef(false);

  const batchesResponse = useEcocreditQuery<QueryBatchesResponse>({
    params: {},
    query: 'batches',
  });
  const balancesResponse = useEcocreditQuery<QueryBalancesResponse>({
    params: { address },
    query: 'balances',
  });

  useEffect(() => {
    // Initialize credits with empty classId and projectLocation to render components consuming data right away
    if (balancesResponse && batchesResponse && !credits) {
      const initialCredits = balancesResponse?.data?.balances.map(balance => {
        const batch = batchesResponse?.data?.batches.find(
          batch => batch.denom === balance.batchDenom,
        ) as BatchInfo;

        return {
          ...batch,
          balance,
          classId: '',
          projectLocation: '',
        };
      });

      if (initialCredits) {
        setCredits(initialCredits);
        setIsLoadingCredits(false);
      }
    }
  }, [balancesResponse, batchesResponse, credits]);

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
        balances: balancesResponse?.data?.balances,
        batches: batchesResponse?.data?.batches,
      });
      if (newCredits) setCredits(newCredits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    } finally {
      isFetchingRef.current = false;
    }
  }, [address, credits, paginationParams, balancesResponse, batchesResponse]);

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

  return { credits: credits ?? [], fetchCredits, isLoadingCredits };
}
