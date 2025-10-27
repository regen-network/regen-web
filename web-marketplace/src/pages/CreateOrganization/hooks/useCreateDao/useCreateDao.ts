import { useCallback } from 'react';
import { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { ledgerRPCUri } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

import { PROFILE_S3_PATH } from 'pages/Dashboard/Dashboard.constants';

import {
  CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR,
  CREATE_ORG_SIGNING_CLIENT_ERROR,
  CREATE_ORG_WALLET_REQUIRED_ERROR,
} from '../../CreateOrganization.constants';
import {
  cw4GroupCodeId,
  cwAdminFactoryAddr,
  daoDaoCoreCodeId,
  daoVotingCw4CodeId,
  filterCodeId,
  gasMultiplier,
  preProposeSingleCodeId,
  proposalSingleCodeId,
  protobufRegistryCodeId,
  rbamCodeId,
} from './useCreateDao.constants';
import type { CreateDaoParams } from './useCreateDao.types';
import {
  encodeJsonToBase64,
  organizationRoles,
  parseCodeId,
  predictAllAddresses,
  projectRoles,
  sanitizeDaoParams,
} from './useCreateDao.utils';

export const useCreateDao = () => {
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const queryClient = useQueryClient();
  const { _ } = useLingui();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const { activeAccountId } = useAuth();

  const createDaos = useCallback(
    async (daosParams: CreateDaoParams[]) => {
      const walletAddress = wallet?.address;

      if (!activeAccountId) {
        throw new Error(_(CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR));
      }
      if (!walletAddress) {
        throw new Error(_(CREATE_ORG_WALLET_REQUIRED_ERROR));
      }
      if (!signingCosmWasmClient) {
        throw new Error(_(CREATE_ORG_SIGNING_CLIENT_ERROR));
      }

      const codeIds = {
        daoCore: parseCodeId('VITE_DAODAO_CORE_CODE_ID', daoDaoCoreCodeId),
        votingCw4: parseCodeId(
          'VITE_DAO_VOTING_CW4_CODE_ID',
          daoVotingCw4CodeId,
        ),
        cw4Group: parseCodeId('VITE_CW4_GROUP_CODE_ID', cw4GroupCodeId),
        rbam: parseCodeId('VITE_RBAM_CODE_ID', rbamCodeId),
        proposalSingle: parseCodeId(
          'VITE_PROPOSAL_SINGLE_CODE_ID',
          proposalSingleCodeId,
        ),
        preProposeSingle: parseCodeId(
          'VITE_PRE_PROPOSE_SINGLE_CODE_ID',
          preProposeSingleCodeId,
        ),
        filter: parseCodeId('VITE_FILTER_CODE_ID', filterCodeId),
        protobufRegistry: parseCodeId(
          'VITE_PROTOCOLBUF_REGISTRY_CODE_ID',
          protobufRegistryCodeId,
        ),
      };

      setProcessingModalAtom(atom => void (atom.open = true));

      try {
        const daoAddresses: string[] = [];
        const executeInstructions: ExecuteInstruction[] = [];
        for (const params of daosParams) {
          const {
            sanitizedName,
            sanitizedDescription,
            sanitizedProfileImage,
            sanitizedBackgroundImage,
            sanitizedWebsite,
            sanitizedTwitter,
          } = sanitizeDaoParams({
            name: params.name,
            description: params.description,
            profileImage: params.profileImage,
            backgroundImage: params.backgroundImage,
            websiteLink: params.websiteLink,
            twitterLink: params.twitterLink,
            organizationId: params.organizationId,
            currentAccountId: activeAccountId,
            profileBasePath: PROFILE_S3_PATH,
          });

          const { dao, daoVotingCw4, cw4Group, rbam } =
            await predictAllAddresses({
              client: signingCosmWasmClient,
              queryClient,
              rpcEndpoint: ledgerRPCUri,
              adminFactoryAddress: cwAdminFactoryAddr,
              daoCoreCodeId: codeIds.daoCore,
              daoVotingCw4CodeId: codeIds.votingCw4,
              cw4GroupCodeId: codeIds.cw4Group,
              rbamCodeId: codeIds.rbam,
            });

          const daoAddress = dao.address;
          const daoSalt = dao.salt;
          const daoVotingCw4Salt = daoVotingCw4.salt;
          const cw4GroupAddress = cw4Group.address;
          const cw4GroupSalt = cw4Group.salt;
          const rbamAddress = rbam.address;
          const rbamSalt = rbam.salt;

          const now = Date.now();

          const proposalModules = [
            {
              admin: { core_module: {} },
              code_id: codeIds.rbam,
              label: `dao-rbam_${now}`,
              msg: encodeJsonToBase64({
                dao: daoAddress,
                filter_code_id: codeIds.filter,
                initial_roles:
                  params.type === 'organization'
                    ? organizationRoles(
                        walletAddress,
                        daoAddress,
                        cw4GroupAddress,
                        rbamAddress,
                      )
                    : projectRoles(walletAddress, cw4GroupAddress, rbamAddress),
                protobuf_registry_code_id: codeIds.protobufRegistry,
              }),
              funds: [],
              salt: rbamSalt,
            },
            {
              admin: { core_module: {} },
              code_id: codeIds.proposalSingle,
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
                      code_id: codeIds.preProposeSingle,
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
            code_id: codeIds.votingCw4,
            label: `dao-voting-cw4__${now}`,
            msg: encodeJsonToBase64({
              group_contract: {
                new: {
                  cw4_group_code_id: codeIds.cw4Group,
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
            { key: 'type', value: params.type },
          ];

          if (params.organizationId) {
            initialItems.push({
              key: 'organization_id',
              value: params.organizationId,
            });
          }

          if (sanitizedBackgroundImage) {
            initialItems.push({
              key: 'banner',
              value: sanitizedBackgroundImage,
            });
          }

          if (sanitizedWebsite) {
            initialItems.push({ key: 'website_link', value: sanitizedWebsite });
          }

          if (sanitizedTwitter) {
            initialItems.push({ key: 'twitter_link', value: sanitizedTwitter });
          }

          if (params.projectId) {
            initialItems.push({ key: 'project_id', value: params.projectId });
          }

          initialItems.push({ key: 'dao_rbam_address', value: rbamAddress });
          initialItems.push({
            key: 'cw4_group_address',
            value: cw4GroupAddress,
          });

          const instantiatePayload = {
            admin: null,
            automatically_add_cw20s: true,
            automatically_add_cw721s: true,
            description: sanitizedDescription ?? '',
            image_url: sanitizedProfileImage,
            initial_items: initialItems,
            initial_actions: [],
            name: sanitizedName,
            proposal_modules_instantiate_info: proposalModules,
            voting_module_instantiate_info: votingModule,
          };

          const executeMsg = {
            instantiate2_contract_with_self_admin: {
              code_id: codeIds.daoCore,
              instantiate_msg: encodeJsonToBase64(instantiatePayload),
              label: ['dao', 'rbam', String(now)].join('-'),
              salt: daoSalt,
              expect: daoAddress,
            },
          };
          executeInstructions.push({
            contractAddress: cwAdminFactoryAddr,
            msg: executeMsg,
            funds: [],
          });
          daoAddresses.push(daoAddress);
        }

        const executeResult = await signingCosmWasmClient.executeMultiple(
          walletAddress,
          executeInstructions,
          gasMultiplier,
        );

        return daosParams.map((params, i) => ({
          daoAddress: daoAddresses[i],
          transactionHash: executeResult.transactionHash,
          organizationId: params.organizationId,
        }));
      } catch (error) {
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        setErrorBannerText(String(error));
        throw error;
      } finally {
        setProcessingModalAtom(atom => void (atom.open = false));
      }
    },
    [
      activeAccountId,
      wallet?.address,
      signingCosmWasmClient,
      setProcessingModalAtom,
      _,
      queryClient,
      setErrorBannerText,
    ],
  );

  return { createDaos };
};
