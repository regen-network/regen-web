import { useCallback } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { EncodeObject } from '@cosmjs/proto-signing';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { MsgSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import { MsgSend_SendCredits } from '@regen-network/api/regen/ecocredit/v1/tx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import {
  CREATE_ORG_CW_ADMIN_FACTORY_ADDRESS_ERROR,
  CREATE_ORG_DAO_ADDRESS_REQUIRED_ERROR,
  CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR,
  CREATE_ORG_SIGNING_CLIENT_ERROR,
  CREATE_ORG_WALLET_REQUIRED_ERROR,
} from 'legacy-pages/CreateOrganization/CreateOrganization.constants';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import {
  getExecuteActionsStargate,
  getMsgExecuteContract,
} from 'utils/cosmwasm';
import { postData } from 'utils/fetch/postData';
import { timer } from 'utils/timer';

import {
  useUpdateProjectByIdMutation,
  useUpdateSellOrderMutation,
} from 'generated/graphql';
import { QueryClient, useLedger } from 'ledger';
import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { ledgerRPCUri } from 'lib/ledger';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminKey } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin.constants';
import { getSellOrdersBySellerQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery';
import { getSellOrdersBySellerKey } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery.utils';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { FormValues } from 'components/organisms/MigrateProjects/MigrateProjects.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { orgRoles } from 'hooks/org-members/constants';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import useMsgClient from 'hooks/useMsgClient';

import {
  CODE_IDS,
  cwAdminFactoryAddr,
} from '../useCreateDao/useCreateDao.constants';
import {
  encodeJsonToBase64,
  getProposalModules,
  getVotingModule,
  predictAllAddresses,
} from '../useCreateDao/useCreateDao.utils';
import { OrganizationMultiStepData } from '../useOrganizationFlow';
import { getSelectedCardSellOrdersWithNewIds } from './useMigrateProjects.utils';

export const useMigrateProjects = (projects: NormalizeProject[]) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { queryClient, signingCosmWasmClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { handleSaveNext, data } = useMultiStep<OrganizationMultiStepData>();
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const { signAndBroadcast } = useMsgClient();
  const dao = useDaoOrganization();
  const { activeAccountId, activeAccount, privActiveAccount } = useAuth();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const [updateSellOrder] = useUpdateSellOrderMutation();
  const [updateProject] = useUpdateProjectByIdMutation();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: sellOrdersData, isLoading: isLoadingSellOrders } = useQuery(
    getSellOrdersBySellerQuery({
      enabled: !!queryClient && !!wallet?.address,
      client: queryClient as QueryClient,
      reactQueryClient,
      sellerAddress: wallet?.address as string,
    }),
  );

  const { refetch } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId,
      languageCode: selectedLanguage,
    }),
  );

  const { credits, reloadBalances, isLoadingCredits } = useFetchEcocredits({
    isPaginatedQuery: false,
  });

  const updateOffChainProjectAdmin = useCallback(
    async (
      selectedProjectsWithAddresses: (NormalizeProject & {
        dao: { address: string };
      })[],
    ) => {
      // First we need to make sure that the project daos have been indexed off-chain
      let stop = false;
      let i = 0;
      let indexedDaos: Record<string, boolean> = {};
      while (!stop && i < 10) {
        const res = await refetch();
        res.data?.accountById?.daosByAssignmentAccountIdAndDaoAddress.nodes.forEach(
          dao => {
            if (!dao) return;
            if (
              selectedProjectsWithAddresses.find(
                p => p.dao.address === dao.address,
              )
            ) {
              indexedDaos[dao.address] = true;
            }
          },
        );
        // Check if all daos have been indexed
        stop = selectedProjectsWithAddresses.every(
          project => indexedDaos[project.dao.address],
        );
        if (stop) break;
        await timer(1000);
        i++;
      }
      if (!stop) {
        setErrorBannerText(
          _(msg`Timed out waiting for project DAOs to be indexed.`),
        );
        return;
      }

      const updateOffChainAdminRes = await Promise.allSettled(
        selectedProjectsWithAddresses.map(async project => {
          await updateProject({
            variables: {
              input: {
                id: project.offChainId,
                projectPatch: {
                  adminAccountId: null,
                  adminDaoAddress: project.dao.address,
                },
              },
            },
          });
        }),
      );
      updateOffChainAdminRes.forEach((result, idx) => {
        if (result.status === 'rejected') {
          setErrorBannerText(
            _(
              msg`Updating Offchain Project ${selectedProjectsWithAddresses[idx].offChainId} failed: ${result.reason}`,
            ),
          );
        }
      });
    },
    [setErrorBannerText, updateProject, _, refetch],
  );

  const updateCardSellOrders = useCallback(
    async (
      selectedCardSellOrders: ReturnType<
        typeof getSelectedCardSellOrdersWithNewIds
      >,
      sellerDaoAddress: string,
    ) => {
      const updateOrdersRes = await Promise.allSettled(
        selectedCardSellOrders.map(async cardOrder => {
          if (!cardOrder.newId) return Promise.resolve();
          await updateSellOrder({
            variables: {
              input: {
                onChainId: cardOrder.id,
                sellOrderPatch: {
                  sellerDaoAddress,
                  sellerAccountId: null,
                  onChainId: cardOrder.newId,
                },
              },
            },
          });
        }),
      );
      updateOrdersRes.forEach((result, idx) => {
        if (result.status === 'rejected') {
          setErrorBannerText(
            _(
              msg`Updating Card Order ${selectedCardSellOrders[idx].id} failed: ${result.reason}`,
            ),
          );
        }
      });
    },
    [setErrorBannerText, updateSellOrder, _],
  );

  const reloadData = useCallback(async () => {
    if (wallet?.address) {
      await reactQueryClient.invalidateQueries({
        queryKey: [GET_ACCOUNTS_QUERY_KEY],
        refetchType: 'all',
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getSellOrdersBySellerKey(wallet?.address),
        refetchType: 'all',
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectsByAdminKey({
          admin: wallet?.address,
        }),
        refetchType: 'all',
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getAccountProjectsByIdQueryKey({
          id: activeAccountId,
        }),
        refetchType: 'all',
      });
      reloadBalances();
    }
  }, [reactQueryClient, wallet?.address, activeAccountId, reloadBalances]);

  const migrateProjects = useCallback(
    async (values: FormValues) => {
      if (isLoadingSellOrders || isLoadingCredits) {
        // prevent submission while loading data
        return;
      }
      const walletAddress = wallet?.address;
      if (!walletAddress) {
        throw new Error(_(CREATE_ORG_WALLET_REQUIRED_ERROR));
      }
      if (!signingCosmWasmClient) {
        throw new Error(_(CREATE_ORG_SIGNING_CLIENT_ERROR));
      }
      const organizationId = data.dao?.organizationId;
      if (!organizationId) {
        throw new Error(_(CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR));
      }
      if (!dao) {
        throw new Error(_(CREATE_ORG_DAO_ADDRESS_REQUIRED_ERROR));
      }
      if (!cwAdminFactoryAddr) {
        throw new Error(_(CREATE_ORG_CW_ADMIN_FACTORY_ADDRESS_ERROR));
      }

      const projectIds = values.selectedProjectIds;
      if (projectIds.length > 0) {
        setProcessingModalAtom(atom => void (atom.open = true));
        const selectedProjects = projects.filter(project =>
          projectIds.includes(project.id),
        );

        const onChainProjectIds = projects
          .filter(
            project => projectIds.includes(project.id) && !project.offChain,
          )
          .map(project => project.id);

        const selectedCredits = credits.filter(credit => {
          const projectId = credit.projectId;
          return projectId && onChainProjectIds.includes(projectId);
        });

        const selectedSellOrders =
          sellOrdersData?.filter(order => {
            const credits = selectedCredits.find(
              credits => credits.denom === order.batchDenom,
            );
            return !!credits;
          }) || [];

        // Preparing msgs:
        // 1. Cancel selected sell orders so we can send previously escrowed credits
        const cancelSellOrdersMsgs = selectedSellOrders?.map(order =>
          regen.ecocredit.marketplace.v1.MessageComposer.withTypeUrl.cancelSellOrder(
            {
              seller: walletAddress,
              sellOrderId: order.id,
            },
          ),
        );

        // 2. Create project DAOs msgs
        const selectedProjectsWithAddresses = await Promise.all(
          selectedProjects.map(async project => {
            const { dao, daoVotingCw4, cw4Group, rbam } =
              await predictAllAddresses({
                client: signingCosmWasmClient,
                queryClient: reactQueryClient,
                rpcEndpoint: ledgerRPCUri,
                adminFactoryAddress: cwAdminFactoryAddr as string,
                daoCoreCodeId: CODE_IDS.daoCore,
                daoVotingCw4CodeId: CODE_IDS.votingCw4,
                cw4GroupCodeId: CODE_IDS.cw4Group,
                rbamCodeId: CODE_IDS.rbam,
              });
            return { ...project, dao, daoVotingCw4, cw4Group, rbam };
          }),
        );

        const createDaosMsgs = selectedProjectsWithAddresses.map(project => {
          const now = Date.now();

          const proposalModules = getProposalModules({
            daoType: 'project',
            walletAddress,
            daoAddress: project.dao.address,
            cw4GroupAddress: project.cw4Group.address,
            rbamAddress: project.rbam.address,
            rbamSalt: project.rbam.salt,
            now,
          });

          const votingModule = getVotingModule({
            walletAddress,
            cw4GroupSalt: project.cw4Group.salt,
            daoVotingCw4Salt: project.daoVotingCw4.salt,
            now,
          });

          const instantiatePayload = {
            admin: null,
            automatically_add_cw20s: true,
            automatically_add_cw721s: true,
            description: '',
            image_url: project.imgSrc || '',
            initial_items: [
              { key: 'organization_id', value: organizationId },
              { key: 'project_id', value: project.offChainId },
              { key: 'type', value: 'project' },
              { key: 'dao_rbam_address', value: project.rbam.address },
              { key: 'cw4_group_address', value: project.cw4Group.address },
            ],
            initial_actions: [],
            name: project.name || project.id,
            proposal_modules_instantiate_info: proposalModules,
            voting_module_instantiate_info: votingModule,
          };

          const executeMsg = {
            instantiate2_contract_with_self_admin: {
              code_id: CODE_IDS.daoCore,
              instantiate_msg: encodeJsonToBase64(instantiatePayload),
              label: ['dao', 'rbam', String(now)].join('-'),
              salt: project.dao.salt,
              expect: project.dao.address,
            },
          };
          return getMsgExecuteContract({
            walletAddress,
            contract: cwAdminFactoryAddr as string,
            executeActionsMsg: executeMsg,
          });
        });

        // 3. Send selected credits to organization dao address
        const sendCreditsMsg =
          selectedCredits.length > 0
            ? regen.ecocredit.v1.MessageComposer.withTypeUrl.send({
                sender: walletAddress,
                recipient: dao.address,
                credits: selectedCredits
                  .map(credits => {
                    if (!credits.balance) return null;
                    return {
                      batchDenom: credits.denom,
                      tradableAmount: (
                        Number(credits.balance.tradableAmount) +
                        Number(credits.balance.escrowedAmount)
                      ).toFixed(6),
                      retiredAmount: '',
                      retirementJurisdiction: '',
                      retirementReason: '',
                    };
                  })
                  .filter(Boolean) as MsgSend_SendCredits[],
              })
            : undefined;

        // 4. Update on chain projects admin to new DAO addresses
        const updateProjectAdminMsgs = selectedProjectsWithAddresses
          .map(project => {
            // If project is only off chain, there's no on chain admin to update
            if (project.offChain) return null;
            return regen.ecocredit.v1.MessageComposer.withTypeUrl.updateProjectAdmin(
              {
                admin: walletAddress,
                newAdmin: project.dao.address,
                projectId: project.id,
              },
            );
          })
          .filter(Boolean);

        // 5. Through the org DAO, recreate sell orders for credits that were previously listed
        let sellExecuteMsg:
          | ReturnType<typeof getMsgExecuteContract>
          | undefined;
        if (selectedSellOrders.length > 0) {
          // Encode MsgSell to protobuf bytes
          const protoBytes = MsgSell.encode({
            seller: dao.address,
            orders: selectedSellOrders.map(order => ({
              batchDenom: order.batchDenom,
              quantity: order.quantity,
              askPrice: {
                denom: order.askDenom,
                amount: order.askAmount,
              },
              disableAutoRetire: order.disableAutoRetire,
              expiration: order.expiration,
            })),
          }).finish();

          const executeActionsMsg = getExecuteActionsStargate([
            {
              authorizationId: orgRoles.owner.authorizations
                .can_manage_sell_orders as number,
              roleId: orgRoles.owner.roleId,
              typeUrl: MsgSell.typeUrl,
              value: protoBytes,
            },
          ]);

          sellExecuteMsg = getMsgExecuteContract({
            walletAddress,
            contract: dao.daoRbamAddress,
            executeActionsMsg,
          });
        }

        const msgs = [
          ...cancelSellOrdersMsgs,
          ...createDaosMsgs,
          sendCreditsMsg,
          ...updateProjectAdminMsgs,
          sellExecuteMsg,
        ].filter(Boolean) as EncodeObject[];

        await signAndBroadcast(
          {
            msgs,
            fee: 2,
          },
          undefined,
          {
            onSuccess: async deliverTxResponse => {
              // Update off-chain projects admin to new DAO addresses
              await updateOffChainProjectAdmin(selectedProjectsWithAddresses);

              // Update card sell orders
              const selectedCardSellOrders =
                getSelectedCardSellOrdersWithNewIds(
                  deliverTxResponse,
                  selectedSellOrders,
                  selectedProjects,
                  walletAddress,
                );
              await updateCardSellOrders(selectedCardSellOrders, dao.address);

              // Transfer stripe connect settings to DAO
              if (
                privActiveAccount?.can_use_stripe_connect &&
                activeAccount?.stripeConnectedAccountId &&
                token
              ) {
                try {
                  await postData({
                    url: `${apiUri}/marketplace/v1/stripe/transfer-account`,
                    data: { daoAddress: dao.address },
                    token,
                    retryCsrfRequest,
                    parseTextResponse: true,
                  });
                } catch (error) {
                  setErrorBannerText(String(error));
                }
              }

              await reloadData();

              setProcessingModalAtom(atom => void (atom.open = false));
              handleSaveNext({ ...data, ...values });
            },
            onError: error => {
              setProcessingModalAtom(atom => void (atom.open = false));
              setErrorBannerText(String(error));
              return;
            },
          },
        );
      } else handleSaveNext({ ...data, ...values });
    },
    [
      projects,
      handleSaveNext,
      data,
      _,
      credits,
      setErrorBannerText,
      isLoadingCredits,
      isLoadingSellOrders,
      sellOrdersData,
      wallet?.address,
      signingCosmWasmClient,
      reactQueryClient,
      signAndBroadcast,
      dao,
      setProcessingModalAtom,
      token,
      retryCsrfRequest,
      privActiveAccount,
      activeAccount,
      reloadData,
      updateOffChainProjectAdmin,
      updateCardSellOrders,
    ],
  );

  return { migrateProjects };
};
