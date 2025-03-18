import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { normalizeEcocredits } from 'lib/normalizers/ecocredits/normalizeEcocredits';
import { getBalanceQuery } from 'lib/queries/react-query/ecocredit/getBalanceQuery/getBalanceQuery';
import { getBalanceQueryKey } from 'lib/queries/react-query/ecocredit/getBalanceQuery/getBalanceQuery.config';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
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
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  // Balance
  const { data: balanceData, isLoading: isLoadingCredit } = useQuery(
    getBalanceQuery({
      client: queryClient,
      enabled: !!queryClient && !!wallet?.address,
      request: {
        address: wallet?.address as string,
        batchDenom,
      },
    }),
  );

  // Batch
  const { data: batchData } = useQuery(
    getBatchQuery({
      client: queryClient,
      request: { batchDenom: batchDenom },
    }),
  );

  // Project
  const { data: projectData } = useQuery(
    getProjectQuery({
      request: { projectId: batchData?.batch?.projectId as string },
      client: queryClient,
      enabled: !!batchData?.batch?.projectId && !!queryClient,
    }),
  );

  // Project Metadata
  const projectMetadata = getMetadataQuery({
    iri: projectData?.project?.metadata,
    client: queryClient,
    enabled: !!queryClient,
    languageCode: selectedLanguage,
  });

  // AllCreditClasses
  const { data: creditClassesData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  // Credit Class
  const classId = projectData?.project?.classId;
  const { data: creditClassData } = useQuery(
    getClassQuery({
      client: queryClient,
      request: {
        classId: classId as string,
      },
      enabled: !!queryClient && !!classId,
    }),
  );

  // Credit Class Metadata
  const { data: creditClassMetadata } = useQuery(
    getMetadataQuery({
      iri: creditClassData?.class?.metadata,
      enabled: !!creditClassData?.class?.metadata,
      languageCode: selectedLanguage,
    }),
  );

  // Normalization
  const credit = normalizeEcocredits({
    balance: balanceData?.balance,
    batch: batchData?.batch,
    projectMetadata,
    creditClassMetadata: creditClassMetadata as
      | CreditClassMetadataLD
      | undefined,
    project: projectData?.project,
    sanityCreditClassData: creditClassesData,
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
