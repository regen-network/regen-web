import { useCallback } from 'react';
import { useWallet } from 'lib/wallet/wallet';
import { ledgerRPCUri } from 'lib/ledger';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { encodeJsonToBase64 } from '../useCreateDao/useCreateDao.utils';

export const useUpdateMembers = () => {
  const { wallet } = useWallet();
  const roleId = 1;
  const authorizationId = 10;

  const updateMembers = useCallback(
    async ({
      rbamAddress,
      cw4GroupAddress,
    }: {
      rbamAddress: string;
      cw4GroupAddress: string;
    }) => {
      const client = await SigningCosmWasmClient.connectWithSigner(
        ledgerRPCUri,
        wallet?.offlineSigner,
        { gasPrice: GasPrice.fromString('0.025uregen') },
      );

      try {
        const exaddRes = await client.execute(
          wallet?.address,
          rbamAddress,
          {
            execute_actions: {
              actions: [
                {
                  authorization_id: authorizationId,
                  role_id: roleId,
                  msg: {
                    wasm: {
                      execute: {
                        contract_addr: cw4GroupAddress,
                        msg: encodeJsonToBase64({
                          update_members: {
                            add: [
                              {
                                addr: 'regen16fcl8s0qcvyjsp9jmnzvvjr2jpgrvegwz3smq0',
                                weight: 1,
                              },
                            ],
                            remove: [],
                          },
                        }),
                        funds: [],
                      },
                    },
                  },
                },
                {
                  authorization_id: authorizationId,
                  role_id: roleId,
                  msg: {
                    wasm: {
                      execute: {
                        contract_addr: rbamAddress,
                        msg: encodeJsonToBase64({
                          assign: {
                            assign: [
                              {
                                addr: 'regen16fcl8s0qcvyjsp9jmnzvvjr2jpgrvegwz3smq0',
                                role_id: 9,
                              },
                            ],
                          },
                        }),
                        funds: [],
                      },
                    },
                  },
                },
              ],
            },
          },
          2,
          undefined,
          [],
        );
        console.log('exaddRes', exaddRes);
      } catch (error) {
        console.error('error', error);
      }
    },
    [],
  );
  return { updateMembers };
};
