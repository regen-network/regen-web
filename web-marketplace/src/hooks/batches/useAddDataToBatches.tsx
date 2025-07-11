import { BatchInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryClient, useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { QueryClient as RPCQueryClient } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import {
  ECOCREDIT_MESSAGE_TYPES,
  messageActionEquals,
} from 'lib/ecocredit/constants';
import { normalizeBatchesWithData } from 'lib/normalizers/batches/normalizeBatchesWithData';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getSupplyQuery } from 'lib/queries/react-query/ecocredit/getSupplyQuery/getSupplyQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

type Props = {
  batches: BatchInfo[];
  sanityCreditClassData?: AllCreditClassQuery;
  withAllData?: boolean;
  client?: RPCQueryClient;
  reactQueryClient?: QueryClient;
};

export const useAddDataToBatches = ({
  batches,
  client,
  withAllData,
}: Props) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const {
    data: sanityCreditClassData,
    isFetching: isLoadingSanityCreditClass,
  } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const { data: createBatchTxs, isFetching: isLoadingCreateBatchTxs } =
    useQuery(
      getGetTxsEventQuery({
        client,
        enabled: !!client,
        request: {
          events: [
            `${messageActionEquals}'${ECOCREDIT_MESSAGE_TYPES.CREATE_BATCH.message}'`,
          ],
        },
      }),
    );
  const {
    data: createBatchAlphaTxs,
    isFetching: isLoadingCreateBatchAlphaTxs,
  } = useQuery(
    getGetTxsEventQuery({
      client,
      enabled: !!client,
      request: {
        events: [
          `${messageActionEquals}'${ECOCREDIT_MESSAGE_TYPES.CREATE_BATCH_ALPHA.message}'`,
        ],
      },
    }),
  );

  const batchesSupplyResult = useQueries({
    queries: batches.map(batch =>
      getSupplyQuery({
        request: { batchDenom: batch.denom },
        client,
        enabled: !!client,
      }),
    ),
  });
  const isBatchesSupplyLoading = batchesSupplyResult.some(
    batchSupplyQuery => batchSupplyQuery.isFetching,
  );

  const batchesProjectResult = useQueries({
    queries: batches.map(batch =>
      getProjectQuery({
        request: { projectId: batch.projectId },
        client,
        enabled: !!client && withAllData,
      }),
    ),
  });
  const isBatchesProjectLoading = batchesProjectResult.some(
    batchProjectQuery => batchProjectQuery.isFetching,
  );

  const batchesProjectMetadataResult = useQueries({
    queries: batches.map((batch, index) => {
      const project = batchesProjectResult?.[index].data?.project;
      return getMetadataQuery({
        iri: project?.metadata,
        client,
        enabled: !!client && !!project?.metadata && withAllData,
        languageCode: selectedLanguage,
      });
    }),
  });
  const isBatchesProjectMetadataLoading = batchesProjectMetadataResult.some(
    batchProjectMetadataQuery => batchProjectMetadataQuery.isFetching,
  );

  const batchesClassResult = useQueries({
    queries: batches.map((batch, index) => {
      const project = batchesProjectResult?.[index].data?.project;
      return getClassQuery({
        request: { classId: project?.classId as string },
        client,
        enabled: !!client && !!project?.classId && withAllData,
      });
    }),
  });

  const batchesClassMetadataResult = useQueries({
    queries: batches.map((batch, index) => {
      const creditClass = batchesClassResult?.[index].data?.class;

      return getMetadataQuery({
        iri: creditClass?.metadata,
        client,
        enabled: !!client && !!creditClass?.metadata && withAllData,
        languageCode: selectedLanguage,
      });
    }),
  });
  const isBatchesClassMetadataLoading = batchesClassMetadataResult.some(
    batchClassMetadataQuery => batchClassMetadataQuery.isFetching,
  );

  const batchesWithData = normalizeBatchesWithData({
    batches,
    batchesClassMetadataResult: isBatchesClassMetadataLoading
      ? []
      : batchesClassMetadataResult,
    batchesProjectResult: isBatchesProjectLoading ? [] : batchesProjectResult,
    batchesProjectMetadataResult: isBatchesProjectMetadataLoading
      ? []
      : batchesProjectMetadataResult,
    batchesSupplyResult: isBatchesSupplyLoading ? [] : batchesSupplyResult,
    createBatchAlphaTxs,
    createBatchTxs,
    sanityCreditClassData,
  });

  return {
    batchesWithData,
    isLoadingBatchesWithData:
      isLoadingSanityCreditClass ||
      isLoadingCreateBatchAlphaTxs ||
      isLoadingCreateBatchTxs,
  };
};
