import axios from 'axios';

import { BridgedTxStatus } from 'types/ledger/ecocredit';
import getApiUri from 'lib/apiUri';

export const getBridgeTxStatus = async (
  hash: string,
): Promise<{
  tx_hash: string;
  destination_tx_hash: string;
  status: BridgedTxStatus;
}> => {
  const { data } = await axios.get(
    // using a proxy to bridge service api for now
    `${getApiUri()}/bridge/regen/events/${hash}/status`,
  );
  return data;
};
