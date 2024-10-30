import { useRef, useState } from 'react';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { MsgBridge } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { BridgedEcocredits } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { normalizeBridgedEcocredits } from 'lib/normalizers/bridge/normalizeBridgedEcocredits';
import { getBridgeTxStatusQuery } from 'lib/queries/react-query/bridge/getBridgeTxStatusQuery/getBridgeTxStatusQuery';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useFetchBatchesWithMetadata } from 'hooks/batches/useFetchBatchesWithMetadata';

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
  address?: string | null;
}

interface Output {
  bridgedCredits: BridgedEcocredits[];
  isLoadingBridgedCredits: boolean;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  paginationParams: TablePaginationParams;
  isRefetchingTxsStatus: boolean;
}

export const useFetchBridgedEcocredits = ({ address }: Props): Output => {
  const { txClient } = useLedger();
  const statusToRefetchRef = useRef<boolean[]>([]);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { page, rowsPerPage } = paginationParams;

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
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

  const {
    batches,
    isBatchesLoading,
    projects,
    isProjectsLoading,
    projectsMetadata,
    isProjectsMetadataLoading,
    classesMetadata,
    isClassesMetadataLoading,
  } = useFetchBatchesWithMetadata(credits);

  // Normalization
  // isLoading -> undefined: return empty strings in normalizer to trigger skeleton
  // !isLoading -> null/result: return results with field value different from empty strings and stop displaying the skeletons
  const bridgedCredits = credits.map((credit, index) =>
    normalizeBridgedEcocredits({
      batch: isBatchesLoading ? undefined : batches[index]?.batch,
      projectMetadata: isProjectsMetadataLoading
        ? undefined
        : projectsMetadata[index],
      project: isProjectsLoading ? undefined : projects[index],
      sanityCreditClassData: creditClassData,
      creditClassMetadata: isClassesMetadataLoading
        ? undefined
        : classesMetadata[index],
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
