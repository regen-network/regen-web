import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getExecuteActionsWasm,
  getMsgExecuteContract,
  WasmExecuteAction,
} from 'utils/cosmwasm';

import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';

import { sanitizeDaoParams } from 'pages/CreateOrganization/hooks/useCreateDao/useCreateDao.utils';
import {
  DEFAULT_PROFILE_BG,
  PROFILE_S3_PATH,
} from 'pages/Dashboard/Dashboard.constants';
import { useDashboardContext } from 'pages/Dashboard/Dashboard.context';
import { orgRoles } from 'hooks/org-members/constants';
import useMsgClient from 'hooks/useMsgClient';

type UpdateOrganizationProfileParams = {
  daoAddress: string;
  rbamAddress: string;
  organizationId?: string;
  values: {
    name: string;
    description?: string;
    profileImage?: string;
    backgroundImage?: string;
    websiteLink?: string;
    twitterLink?: string;
  };
  currentValues?: {
    description?: string | null;
    profileImage?: string | null;
    backgroundImage?: string | null;
    websiteLink?: string | null;
    twitterLink?: string | null;
  };
};

type DaoConfigQuery = {
  config?: {
    name?: string;
    description?: string | null;
    image_url?: string | null;
    automatically_add_cw20s?: boolean;
    automatically_add_cw721s?: boolean;
    dao_uri?: string | null;
  };
};

export const useUpdateOrganizationProfile = () => {
  const queryClient = useQueryClient();
  const { organizationRole } = useDashboardContext();
  const { wallet, signAndBroadcast } = useMsgClient();
  const { signingCosmWasmClient } = useLedger();
  const { activeAccountId } = useAuth();

  return useCallback(
    async ({
      daoAddress,
      rbamAddress,
      organizationId,
      values,
      currentValues,
    }: UpdateOrganizationProfileParams) => {
      if (!wallet?.address) {
        throw new Error('Wallet not connected.');
      }

      const normalizedRole = organizationRole?.toLowerCase() as
        | keyof typeof orgRoles
        | undefined;
      const roleConfig = normalizedRole ? orgRoles[normalizedRole] : undefined;
      const authorizationId = roleConfig?.authorizations.can_edit_organization;
      const roleId = roleConfig?.roleId;

      if (!authorizationId || !roleId) {
        throw new Error(
          'You do not have permission to edit this organization.',
        );
      }

      const organizationIdentifier = organizationId ?? daoAddress;

      let existingConfig: DaoConfigQuery | undefined;
      if (signingCosmWasmClient) {
        try {
          existingConfig = (await signingCosmWasmClient.queryContractSmart(
            daoAddress,
            { config: {} },
          )) as DaoConfigQuery;
        } catch (error) {
          existingConfig = undefined;
        }
      }

      const {
        sanitizedName,
        sanitizedDescription,
        sanitizedProfileImage,
        sanitizedBackgroundImage,
        sanitizedWebsite,
        sanitizedTwitter,
      } = sanitizeDaoParams({
        name: values.name,
        description: values.description,
        profileImage: values.profileImage,
        backgroundImage: values.backgroundImage,
        websiteLink: values.websiteLink,
        twitterLink: values.twitterLink,
        organizationId: organizationIdentifier,
        currentAccountId: organizationIdentifier ?? activeAccountId ?? '',
        profileBasePath: PROFILE_S3_PATH,
      });

      const currentConfig = existingConfig?.config ?? {};

      const updateConfigAction = {
        authorizationId,
        roleId,
        contract: daoAddress,
        msg: {
          update_config: {
            config: {
              name: sanitizedName,
              description:
                sanitizedDescription ?? currentConfig.description ?? '',
              image_url:
                sanitizedProfileImage ?? currentConfig.image_url ?? null,
              automatically_add_cw20s:
                currentConfig.automatically_add_cw20s ?? true,
              automatically_add_cw721s:
                currentConfig.automatically_add_cw721s ?? true,
              dao_uri: currentConfig.dao_uri ?? null,
            },
          },
        },
      };

      const actions: WasmExecuteAction[] = [updateConfigAction];

      const maybeAddMetadataAction = (
        key: 'banner' | 'website_link' | 'twitter_link',
        nextValue: string | null,
        previousValue?: string | null,
      ) => {
        const normalizedNext = nextValue ?? null;
        let normalizedPrevious = previousValue ?? null;

        if (key === 'banner') {
          if (normalizedNext === DEFAULT_PROFILE_BG) {
            normalizedPrevious = DEFAULT_PROFILE_BG;
          }
          if (normalizedPrevious === DEFAULT_PROFILE_BG) {
            normalizedPrevious = null;
          }
        }

        if (normalizedNext === normalizedPrevious) return;

        if (normalizedNext) {
          actions.push({
            authorizationId,
            roleId,
            contract: daoAddress,
            msg: {
              set_item: {
                key,
                value: normalizedNext,
              },
            },
          });
          return;
        }

        if (normalizedPrevious) {
          actions.push({
            authorizationId,
            roleId,
            contract: daoAddress,
            msg: {
              remove_item: {
                key,
              },
            },
          });
        }
      };

      maybeAddMetadataAction(
        'banner',
        sanitizedBackgroundImage,
        currentValues?.backgroundImage ?? null,
      );
      maybeAddMetadataAction(
        'website_link',
        sanitizedWebsite,
        currentValues?.websiteLink ?? null,
      );
      maybeAddMetadataAction(
        'twitter_link',
        sanitizedTwitter,
        currentValues?.twitterLink ?? null,
      );

      const executeActionsMsg = getExecuteActionsWasm(actions);
      const executeMsg = getMsgExecuteContract({
        walletAddress: wallet.address,
        contract: rbamAddress,
        executeActionsMsg,
      });

      const result = await signAndBroadcast({
        msgs: [executeMsg],
        fee: 'auto',
      });

      if (typeof result === 'string') {
        throw new Error(result);
      }

      // allow indexer to persist the latest RBAM metadata before refetching
      await new Promise(resolve => setTimeout(resolve, 2000));

      await queryClient.invalidateQueries({
        queryKey: ['organization-profile', daoAddress],
      });

      await queryClient.invalidateQueries({
        queryKey: ['dao-config', daoAddress],
      });
    },
    [
      organizationRole,
      queryClient,
      signAndBroadcast,
      wallet?.address,
      signingCosmWasmClient,
      activeAccountId,
    ],
  );
};
