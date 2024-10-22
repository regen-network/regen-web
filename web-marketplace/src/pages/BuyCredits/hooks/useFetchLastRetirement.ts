import { useCallback } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { timer } from 'utils/timer';

import { Retirement } from 'generated/indexer-graphql';
import {
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { getLastRetirement } from 'lib/queries/react-query/registry-server/graphql/indexer/getLastRetirement/getLastRetirement';

type FetchLastRetirementParams = {
  batchDenoms: string[];
  retirementReason?: string;
  retirementJurisdiction: string;
  creditsAmount: number;
};
export const useFetchLastRetirement = () => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setProcessingModalAtom = useSetAtom(processingModalAtom);

  const { refetch } = useQuery(
    getLastRetirement({
      client: apolloClient,
      enabled: false,
    }),
  );

  const fetchLastRetirement = useCallback(
    async ({
      batchDenoms,
      retirementReason,
      retirementJurisdiction,
      creditsAmount,
    }: FetchLastRetirementParams) => {
      setProcessingModalAtom(atom => void (atom.open = true));
      let i = 1;
      let retirement;
      while (i < 10) {
        const { data } = await refetch();
        retirement = data?.data?.allRetirements?.nodes?.filter(retirement => {
          return (
            retirement?.batchDenoms.sort().toString() ===
              batchDenoms.sort().toString() &&
            retirement.reason === retirementReason &&
            retirement.jurisdiction === retirementJurisdiction &&
            Number(retirement.amount) === creditsAmount
          );
        })?.[0];
        i++;
        if (!!retirement) {
          break;
        }
        await timer(1000);
      }
      setProcessingModalAtom(atom => void (atom.open = false));
      return retirement;
    },
    [refetch, setProcessingModalAtom],
  );

  return fetchLastRetirement;
};
