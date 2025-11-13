import { useCallback } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { sanitizeDaoParams } from 'legacy-pages/CreateOrganization/hooks/useCreateDao/useCreateDao.utils';
import {
  DEFAULT_PROFILE_BG,
  PROFILE_S3_PATH,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import { useDashboardContext } from 'legacy-pages/Dashboard/Dashboard.context';
import {
  getExecuteActionsWasm,
  getMsgExecuteContract,
  WasmExecuteAction,
} from 'utils/cosmwasm';
import { timer } from 'utils/timer';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';
import { orgRoles } from 'hooks/org-members/constants';
import useMsgClient from 'hooks/useMsgClient';

type UpdateOrganizationProfileParams = {
  daoAddress: string;
  rbamAddress: string;
  organizationId?: string;
  values: EditProfileFormSchemaType;
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
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { activeAccountId, activeAccount } = useAuth();
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { refetch } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient as ApolloClient<NormalizedCacheObject>,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId ?? '',
      languageCode: selectedLanguage,
    }),
  );

  return useCallback(
    async ({
      daoAddress,
      rbamAddress,
      organizationId,
      values,
      currentValues,
    }: UpdateOrganizationProfileParams) => {
      if (!wallet?.address) {
        throw new Error(_(msg`Wallet not connected.`));
      }

      const normalizedRole = organizationRole?.toLowerCase();
      const isValidOrgRole = (
        role: string | undefined,
      ): role is keyof typeof orgRoles => {
        return !!role && role in orgRoles;
      };

      if (!isValidOrgRole(normalizedRole)) {
        const roleName = organizationRole ?? '';
        throw new Error(
          _(
            msg`Invalid organization role: ${roleName}. Only Owner, Admin, Editor, and Viewer can edit organizations.`,
          ),
        );
      }

      const roleConfig = orgRoles[normalizedRole];
      const authorizationId = roleConfig?.authorizations.can_edit_organization;
      const roleId = roleConfig?.roleId;

      if (!authorizationId || !roleId) {
        throw new Error(
          _(msg`You do not have permission to edit this organization.`),
        );
      }

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
        organizationId: daoAddress,
        currentAccountId: daoAddress,
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

      const maxAttempts = 15;
      const pollInterval = 500;
      let attempts = 0;
      let indexerUpdated = false;

      while (attempts < maxAttempts && !indexerUpdated) {
        attempts++;
        await timer(pollInterval);

        try {
          const { data } = await refetch();

          const dao =
            data?.accountById?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.find(
              node =>
                node?.address === daoAddress ||
                (organizationId &&
                  node?.organizationByDaoAddress?.id === organizationId),
            );

          const organization = dao?.organizationByDaoAddress;

          const nameMatches = organization?.name === sanitizedName;

          const descriptionMatches =
            organization?.description === sanitizedDescription;

          const profileImageMatches =
            organization?.image === sanitizedProfileImage;

          const backgroundImageMatches =
            organization?.bgImage === sanitizedBackgroundImage;

          const websiteMatches = organization?.websiteLink === sanitizedWebsite;

          const twitterMatches = organization?.twitterLink === sanitizedTwitter;
          if (
            nameMatches &&
            descriptionMatches &&
            profileImageMatches &&
            backgroundImageMatches &&
            websiteMatches &&
            twitterMatches
          ) {
            indexerUpdated = true;
          }
        } catch (error) {
          continue;
        }
      }
    },
    [
      organizationRole,
      signAndBroadcast,
      wallet?.address,
      signingCosmWasmClient,
      _,
      refetch,
    ],
  );
};
