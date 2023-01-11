import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeEcocredits } from 'lib/normalizers/ecocredits/normalizeEcocredits';
import { getBalanceQuery } from 'lib/queries/react-query/ecocredit/getBalanceQuery/getBalanceQuery';
import { getBalanceQueryKey } from 'lib/queries/react-query/ecocredit/getBalanceQuery/getBalanceQuery.config';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useWallet } from 'lib/wallet/wallet';

interface Response {
  credit: BatchInfoWithBalance;
  reloadBalance: () => void;
  isLoadingCredit: boolean;
}

interface Props {
  batchDenom: string;
}

export const useFetchEcocredit = ({ batchDenom }: Props): Response => {
  const { ecocreditClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  // Balance
  const { data: balanceData, isLoading: isLoadingCredit } = useQuery(
    getBalanceQuery({
      enabled: !!ecocreditClient,
      client: ecocreditClient,
      request: {
        address: wallet?.address,
        batchDenom,
      },
    }),
  );

  // Batche
  const { data: batchData } = useQuery(
    getBatchQuery({
      client: ecocreditClient,
      request: { batchDenom: batchDenom },
    }),
  );

  // Projects
  const { data: projectData } = useQuery(
    getProjectQuery({
      request: { projectId: batchData?.batch?.projectId },
    }),
  );

  // Metadatas
  const metadata = getMetadataQuery({
    iri: projectData?.project?.metadata,
  });

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Normalization
  const credit = normalizeEcocredits({
    balance: balanceData?.balance,
    batch: batchData?.batch,
    metadata: metadata,
    project: projectData?.project,
    sanityCreditClassData: creditClassData,
  });

  // Reload callback
  const reloadBalance = useCallback((): void => {
    reactQueryClient.invalidateQueries({
      queryKey: getBalanceQueryKey({
        address: wallet?.address ?? '',
        batchDenom,
      }),
    });
  }, [reactQueryClient, batchDenom, wallet?.address]);

  return {
    credit,
    reloadBalance,
    isLoadingCredit,
  };
};
