import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { PROFILE_S3_PATH } from 'legacy-pages/Dashboard/Dashboard.constants';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { ledgerRPCUri } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

import {
  CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR,
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
  const queryClient = useQueryClient();
  const { _ } = useLingui();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const { activeAccountId } = useAuth();

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
            code_id: CODE_IDS.daoCore,
            instantiate_msg: encodeJsonToBase64(instantiatePayload),
            label: ['dao', 'rbam', String(now)].join('-'),
            salt: daoSalt,
            expect: daoAddress,
          },
        };

        const executeResult = await signingCosmWasmClient.execute(
          walletAddress,
          cwAdminFactoryAddr,
          executeMsg,
          gasMultiplier,
        );

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
    ],
  );

  return { createDao };
};
