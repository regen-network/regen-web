import { IndexerAllEcocreditTxesQuery } from 'generated/indexer-graphql';
import { getHashUrl } from 'lib/block-explorer';
import { getReadableMessages } from 'lib/ecocredit/api';

import { TxRowData } from './CreditActivityTable.types';

type NormalizeAllTxesParams = {
  allEcocreditTxesData?: IndexerAllEcocreditTxesQuery;
};

export const normalizeAllTxes = ({
  allEcocreditTxesData,
}: NormalizeAllTxesParams) => {
  const allTxes = allEcocreditTxesData?.allEcocreditTxes?.nodes;
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
