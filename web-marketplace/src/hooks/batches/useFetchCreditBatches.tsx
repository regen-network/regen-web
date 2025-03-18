import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useAddDataToBatches } from 'hooks/batches/useAddDataToBatches';

type Params = {
  withAllData?: boolean;
};

export const useFetchCreditBatches = ({ withAllData }: Params) => {
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: batchesData, isFetching: isLoadingBatches } = useQuery(
    getBatchesQuery({
      enabled: !!queryClient,
      client: queryClient,
      request: {},
    }),
  );

  const batches = batchesData?.batches ?? [];

  const sanityCreditClassDataResult = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const { batchesWithData, isLoadingBatchesWithData } = useAddDataToBatches({
    batches,
    sanityCreditClassData: sanityCreditClassDataResult.data,
    reactQueryClient,
    client: queryClient,
    withAllData,
  });

  return {
    batchesWithSupply: batchesWithData,
    isLoading: isLoadingBatchesWithData || isLoadingBatches,
  };
};
