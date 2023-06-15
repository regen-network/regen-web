import { useRef, useState } from 'react';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { MsgBridge } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useQueries, useQuery } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { BridgedEcocredits } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { normalizeBridgedEcocredits } from 'lib/normalizers/bridge/normalizeBridgedEcocredits';
import { getBridgeTxStatusQuery } from 'lib/queries/react-query/bridge/getBridgeTxStatusQuery/getBridgeTxStatusQuery';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import {
  BRIDGED_STATUSES,
  STATUS_PENDING,
  TWO_MINUTE_MS,
  TX_STATUS_REFRESH_INTERVAL,
} from '../BridgedEcocreditsTable.constants';
import { TxCredits, TxWithResponse } from '../BridgedEcocreditsTable.types';
import {
  hasMessages,
  isQueryEnabled,
  isTimestampBelowDuration,
} from '../BridgedEcocreditsTable.utils';

interface Props {
  address?: string;
}

interface Output {
  bridgedCredits: BridgedEcocredits[];
  isLoadingBridgedCredits: boolean;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
  isRefetchingTxsStatus: boolean;
}

export const useFetchBridgedEcocredits = ({ address }: Props): Output => {
  const { txClient, ecocreditClient, dataClient } = useLedger();
  const statusToRefetchRef = useRef<boolean[]>([]);

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { page, rowsPerPage } = paginationParams;

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // TxsEvent
  const { data: txsEventData, isLoading } = useQuery(
    getGetTxsEventQuery({
      client: txClient,
      enabled: !!txClient,
      request: {
        events: [
          `${messageActionEquals}'/${MsgBridge.$type}'`,
          `message.sender='${address}'`,
        ],
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  // TxsWithResponse
  const txsWithResponse: TxWithResponse[] =
    txsEventData?.txs
      .map(
        (tx, index): TxWithResponse => ({
          ...tx,
          txResponse: txsEventData.txResponses[index],
        }),
      )
      .filter(tx => !!tx.body) ?? [];

  // TxsStatus
  const txsStatusResult = useQueries({
    queries: txsWithResponse.map((tx, index) =>
      getBridgeTxStatusQuery({
        request: { txHash: tx.txResponse.txhash },
        enabled: isQueryEnabled({ page, queryIndex: index, rowsPerPage }),
        keepPreviousData: true,
        refetchInterval:
          statusToRefetchRef.current[index] ||
          isTimestampBelowDuration({
            duration: TWO_MINUTE_MS,
            timestamp: tx.txResponse.timestamp,
          })
            ? TX_STATUS_REFRESH_INTERVAL
            : false,
      }),
    ),
  });
  const isFetchingTxsStatus = txsStatusResult.some(
    txStatusResult => txStatusResult.isFetching,
  );

  statusToRefetchRef.current = txsStatusResult.map(
    txsStatusResult =>
      BRIDGED_STATUSES[txsStatusResult?.data?.status ?? 'evm_confirmed'] ===
      STATUS_PENDING,
  );

  const isRefetchingTxsStatus =
    isFetchingTxsStatus &&
    statusToRefetchRef.current.some(shouldRefetch => shouldRefetch);

  // Messages
  // We save the index here in order to be able to map the credits to the txsWithResponse values at the end
  const txMessages = txsWithResponse
    .map((tx, index) => ({
      txIndex: index,
      messages: tx.body?.messages.filter(
        m => m.typeUrl === `/${MsgBridge.$type}`,
      ),
    }))
    .filter(hasMessages);

  // Credits
  const credits: TxCredits[] = txMessages
    .map(txMessages =>
      txMessages.messages
        .map(message => MsgBridge.decode(message?.value).credits)
        .flat(1)
        .map(credits => ({ ...credits, txIndex: txMessages.txIndex })),
    )
    .flat(1);

  // Batches
  const batchesResult = useQueries({
    queries: credits.map(credit =>
      getBatchQuery({
        client: ecocreditClient,
        request: { batchDenom: credit.batchDenom },
      }),
    ),
  });
  const batches = batchesResult?.map(batchResult => batchResult.data) ?? [];
  const isBatchesLoading = batchesResult.some(
    batchResult => batchResult.isLoading,
  );

  // Projects
  const projectsResults = useQueries({
    queries: batches.map(batch =>
      getProjectQuery({
        request: {
          projectId: batch?.batch?.projectId,
        },
        client: ecocreditClient,
      }),
    ),
  });
  const projects = projectsResults.map(projectResult => projectResult.data);
  const isProjectsLoading = projectsResults.some(
    projectResult => projectResult.isLoading,
  );

  // Metadatas
  const metadatasResults = useQueries({
    queries: projects.map(project =>
      getMetadataQuery({
        iri: project?.project?.metadata,
        dataClient,
        enabled: !!dataClient,
      }),
    ),
  });
  const metadatas = metadatasResults.map(metadataResult => {
    return metadataResult.data;
  });
  const isMetadatasLoading = metadatasResults.some(
    metadataResult => metadataResult.isLoading,
  );

  // Normalization
  // isLoading -> undefined: return empty strings in normalizer to trigger skeleton
  // !isLoading -> null/result: return results with field value different from empty strings and stop displaying the skeletons
  const bridgedCredits = credits.map((credit, index) =>
    normalizeBridgedEcocredits({
      batch: isBatchesLoading ? undefined : batches[index]?.batch,
      metadata: isMetadatasLoading ? undefined : metadatas[index],
      project: isProjectsLoading ? undefined : projects[index]?.project,
      sanityCreditClassData: creditClassData,
      credit,
      txStatus: txsStatusResult[credit.txIndex]?.data,
      txResponse: txsWithResponse[credit.txIndex].txResponse,
    }),
  );

  return {
    bridgedCredits,
    isLoadingBridgedCredits: isLoading,
    paginationParams,
    setPaginationParams,
    isRefetchingTxsStatus,
  };
};
