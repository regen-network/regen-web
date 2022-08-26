import { useCallback, useEffect, useState } from 'react';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

export default function useEcocredits(address?: string): {
  credits: BatchInfoWithBalance[];
  fetchCredits: () => Promise<void>;
  isLoadingCredits: boolean;
} {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>([]);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address) {
      setIsLoadingCredits(false);
      return;
    }

    try {
      const credits = await getEcocreditsForAccount(address);
      if (credits) setCredits(credits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    } finally {
      setIsLoadingCredits(false);
    }
  }, [address]);

  useEffect(() => {
    if (!ledgerRESTUri || !address) return;
    fetchCredits();
  }, [fetchCredits, address]);

  return { credits, fetchCredits, isLoadingCredits };
}
