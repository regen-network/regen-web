import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { toUtf8 } from '@cosmjs/encoding';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';

import { QueryClient, useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { ledgerRPCUri } from 'lib/ledger';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getSellOrdersBySellerQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery';
import { useWallet } from 'lib/wallet/wallet';

import {
  CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR,
  CREATE_ORG_SIGNING_CLIENT_ERROR,
  CREATE_ORG_WALLET_REQUIRED_ERROR,
  CREATE_ORG_DAO_ADDRESS_REQUIRED_ERROR,
} from 'pages/CreateOrganization/CreateOrganization.constants';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { FormValues } from 'components/organisms/MigrateProjects/MigrateProjects.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

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
import useMsgClient from 'hooks/useMsgClient';
import { getSellOrdersBySellerKey } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery.utils';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { orgRoles } from 'hooks/org-members/constants';
import { MsgSend_SendCredits } from '@regen-network/api/regen/ecocredit/v1/tx';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { useAuth } from 'lib/auth/auth';
import { getProjectsByAdminKey } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin.constants';

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
  // TODO fetch fiat sell orders
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
        console.log('selectedCredits', selectedCredits);
        const selectedSellOrders =
          sellOrdersData?.filter(order => {
            const credits = selectedCredits.find(
              credits => credits.denom === order.batchDenom,
            );
            return !!credits;
          }) || [];
        console.log('selectedSellOrders', selectedSellOrders);

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

        // 2. Send selected credits to organization dao address
        const sendCreditsMsg =
          regen.ecocredit.v1.MessageComposer.withTypeUrl.send({
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
          });

        console.log('sendCreditsMsg', sendCreditsMsg);

        // 3. Create project DAOs msgs
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
        console.log(
          'selectedProjectsWithAddresses',
          selectedProjectsWithAddresses,
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
          return {
            typeUrl: MsgExecuteContract.typeUrl,
            value: MsgExecuteContract.fromPartial({
              sender: walletAddress,
              contract: cwAdminFactoryAddr,
              msg: toUtf8(JSON.stringify(executeMsg)),
              funds: [],
            }),
          };
        });
        console.log('createDaosMsgs', createDaosMsgs);

        // 4. Through the org DAO, recreate sell orders for credits that were previously listed
        const sellMsg =
          regen.ecocredit.marketplace.v1.MessageComposer.withTypeUrl.sell({
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
          });
        const executeActionsMsg = {
          execute_actions: {
            actions: {
              authorization_id:
                orgRoles.owner.authorizations.can_manage_sell_orders,
              role_id: orgRoles.owner.roleId,
              msg: {
                // wasm: {
                //   execute: {
                //     contract_addr: dao.daoRbamAddress,
                //     msg: encodeJsonToBase64({
                //       assign: {
                //         assign: [
                //           {
                //             addr: 'regen1dfyjl8h5k9uv3v0yjvjkpk32jmehtjkudxgc4s',
                //             role_id: 2,
                //           },
                //         ],
                //       },
                //     }),
                //     funds: [],
                //   },
                // },
                '#stargate': {
                  type_url: sellMsg.typeUrl,
                  value: {
                    seller: sellMsg.value.seller,
                    orders: sellMsg.value.orders.map(order => ({
                      batch_denom: order.batchDenom,
                      quantity: order.quantity,
                      ask_price: order.askPrice,
                      disable_auto_retire: order.disableAutoRetire,
                      expiration: order.expiration,
                    })),
                  },
                },
              },
            },
          },
        };
        console.log('executeActionsMsg', executeActionsMsg);
        const sellExecuteMsg = {
          typeUrl: MsgExecuteContract.typeUrl,
          value: MsgExecuteContract.fromPartial({
            sender: walletAddress,
            contract: dao.daoRbamAddress,
            msg: toUtf8(JSON.stringify(executeActionsMsg)),
            funds: [],
          }),
        };

        await signAndBroadcast(
          {
            msgs: [
              ...cancelSellOrdersMsgs,
              sendCreditsMsg,
              ...createDaosMsgs,
              sellExecuteMsg,
            ],
            fee: 2,
            // fee: {
            //   amount: [{ denom: 'uregen', amount: '5000' }],
            //   gas: '3000000',
            // },
          },
          undefined,
          {
            onSuccess: async deliverTxResponse => {
              console.log('deliverTxResponse', deliverTxResponse);
              // TODO transfer stripe connect settings to DAO if can_use_stripe_connect
              // TODO get sell order ids from events and update fiat sell orders in DB

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
    ],
  );
  return migrateProjects;
};
