import { useCallback, useEffect, useRef, useState } from 'react';

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
  const isFetchingRef = useRef(false);

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (!address || isFetchingRef.current) {
      return;
    }

    try {
      isFetchingRef.current = true;
      const newCredits = await getBridgedEcocreditsForAccount(
        address,
        sanityCreditClassData,
      );

      if (newCredits) setCredits(newCredits);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    } finally {
      isFetchingRef.current = false;
      setIsLoadingCredits(false);
    }
  }, [address, sanityCreditClassData]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return { bridgedCredits, isLoadingCredits };
};
