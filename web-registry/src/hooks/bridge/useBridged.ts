import { useCallback, useEffect, useState } from 'react';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { BridgedEcocredits } from 'types/ledger/ecocredit';
import { getBridgedEcocreditsForAccount } from 'lib/ecocredit/api';
import { client as sanityClient } from 'sanity';

interface Props {
  address?: string;
}

interface Output {
  bridgedCredits: BridgedEcocredits[];
  isLoadingCredits: boolean;
}

export const useBridged = ({ address }: Props): Output => {
  const [bridgedCredits, setCredits] = useState<BridgedEcocredits[]>([]);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address) {
      return;
    }

    try {
      const newCredits = await getBridgedEcocreditsForAccount(
        address,
        sanityCreditClassData,
      );
      if (newCredits) setCredits(newCredits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    } finally {
      setIsLoadingCredits(false);
    }
  }, [address, sanityCreditClassData]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return { bridgedCredits, isLoadingCredits };
};
