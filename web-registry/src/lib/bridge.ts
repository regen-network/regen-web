import axios from 'axios';

import { BridgedTxStatus } from 'types/ledger/ecocredit';

export const getBridgeTxStatus = async (
  hash: string,
): Promise<
  | {
      tx_hash: string;
      destination_tx_hash: string;
      status: BridgedTxStatus;
    }
  | undefined
> => {
  const apiUri = process.env.REACT_APP_BRIDGE_API_URI;
  if (!apiUri) {
    return;
  }
  try {
    const { data } = await axios.get(`${apiUri}/regen/events/${hash}/status`);
    return data;
  } catch (e) {}
  return;
};
