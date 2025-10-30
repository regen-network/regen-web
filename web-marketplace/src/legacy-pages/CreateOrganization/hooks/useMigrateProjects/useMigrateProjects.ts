import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { EventSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/events';
import { MsgSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import { MsgSend_SendCredits } from '@regen-network/api/regen/ecocredit/v1/tx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import {
  getExecuteActionsStargate,
  getMsgExecuteContract,
} from 'utils/cosmwasm';

import { QueryClient, useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { ledgerRPCUri } from 'lib/ledger';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminKey } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin.constants';
import { getSellOrdersBySellerQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery';
import { getSellOrdersBySellerKey } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery.utils';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import {
  CREATE_ORG_DAO_ADDRESS_REQUIRED_ERROR,
  CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR,
  CREATE_ORG_SIGNING_CLIENT_ERROR,
  CREATE_ORG_WALLET_REQUIRED_ERROR,
} from 'legacy-pages/CreateOrganization/CreateOrganization.constants';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
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
import { EncodeObject } from '@cosmjs/proto-signing';

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
  const { activeAccountId } = useAuth();

  const { data: sellOrdersData, isLoading: isLoadingSellOrders } = useQuery(
    getSellOrdersBySellerQuery({
      enabled: !!queryClient && !!wallet?.address,
      client: queryClient as QueryClient,
      reactQueryClient,
      sellerAddress: wallet?.address as string,
    }),
  );

  const { credits, reloadBalances, isLoadingCredits } = useFetchEcocredits({
    isPaginatedQuery: false,
  });

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
                adminFactoryAddress: cwAdminFactoryAddr,
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
            contract: cwAdminFactoryAddr,
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

        await signAndBroadcast(
          {
            msgs: [
              ...cancelSellOrdersMsgs,
              ...createDaosMsgs,
              sendCreditsMsg,
              ...updateProjectAdminMsgs,
              sellExecuteMsg,
            ].filter(Boolean) as EncodeObject[],
            fee: 2,
          },
          undefined,
          {
            onSuccess: async deliverTxResponse => {
              // TODO transfer stripe connect settings to DAO if can_use_stripe_connect

              // Get sell order ids from events
              const sellOrderIds = deliverTxResponse?.events
                .filter(
                  event => event.type === EventSell.typeUrl.replace('/', ''),
                )
                .flatMap(
                  event =>
                    event.attributes
                      .filter(attr => attr.key === 'sell_order_id')
                      .map(attr => attr.value.replace(/"/g, '')), // remove quotes if needed
                );
              console.log('sellOrderIds', sellOrderIds);
              // TODO and update fiat sell orders in DB based on new sellOrderIds

              // Reload data
              await reactQueryClient.invalidateQueries({
                queryKey: getSellOrdersBySellerKey(walletAddress),
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getProjectsByAdminKey({
                  admin: walletAddress,
                }),
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountProjectsByIdQueryKey({
                  id: activeAccountId,
                }),
              });
              reloadBalances();

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
      }
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
      activeAccountId,
      signAndBroadcast,
      dao,
      setProcessingModalAtom,
      reloadBalances,
    ],
  );
  return migrateProjects;
};
