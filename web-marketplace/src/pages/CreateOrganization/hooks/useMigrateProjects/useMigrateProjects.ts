import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

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

export const useMigrateProjects = (projects: NormalizeProject[]) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { queryClient, signingCosmWasmClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { handleSaveNext, data } = useMultiStep<OrganizationMultiStepData>();
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const {
    data: sellOrdersData,
    refetch,
    isLoading: isLoadingSellOrders,
  } = useQuery(
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

  console.log('projects', projects);

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
        setErrorBannerText(_(CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR));
        return;
      }
      const projectIds = values.selectedProjectIds;
      if (projectIds.length > 0) {
        const selectedProjects = projects.filter(project =>
          projectIds.includes(project.id),
        );
        console.log('selectedProjects', selectedProjects);

        const onChainProjectIds = projects
          .filter(
            project => projectIds.includes(project.id) && !project.offChain,
          )
          .map(project => project.id);
        console.log('onChainProjectIds', onChainProjectIds);

        const selectedCredits = credits.filter(credit => {
          const projectId = credit.projectId;
          return projectId && onChainProjectIds.includes(projectId);
        });
        console.log('selectedCredits', selectedCredits);
        const selectedSellOrders = sellOrdersData?.filter(order => {
          const credits = selectedCredits.find(
            credits => credits.denom === order.batchDenom,
          );
          return !!credits;
        });
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
        // 2. Send selected credits to projects DAO addresses
        // 2.1. Predict all DAO addresses
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
        // 2.2. Send credits msgs
        const sendCreditsMsgs = selectedCredits
          .map(credits => {
            if (!credits.balance) return null;
            const project = selectedProjectsWithAddresses.find(
              p => p.id === credits.projectId,
            );
            if (!project) return null;

            return regen.ecocredit.v1.MessageComposer.withTypeUrl.send({
              sender: walletAddress,
              recipient: project.dao.address,
              credits: [
                {
                  batchDenom: credits.denom,
                  tradableAmount: (
                    Number(credits.balance.tradableAmount) +
                    Number(credits.balance.escrowedAmount)
                  ).toFixed(6),
                  retiredAmount: '',
                  retirementJurisdiction: '',
                  retirementReason: '',
                },
              ],
            });
          })
          .filter(Boolean);
        console.log('sendCreditsMsgs', sendCreditsMsgs);

        // 3. Create project DAOs
        const executeMsgs = selectedProjectsWithAddresses.map(project => {
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
          return executeMsg;
        });
        // 4. Through the project DAOS, recreate sell orders for credits that were previously listed
        //  (account for fiat sell orders too)

        try {
          // TODO sign and broadcast all msgs
        } catch (error) {
          setErrorBannerText(String(error));
          return;
        }
      }

      // handleSaveNext({ ...data, ...values });
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
