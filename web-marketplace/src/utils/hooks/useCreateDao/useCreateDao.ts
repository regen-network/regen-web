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
import { v1 as uuidv1 } from 'uuid';

/**
 * Disclaimer: This code is still a draft and should be refactored to import utils from @dao-dao/* packages.
 * A custom React hook that provides a function to create a DAO
 * @returns A function to create a DAO using the connected wallet.
 */
export const useCreateDao = () => {
  const { wallet } = useWallet();

  const createDao = async () => {
    if (wallet?.offlineSigner) {
      const orgId = uuidv1();
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
                  weight: 1,
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
              image_url: null,
              initial_items: [
                { key: 'website_link', value: 'https://www.regen.network/' }, // website_url
                { key: 'organization_id', value: orgId },
                { key: 'type', value: 'organization' },
                {
                  key: 'cw4_group_address',
                  value: cw4GroupAddress,
                }, // cw4_group
                { key: 'dao_rbam_address', value: rbamAddress }, // rbac
                // bg_image
              ],
              initial_actions: [],
              name: `DAO with rbam test ${Date.now()}`,
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

      // const rbamAddress =
      //   'regen1egdjm4y5d6v3swdgzlz4ae5x6hl6fku85ukucytvqpep69ccrfss2cuala';
      // const cw4GroupAddress =
      //   'regen1hj6kv0h8zzfnjp0wkgre7wffvee97tmc009skc5rm3nd45sj567qc0r73g';
      // const q = await client.queryContractSmart(rbamAddress, {
      //   list_roles: {},
      // });
      // console.log('dao info', q);
      // const q1 = await client.queryContractSmart(
      //   'regen1a7nmn2z9q9qxpv8hs0c5r73pukn5xex7ttcqd98fv6mz6k0xjjcq8eum77',
      //   {
      //     list_authorizations: {},
      //   },
      // );
      // console.log('dao list_authorizations_by_role', q1);

      // const q3 = await client.queryContractSmart(cw4GroupAddress, {
      //   list_members: {},
      // });
      // console.log('dao members', q3);
      return;
      try {
        console.log('Adding member to RBAM contract');
        const exaddRes = await client.execute(
          wallet?.address,
          rbamAddress,
          {
            execute_actions: {
              actions: [
                {
                  authorization_id: 10,
                  role_id: 9,
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
                  authorization_id: 10,
                  role_id: 9,
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
    }
  };
  return { createDao, fetch };
};
