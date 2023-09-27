import { useQuery, useQueryClient } from '@tanstack/react-query';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { getBatchesByClassQuery } from 'lib/queries/react-query/ecocredit/getBatchesByClass/getBatchesByClass';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useAddDataToBatches } from 'hooks/batches/useAddDataToBatches';

type Params = {
  creditClassId?: string | null;
  creditBatches?: BatchInfoWithSupply[];
  withAllData?: boolean;
};

export const useFetchCreditBatches = ({
  creditClassId,
  creditBatches,
  withAllData = true,
}: Params) => {
  const { ecocreditClient, dataClient } = useLedger();
  const reactQueryClient = useQueryClient();

  const { data: batchesData, isFetching: isLoadingBatches } = useQuery(
    getBatchesQuery({
      enabled: !creditClassId && !!ecocreditClient && !creditBatches,
      client: ecocreditClient,
      request: {},
    }),
  );

  const { data: batchesByClassData, isFetching: isLoadingBatchesByClass } =
    useQuery(
      getBatchesByClassQuery({
        enabled: !!creditClassId && !!ecocreditClient && !creditBatches,
        client: ecocreditClient,
        request: { classId: creditClassId ?? undefined },
      }),
    );

  const batches = batchesData?.batches ?? batchesByClassData?.batches ?? [];

  const sanityCreditClassDataResult = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const { batchesWithData, isLoadingBatchesWithData } = useAddDataToBatches({
    batches,
    sanityCreditClassData: sanityCreditClassDataResult.data,
    reactQueryClient,
    dataClient,
    ecocreditClient,
    withAllData,
  });

  const batchesWithSupply = creditBatches ?? batchesWithData;

  return {
    batchesWithSupply,
    isLoading:
      isLoadingBatchesWithData || isLoadingBatches || isLoadingBatchesByClass,
  };
};
