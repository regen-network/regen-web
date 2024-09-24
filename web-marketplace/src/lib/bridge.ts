import axios from 'axios';

import { BridgedTxStatus } from 'types/ledger/ecocredit';

export type GetBridgeTxStatusResponse =
  | {
      regen_tx_hash: string;
      evm_tx_hash: string;
      status: BridgedTxStatus;
    }
  | undefined;

export const getBridgeTxStatus = async (
  hash: string,
): Promise<GetBridgeTxStatusResponse> => {
  const apiUri = import.meta.env.VITE_BRIDGE_API_URI;
  if (!apiUri) {
    return;
  }
  try {
    const { data } = await axios
      .get(`${apiUri}/regen/events/${hash}`)
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (!!hash && error.response.status === 404) {
            // We have a hash to search for, but Bridge Service hasn't found it yet.
            // This is a common case immediately after bridging, so we can return
            // a special pending status instead of an error.
            // eslint-disable-next-line no-console
            console.log(
              // eslint-disable-next-line lingui/no-unlocalized-strings
              `Bridge service did not find hash ${hash} yet. Marking as "Pending"...`,
            );
            return {
              data: {
                status: 'regen_hash_not_found',
                regen_tx_hash: hash,
                evm_tx_hash: '',
              },
            };
          }
        }
        throw error;
      });
    return data;
  } catch (e) {}
  return;
};
