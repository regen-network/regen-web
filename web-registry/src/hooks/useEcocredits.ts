import { useState, useEffect } from 'react';

import { ledgerRESTUri } from '../lib/ledger';
import { getEcocreditsForAccount } from '../lib/ecocredit';
import type { BatchInfoWithBalance } from '../types/ledger/ecocredit';

export default function useEcocredits(
  address?: string,
): BatchInfoWithBalance[] {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>([]);

  useEffect(() => {
    if (!ledgerRESTUri || !address) return;

    const fetchData = async (): Promise<void> => {
      try {
        const credits = await getEcocreditsForAccount(address);
        if (credits) setCredits(credits);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }
    };
    fetchData();
  }, [address]);

  return credits;
}
