import { useWallet } from 'lib/wallet/wallet';
import { instantiate2Address } from '@cosmjs/cosmwasm-stargate';
import { ledgerRPCUri } from 'lib/ledger';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';
import { organizationRoles } from './useCreateDao.utils';
import { nanoid } from 'nanoid';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { toBase64, toUtf8, fromHex } from '@cosmjs/encoding';

/**
 * Disclaimer: This code is still a draft and should be refactored to import utils from @dao-dao/* packages.
 * A custom React hook that provides a function to create a DAO
 * @returns A function to create a DAO using the connected wallet.
 */
export const useCreateDao = () => {
  const { wallet } = useWallet();
  const createDao = async () => {
    if (wallet?.offlineSigner) {
      const client = await SigningCosmWasmClient.connectWithSigner(
        ledgerRPCUri,
        wallet?.offlineSigner,
        { gasPrice: { amount: 0.025 } },
      );

      const salt = nanoid();
      const cwAdminFactoryAddr =
        'regen1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysp76v39';
      const daoDaoCoreCodeId = 6;

      const codeDetails = await client.getCodeDetails(daoDaoCoreCodeId);
      const predictedDaoAddress = instantiate2Address(
        fromHex(codeDetails?.checksum),
        cwAdminFactoryAddr,
        toUtf8(salt),
        chainInfo.bech32Config.bech32PrefixAccAddr,
      );
      console.log('predictedDaoAddress', predictedDaoAddress);

      const proposalModules = [
        {
          admin: { core_module: {} },
          code_id: 16,
          label: `dao-rbam_${Date.now()}`,
          msg: encodeJsonToBase64({
            dao: predictedDaoAddress,
            filter_code_id: 14,
            initial_roles: organizationRoles(wallet?.address),
            protobuf_registry_code_id: 15,
          }),
          funds: [],
        },
        {
          admin: { core_module: {} },
          code_id: 13,
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
                  code_id: 11,
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
                quorum: { percent: '0.20' },
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
              initial_items: [{ key: 'type', value: 'organization' }],
              initial_actions: [],
              name: 'DAO with rbam test',
              proposal_modules_instantiate_info: proposalModules,
              voting_module_instantiate_info: votingModule,
            }),
            label: `Regen DAO with RBAM ${Date.now()}`,
            salt: toBase64(toUtf8(salt)),
            expect: predictedDaoAddress,
          },
        },
        {
          amount: [
            {
              denom: 'uregen',
              amount: '5000', // TODO: what should fee and gas be?
            },
          ],
          gas: '20000000',
        },
        undefined,
        getFundsFromDaoInstantiateMsg({
          voting_module_instantiate_info: votingModule,
          proposal_modules_instantiate_info: proposalModules,
        }),
      );
      console.log('exRes', exRes);
    }
  };
  return { createDao };
};

// from dao-dao-ui

export const encodeJsonToBase64 = (object: any) =>
  toBase64(toUtf8(JSON.stringify(object)));

export const getFundsFromDaoInstantiateMsg = ({
  voting_module_instantiate_info,
  proposal_modules_instantiate_info,
}: {
  voting_module_instantiate_info: any;
  proposal_modules_instantiate_info: any;
}) => [
  ...(voting_module_instantiate_info.funds || []),
  ...proposal_modules_instantiate_info.flatMap(({ funds }) => funds || []),
];
