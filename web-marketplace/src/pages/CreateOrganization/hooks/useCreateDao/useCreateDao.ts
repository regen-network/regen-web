import { useCallback, useState } from 'react';

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { toUtf8 } from '@cosmjs/encoding';
import { GasPrice, StdFee } from '@cosmjs/stargate';

import { ledgerRPCUri } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

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
import {
  encodeJsonToBase64,
  organizationRoles,
  predictAddress,
} from './useCreateDao.utils';

type CreateDaoParams = {
  name: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  websiteLink?: string;
  twitterLink?: string;
};

type CreateDaoResult = {
  daoAddress: string;
  votingModuleAddress: string;
  cw4GroupAddress: string;
  rbamAddress: string;
  transactionHash: string;
};

/**
 * Disclaimer: This code is still a draft and should be refactored to import utils from @dao-dao/* packages.
 * A custom React hook that provides a function to create a DAO
 * @returns A function to create a DAO using the connected wallet.
 */
export const useCreateDao = () => {
  const { wallet } = useWallet();
  const [isCreating, setIsCreating] = useState(false);

  const createDao = useCallback(
    async (
      params: CreateDaoParams,
    ): Promise<CreateDaoResult> => {
      const walletAddress = wallet?.address?.trim();
      const offlineSigner = wallet?.offlineSigner;

      if (!offlineSigner || !walletAddress) {
        throw new Error('A connected wallet is required to create an organization.');
      }

      setIsCreating(true);

      let signingClient: SigningCosmWasmClient | undefined;

      try {
        signingClient = await SigningCosmWasmClient.connectWithSigner(
          ledgerRPCUri,
          offlineSigner,
          {
            gasPrice: GasPrice.fromString('0.025uregen'),
            overrideSignerChainId: chainInfo.chainId || undefined,
          },
        );
        if (!signingClient) {
          throw new Error('Failed to initialize signing client');
        }
        // TODO: We should query this instead based on CwAdminFactory code id.
        const cwAdminFactoryAddr =
          'regen1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysp76v39';

        const sanitizedName = params.name.trim();
        const sanitizedDescription = params.description?.trim() || null;
        const sanitizedProfileImage = params.profileImage?.trim() || null;
        const sanitizedBackgroundImage = params.backgroundImage?.trim() || null;
        const sanitizedWebsite = params.websiteLink?.trim() || null;
        const sanitizedTwitter = params.twitterLink?.trim() || null;

        const { salt: daoSalt, predictedAddress: daoAddress } = await predictAddress({
          client: signingClient as any,
          codeId: daoDaoCoreCodeId,
          creator: cwAdminFactoryAddr,
        });

        const {
          salt: daoVotingCw4Salt,
          predictedAddress: daoVotingCw4Address,
        } = await predictAddress({
          client: signingClient as any,
          codeId: daoVotingCw4CodeId,
          creator: daoAddress,
        });

        const { salt: cw4GroupSalt, predictedAddress: cw4GroupAddress } =
          await predictAddress({
            client: signingClient as any,
            codeId: cw4GroupCodeId,
            creator: daoVotingCw4Address,
          });

        const { salt: rbamSalt, predictedAddress: rbamAddress } =
          await predictAddress({
            client: signingClient as any,
            codeId: rbamCodeId,
            creator: daoAddress,
          });

        const now = Date.now();

        const proposalModules = [
          {
            admin: { core_module: {} },
            code_id: rbamCodeId,
            label: `dao-rbam_${now}`,
            msg: encodeJsonToBase64({
              dao: daoAddress,
              filter_code_id: filterCodeId,
              initial_roles: organizationRoles(
                walletAddress,
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
            label: `dao-proposal-single_${now}`,
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
                    label: `dao-pre-propose-single_${now}`,
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
          code_id: daoVotingCw4CodeId,
          label: `dao-voting-cw4__${now}`,
          msg: encodeJsonToBase64({
            group_contract: {
              new: {
                cw4_group_code_id: cw4GroupCodeId,
                cw4_group_salt: cw4GroupSalt,
                initial_members: [
                  {
                    addr: walletAddress,
                    weight: 1000,
                  },
                ],
              },
            },
          }),
          funds: [],
          salt: daoVotingCw4Salt,
        };

        const initialItems: Array<{ key: string; value: string }> = [
          { key: 'type', value: 'organization' },
        ];

        if (sanitizedBackgroundImage) {
          initialItems.push({ key: 'banner', value: sanitizedBackgroundImage });
        }

        if (sanitizedProfileImage) {
          initialItems.push({ key: 'profile_image', value: sanitizedProfileImage });
        }

        if (sanitizedWebsite) {
          initialItems.push({ key: 'website', value: sanitizedWebsite });
        }

        if (sanitizedTwitter) {
          initialItems.push({ key: 'twitter', value: sanitizedTwitter });
        }

        const executeMsg = {
          instantiate2_contract_with_self_admin: {
            code_id: daoDaoCoreCodeId,
            instantiate_msg: encodeJsonToBase64({
              admin: null,
              automatically_add_cw20s: true,
              automatically_add_cw721s: true,
              description: sanitizedDescription,
              image_url: sanitizedProfileImage,
              initial_items: initialItems,
              initial_actions: [],
              name: sanitizedName,
              proposal_modules_instantiate_info: proposalModules,
              voting_module_instantiate_info: votingModule,
            }),
            label: `Regen DAO with RBAM ${now}`,
            salt: daoSalt,
            expect: daoAddress,
          },
        };

        const fee: StdFee = {
          amount: [
            {
              amount: '20000',
              denom: 'uregen',
            },
          ],
          gas: '800000',
        };

        const executeResult = await signingClient.execute(
          walletAddress,
          cwAdminFactoryAddr,
          executeMsg,
          fee,
        );

        // ExecuteResult from SigningCosmWasmClient already throws on error

        return {
          daoAddress,
          votingModuleAddress: daoVotingCw4Address,
          cw4GroupAddress,
          rbamAddress,
          transactionHash: executeResult.transactionHash,
        };
      } finally {
        setIsCreating(false);
        await signingClient?.disconnect();
      }
    },
    [wallet?.address, wallet?.offlineSigner],
  );

  return { createDao, isCreating };
};
