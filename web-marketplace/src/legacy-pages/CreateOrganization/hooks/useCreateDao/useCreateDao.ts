import { useCallback } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { PROFILE_S3_PATH } from 'legacy-pages/Dashboard/Dashboard.constants';
import { getMsgExecuteContract } from 'utils/cosmwasm';
import { getRoleAuthorizationIds } from 'utils/rbam.utils';
import { timer } from 'utils/timer';

import { AccountType, useUpdateAccountByIdMutation } from 'generated/graphql';
import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  MAX_REFETCH_ATTEMPTS,
  REFETCH_DELAY_MS,
} from 'lib/constants/shared.constants';
import { ledgerRPCUri } from 'lib/ledger';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useMsgClient } from 'hooks';
import { feegrantGrantAllowanceAction } from 'hooks/org-members/utils';

import {
  CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR,
  CREATE_ORG_CW_ADMIN_FACTORY_ADDRESS_ERROR,
  CREATE_ORG_SIGNING_CLIENT_ERROR,
  CREATE_ORG_WALLET_REQUIRED_ERROR,
} from '../../CreateOrganization.constants';
import {
  CODE_IDS,
  cwAdminFactoryAddr,
  gasMultiplier,
} from './useCreateDao.constants';
import { CreateDaoParams } from './useCreateDao.types';
import {
  encodeJsonToBase64,
  getProposalModules,
  getVotingModule,
  predictAllAddresses,
  sanitizeDaoParams,
} from './useCreateDao.utils';

export const useCreateDao = () => {
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const { signAndBroadcast } = useMsgClient();
  const queryClient = useQueryClient();
  const { _ } = useLingui();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const [updateAccountById] = useUpdateAccountByIdMutation();

  const { refetch } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId,
      languageCode: selectedLanguage,
    }),
  );

  const refetchAccount = useCallback(
    async (daoAddress: string) => {
      let hasDaoOrganization = false;
      let i = 0;
      // wait for the organization dao to be indexed
      while (!hasDaoOrganization && i < MAX_REFETCH_ATTEMPTS) {
        const res = await refetch();
        const dao =
          res?.data?.accountById?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.find(
            dao => dao?.address === daoAddress,
          );
        hasDaoOrganization = !!dao;
        if (hasDaoOrganization) {
          break;
        }

        i++;
        await timer(REFETCH_DELAY_MS);
      }
      return hasDaoOrganization;
    },
    [refetch],
  );

  const createDao = useCallback(
    async (params: CreateDaoParams) => {
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
      if (!cwAdminFactoryAddr) {
        throw new Error(_(CREATE_ORG_CW_ADMIN_FACTORY_ADDRESS_ERROR));
      }

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
          currentAccountId: activeAccountId,
          profileBasePath: PROFILE_S3_PATH,
        });

        const { dao, daoVotingCw4, cw4Group, rbam } = await predictAllAddresses(
          {
            client: signingCosmWasmClient,
            queryClient,
            rpcEndpoint: ledgerRPCUri,
            adminFactoryAddress: cwAdminFactoryAddr,
            daoCoreCodeId: CODE_IDS.daoCore,
            daoVotingCw4CodeId: CODE_IDS.votingCw4,
            cw4GroupCodeId: CODE_IDS.cw4Group,
            rbamCodeId: CODE_IDS.rbam,
          },
        );

        const daoAddress = dao.address;
        const daoSalt = dao.salt;
        const daoVotingCw4Salt = daoVotingCw4.salt;
        const cw4GroupAddress = cw4Group.address;
        const cw4GroupSalt = cw4Group.salt;
        const rbamAddress = rbam.address;
        const rbamSalt = rbam.salt;

        const now = Date.now();

        const proposalModules = getProposalModules({
          daoType: params.type,
          walletAddress,
          daoAddress,
          cw4GroupAddress,
          rbamAddress,
          rbamSalt,
          now,
        });

        const votingModule = getVotingModule({
          walletAddress,
          cw4GroupSalt,
          daoVotingCw4Salt,
          now,
        });

        const initialItems: Array<{ key: string; value: string }> = [
          { key: 'type', value: params.type },
        ];

        if (params.organizationId) {
          initialItems.push({
            key: 'organization_id',
            value: params.organizationId,
          });
          // this is required to move s3 media from the current account to the new org folder
          initialItems.push({
            key: 'creator_account_id',
            value: activeAccountId,
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

        const instantiateMsg = {
          instantiate2_contract_with_self_admin: {
            code_id: CODE_IDS.daoCore,
            instantiate_msg: encodeJsonToBase64(instantiatePayload),
            label: ['dao', 'rbam', String(now)].join('-'),
            salt: daoSalt,
            expect: daoAddress,
          },
        };

        const { roleId, authorizationId } = getRoleAuthorizationIds({
          type: 'organization',
          currentUserRole: 'owner',
          authorizationName: 'can_manage_members',
        });
        const feegrantMsg = {
          execute_actions: {
            actions: [
              feegrantGrantAllowanceAction({
                daoAddress,
                authorizationId: authorizationId as number,
                roleId: roleId as number,
                memberAddress: walletAddress,
              }),
            ],
          },
        };

        const executeResult = await signAndBroadcast({
          msgs: [
            getMsgExecuteContract({
              walletAddress,
              contract: cwAdminFactoryAddr,
              executeActionsMsg: instantiateMsg,
            }),
            getMsgExecuteContract({
              walletAddress,
              contract: rbamAddress,
              executeActionsMsg: feegrantMsg,
            }),
          ],
          fee: gasMultiplier,
        });

        if (!executeResult || typeof executeResult === 'string') {
          if (!executeResult) return;
          throw new Error(executeResult);
        }

        // If user profile has been transferred to organization, empty out user profile fields
        if (params.transferHandled) {
          await updateAccountById({
            variables: {
              input: {
                id: activeAccountId,
                accountPatch: {
                  name: '',
                  description: null,
                  image: '',
                  bgImage: null,
                  type: AccountType.User,
                  twitterLink: null,
                  websiteLink: null,
                },
              },
            },
          });
          if (wallet?.address) {
            await queryClient.invalidateQueries({
              queryKey: getAccountByAddrQueryKey({ addr: wallet?.address }),
            });
          }
        }

        const hasDaoOrganization = await refetchAccount(daoAddress);
        if (!hasDaoOrganization) {
          setProcessingModalAtom(atom => void (atom.open = false));
          setErrorBannerText(
            _(
              msg`Could not find the organization associated with the created DAO. Please try refreshing the page later.`,
            ),
          );
          return;
        }
        return {
          daoAddress,
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
      refetchAccount,
      updateAccountById,
      signAndBroadcast,
    ],
  );

  return { createDao };
};
