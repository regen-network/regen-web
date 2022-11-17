import { useCallback, useEffect, useState } from 'react';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { BridgedEcocredits } from 'types/ledger/ecocredit';
import { getBridgedEcocreditsForAccount } from 'lib/ecocredit/api';
import { client as sanityClient } from 'sanity';

interface Props {
  address?: string;
  paginationParams?: TablePaginationParams;
}

interface Output {
  credits: BridgedEcocredits[];
  isLoadingCredits: boolean;
}

export const useBridged = ({ address, paginationParams }: Props): Output => {
  const [credits, setCredits] = useState<BridgedEcocredits[]>([]);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const fetchCredits = useCallback(async (): Promise<void> => {
    // if (!address || isFetchingRef.current) {
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
      // isFetchingRef.current = false;
    }
  }, [address, sanityCreditClassData]);

  useEffect(() => {
    fetchCredits();
    setIsLoadingCredits(false);
  }, [fetchCredits]);

  return { credits, isLoadingCredits };
};
