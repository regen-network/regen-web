import { useCallback, useEffect, useState } from 'react';
import {
  BatchInfo,
  QueryBalancesResponse,
  QueryBatchesByProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

import useEcocreditQuery from './useEcocreditQuery';

type Props = {
  address?: string;
  projectId?: string;
  widthAdditionalData?: boolean;
};

export default function useEcocreditsByProject({
  address,
  projectId,
  widthAdditionalData = true,
}: Props): {
  credits: BatchInfoWithBalance[];
  fetchCredits: () => Promise<void>;
  isLoadingCredits: boolean;
} {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>();

  const [isLoadingCredits, setIsLoadingCredits] = useState(true);

  const batchesResponse = useEcocreditQuery<QueryBatchesByProjectResponse>({
    params: projectId ? { projectId } : undefined,
    query: 'batchesByProject',
  });

  const balancesResponse = useEcocreditQuery<QueryBalancesResponse>({
    params: address ? { address } : undefined,
    query: 'balances',
  });

  useEffect(() => {
    // Initialize credits with empty classId and projectLocation to render components consuming data right away
    if (balancesResponse.data && batchesResponse.data && !credits) {
      const initialCredits = balancesResponse?.data?.balances.map(balance => {
        const batch = batchesResponse?.data?.batches.find(
          batch => batch.denom === balance.batchDenom,
        ) as BatchInfo;

        if (!batch) return undefined;

        return {
          ...batch,
          balance,
          classId: '',
          projectLocation: '',
        };
      });

      if (initialCredits) {
        setCredits(
          initialCredits.filter(
            credit => credit !== undefined,
          ) as BatchInfoWithBalance[],
        );
        setIsLoadingCredits(false);
      }
    }
  }, [balancesResponse, batchesResponse, credits]);

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address) {
      return;
    }

    try {
      const newCredits = await getEcocreditsForAccount({
        address,
        loadedCredits: credits ?? [],
        balances: balancesResponse?.data?.balances,
        batches: batchesResponse?.data?.batches,
      });
      if (newCredits) setCredits(newCredits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }, [address, credits, balancesResponse, batchesResponse]);

  useEffect(() => {
    if (!ledgerRESTUri || !address) return;
    // this variable is used to prevent race condition
    let shouldFetch = false;
    if (credits) {
      // Fetch all credits if at least one row without classId or projectLocation
      shouldFetch = credits?.some(
        credit => credit.classId === '' && credit.projectLocation === '',
      );
    }

    if (shouldFetch && widthAdditionalData) {
      fetchCredits();
    }
  }, [fetchCredits, address, credits, widthAdditionalData]);

  return { credits: credits ?? [], fetchCredits, isLoadingCredits };
}
