import { useCallback, useState } from 'react';
import { toUtf8 } from '@cosmjs/encoding';
import type { EncodeObject } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { i18n } from '@lingui/core';
import { useQueryClient } from '@tanstack/react-query';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { useSetAtom } from 'jotai';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { ledgerRPCUri } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

import { PROFILE_S3_PATH } from 'pages/Dashboard/Dashboard.constants';

import {
  CREATE_ORG_SIGNING_CLIENT_ERROR,
  CREATE_ORG_WALLET_REQUIRED_ERROR,
} from '../../CreateOrganization.constants';
import type { WasmCodeClient } from './useCreateDao.codeDetails';
import {
  cw4GroupCodeId,
  cwAdminFactoryAddr,
  daoDaoCoreCodeId,
  daoVotingCw4CodeId,
  defaultGasLimit,
  filterCodeId,
  gasMultiplier,
  gasPrice,
  preProposeSingleCodeId,
  proposalSingleCodeId,
  protobufRegistryCodeId,
  rbamCodeId,
} from './useCreateDao.constants';
import type { CreateDaoParams, CreateDaoResult } from './useCreateDao.types';
import {
  encodeJsonToBase64,
  organizationRoles,
  parseCodeId,
  predictAllAddresses,
  sanitizeDaoParams,
} from './useCreateDao.utils';

export const useCreateDao = () => {
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const queryClient = useQueryClient();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const [isCreating, setIsCreating] = useState(false);

  const createDao = useCallback(
    async (params: CreateDaoParams): Promise<CreateDaoResult> => {
      const walletAddress = wallet?.address?.trim();

      if (!walletAddress) {
        throw new Error(i18n._(CREATE_ORG_WALLET_REQUIRED_ERROR));
      }
      if (!signingCosmWasmClient) {
        throw new Error(i18n._(CREATE_ORG_SIGNING_CLIENT_ERROR));
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

      setIsCreating(true);
      setProcessingModalAtom(atom => void (atom.open = true));

      try {
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
          currentAccountId: params.currentAccountId,
          profileBasePath: PROFILE_S3_PATH,
        });

        const { dao, daoVotingCw4, cw4Group, rbam } = await predictAllAddresses(
          {
            client: signingCosmWasmClient as unknown as WasmCodeClient,
            queryClient,
            rpcEndpoint: ledgerRPCUri,
            adminFactoryAddress: cwAdminFactoryAddr,
            daoCoreCodeId: codeIds.daoCore,
            daoVotingCw4CodeId: codeIds.votingCw4,
            cw4GroupCodeId: codeIds.cw4Group,
            rbamCodeId: codeIds.rbam,
          },
        );

        const daoAddress = dao.address;
        const daoSalt = dao.salt;
        const daoVotingCw4Address = daoVotingCw4.address;
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
              initial_roles: organizationRoles(
                walletAddress,
                daoAddress,
                cw4GroupAddress,
                rbamAddress,
              ),
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
          { key: 'type', value: 'organization' },
        ];

        if (params.organizationId) {
          initialItems.push({
            key: 'organization_id',
            value: params.organizationId,
          });
        }

        if (sanitizedBackgroundImage) {
          initialItems.push({ key: 'banner', value: sanitizedBackgroundImage });
        }

        if (sanitizedWebsite) {
          initialItems.push({ key: 'website_link', value: sanitizedWebsite });
        }

        if (sanitizedTwitter) {
          initialItems.push({ key: 'twitter_link', value: sanitizedTwitter });
        }

        initialItems.push({ key: 'dao_rbam_address', value: rbamAddress });
        initialItems.push({
          key: 'dao_cw4_group_address',
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

        let gasLimit = defaultGasLimit;

        try {
          const simulateMsg: EncodeObject = {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: MsgExecuteContract.fromPartial({
              sender: walletAddress,
              contract: cwAdminFactoryAddr,
              msg: toUtf8(JSON.stringify(executeMsg)),
            }),
          };
          const simulatedGas = await signingCosmWasmClient.simulate(
            walletAddress,
            [simulateMsg],
            undefined,
          );
          gasLimit = Math.ceil(simulatedGas * gasMultiplier);
        } catch (simulationError) {
          /* eslint-disable no-console */
          console.warn(
            'useCreateDao: gas simulation failed, falling back to default gas limit',
            simulationError,
          );
          /* eslint-enable no-console */
        }

        const fee = calculateFee(gasLimit, GasPrice.fromString(gasPrice));

        const executeResult = await signingCosmWasmClient.execute(
          walletAddress,
          cwAdminFactoryAddr,
          executeMsg,
          fee,
        );

        /* eslint-disable no-console */
        console.log({
          useCreateDao_success: {
            daoAddress,
            transactionHash: executeResult.transactionHash,
          },
        });
        /* eslint-enable no-console */

        return {
          daoAddress,
          votingModuleAddress: daoVotingCw4Address,
          cw4GroupAddress,
          rbamAddress,
          transactionHash: executeResult.transactionHash,
          organizationId: params.organizationId,
        };
      } catch (error) {
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        setErrorBannerText(String(error));
        throw error;
      } finally {
        setIsCreating(false);
        setProcessingModalAtom(atom => void (atom.open = false));
      }
    },
    [
      wallet?.address,
      signingCosmWasmClient,
      setProcessingModalAtom,
      setErrorBannerText,
      queryClient,
    ],
  );

  return { createDao, isCreating };
};
