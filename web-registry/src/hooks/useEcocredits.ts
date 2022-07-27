import { useCallback, useEffect, useState } from 'react';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { getEcocreditsForAccount } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

export default function useEcocredits(address?: string): {
  credits: BatchInfoWithBalance[];
  fetchCredits: () => Promise<void>;
} {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>([]);

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address) return;

    try {
      const credits = await getEcocreditsForAccount(address);
      if (credits) setCredits(credits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }, [address]);

  useEffect(() => {
    if (!ledgerRESTUri || !address) return;
    fetchCredits();
  }, [fetchCredits, address]);

  return { credits, fetchCredits };
}
