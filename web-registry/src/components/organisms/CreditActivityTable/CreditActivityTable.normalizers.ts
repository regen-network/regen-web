import { IndexerAllTxesQuery } from 'generated/indexer-graphql';
import { getHashUrl } from 'lib/block-explorer';
import { getReadableMessages } from 'lib/ecocredit/api';

import { TxRowData } from './CreditActivityTable.types';

type NormalizeAllTxesParams = {
  allTxesData?: IndexerAllTxesQuery;
};

export const normalizeAllTxes = ({ allTxesData }: NormalizeAllTxesParams) => {
  const allTxes = allTxesData?.allTxes?.nodes;
  const txRows: TxRowData[] =
    allTxes?.map(tx => {
      return {
        date: tx?.data?.tx_response.timestamp,
        txhash: tx?.data?.tx_response.txhash,
        messages: getReadableMessages(tx?.data?.tx_response),
        height: tx?.blockHeight,
        txUrl: getHashUrl(tx?.hash),
      } as TxRowData;
    }) ?? [];

  return txRows;
};
