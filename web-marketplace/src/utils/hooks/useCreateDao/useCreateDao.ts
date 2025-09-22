import { useWallet } from 'lib/wallet/wallet';
import { ledgerRPCUri } from 'lib/ledger';
import {
  encodeJsonToBase64,
  organizationRoles,
  predictAddress,
} from './useCreateDao.utils';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import {
  cw4GroupCodeId,
  daoDaoCoreCodeId,
  daoVotingCw4CodeId,
  filterCodeId,
  preProposeSingleCodeId,
  proposalSingleCodeId,
  protobufRegistryCodeId,
  rbamCodeId,
} from './useCreateDao.constants';
import { GasPrice } from '@cosmjs/stargate';

export const retry = async <T extends unknown>(
  tries: number,
  callback: (
    attempt: number,
    bail: (error?: Error | string) => void,
  ) => T | Promise<T>,
  delayMs?: number,
): Promise<T> => {
  let attempt = 1;

  const bail = (error: Error | string = 'Bailed out of retry loop') => {
    attempt = tries;
    throw typeof error === 'string' ? new Error(error) : error;
  };

  while (true) {
    try {
      return await callback(attempt, bail);
    } catch (err) {
      attempt++;
      if (attempt > tries) {
        throw err;
      }

      if (delayMs) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
};

/**
 * Disclaimer: This code is still a draft and should be refactored to import utils from @dao-dao/* packages.
 * A custom React hook that provides a function to create a DAO
 * @returns A function to create a DAO using the connected wallet.
 */
export const useCreateDao = () => {
  const { wallet } = useWallet();

  const fetch = async () => {
    const client = await SigningCosmWasmClient.connect(ledgerRPCUri);

    const limit = 1;
    let items: any[] = [];
    let startAfter: string | undefined;
    while (true) {
      const itemsPage = await client.queryContractSmart(
        'regen1euhg5w32yqqa8apshxfu48rx7ggzk0w6jaa99atuflcnsx6hw9vsvz549z',
        {
          list_items: {
            start_after: startAfter,
            limit,
          },
        },
      );
      console.log('itemsPage', itemsPage);

      items.push(...itemsPage);
      if (itemsPage.length < limit) {
        break;
      }
      startAfter =
        itemsPage.length > 0 ? itemsPage[itemsPage.length - 1][0] : undefined;
      console.log('startAfter', startAfter);
    }
    console.log('items', items);

    // while (true) {
    //   const res = await client.queryContractSmart(
    //     'regen1662uxvyc9rvdyc6yuategfj2xzpex6yjgjww7ymws0ft5x29fsts4lsv5z',
    //     {
    //       list_items: {
    //         start_after: startAfterRole,
    //         limit,
    //       },
    //     },
    //   );
    //   console.log('res', res);
    //   roles.push(...rolesPage);
    //   if (rolesPage.length < limit) {
    //     break;
    //   }
    //   startAfterRole =
    //     rolesPage.length > 0 ? rolesPage[rolesPage.length - 1].id : undefined;
    // }
    // console.log('roles', roles);
  };
  const createDao = async () => {
    if (wallet?.offlineSigner) {
      const client = await SigningCosmWasmClient.connectWithSigner(
        ledgerRPCUri,
        wallet?.offlineSigner,
        { gasPrice: GasPrice.fromString('0.025uregen') },
      );
      // TODO: We should query this instead based on CwAdminFactory code id.
      const cwAdminFactoryAddr =
        'regen1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysp76v39';

      const { salt: daoSalt, predictedAddress: daoAddress } =
        await predictAddress({
          client,
          codeId: daoDaoCoreCodeId,
          creator: cwAdminFactoryAddr,
        });
      console.log('daoAddress', daoAddress);

      const { salt: daoVotingCw4Salt, predictedAddress: daoVotingCw4Address } =
        await predictAddress({
          client,
          codeId: daoVotingCw4CodeId,
          creator: daoAddress,
        });
      const { salt: cw4GroupSalt, predictedAddress: cw4GroupAddress } =
        await predictAddress({
          client,
          codeId: cw4GroupCodeId,
          creator: daoVotingCw4Address,
        });
      console.log('cw4GroupAddress', cw4GroupAddress);

      const { salt: rbamSalt, predictedAddress: rbamAddress } =
        await predictAddress({
          client,
          codeId: rbamCodeId,
          creator: daoAddress,
        });
      console.log('rbamAddress', rbamAddress);

      const proposalModules = [
        {
          admin: { core_module: {} },
          code_id: rbamCodeId,
          label: `dao-rbam_${Date.now()}`,
          msg: encodeJsonToBase64({
            dao: daoAddress,
            filter_code_id: filterCodeId,
            initial_roles: organizationRoles(
              wallet?.address,
              daoAddress,
              cw4GroupAddress,
              rbamAddress,
            ),
            protobuf_registry_code_id: protobufRegistryCodeId,
          }),
          funds: [],
          salt: rbamSalt,
        },
        {
          admin: { core_module: {} },
          code_id: proposalSingleCodeId,
          label: `dao-proposal-single_${Date.now()}`,
          msg: encodeJsonToBase64({
            allow_revoting: false,
            close_proposal_on_execution_failure: true,
            max_voting_period: { time: 604800 },
            only_members_execute: true,
            pre_propose_info: {
              module_may_propose: {
                info: {
                  admin: { core_module: {} },
                  code_id: preProposeSingleCodeId,
                  label: `dao-pre-propose-single_${Date.now()}`,
                  msg: encodeJsonToBase64({
                    deposit_info: null,
                    submission_policy: {
                      specific: {
                        dao_members: true,
                        allowlist: [],
                        denylist: [],
                      },
                    },
                    extension: {},
                  }),
                  funds: [],
                },
              },
            },
            threshold: {
              threshold_quorum: {
                quorum: { percent: '0.70' },
                threshold: { majority: {} },
              },
            },
            veto: null,
          }),
          funds: [],
        },
      ];
      const votingModule = {
        admin: { core_module: {} },
        code_id: 19,
        label: `dao-voting-cw4__${Date.now()}`,
        msg: encodeJsonToBase64({
          group_contract: {
            new: {
              cw4_group_code_id: 2,
              cw4_group_salt: cw4GroupSalt,
              initial_members: [
                {
                  addr: wallet?.address,
                  weight: 1000,
                },
              ],
            },
          },
        }),
        funds: [],
        salt: daoVotingCw4Salt,
      };

      const exRes = await client.execute(
        wallet?.address,
        cwAdminFactoryAddr,
        {
          instantiate2_contract_with_self_admin: {
            code_id: daoDaoCoreCodeId,
            instantiate_msg: encodeJsonToBase64({
              admin: null,
              automatically_add_cw20s: true,
              automatically_add_cw721s: true,
              // dao_uri: config.uri,
              description: 'test dao',
              // Replace empty strings with null.
              image_url: null,
              initial_items: [
                { key: 'type', value: 'organization' },
                { key: 'banner', value: 'some_url' }, // bg_image
              ],
              initial_actions: [],
              name: 'DAO with rbam test',
              proposal_modules_instantiate_info: proposalModules,
              voting_module_instantiate_info: votingModule,
            }),
            label: `Regen DAO with RBAM ${Date.now()}`,
            salt: daoSalt,
            expect: daoAddress,
          },
        },
        2,
        undefined,
        [],
      );
      console.log('exRes', exRes);
    }
  };
  return { createDao, fetch };
};
