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
} from 'pages/CreateOrganization/CreateOrganization.constants';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { FormValues } from 'components/organisms/MigrateProjects/MigrateProjects.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import {
  codeIds,
  cwAdminFactoryAddr,
} from '../useCreateDao/useCreateDao.constants';
import { predictAllAddresses } from '../useCreateDao/useCreateDao.utils';
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

  const migrateProjects = useCallback(
    async (values: FormValues) => {
      if (isLoadingSellOrders || isLoadingCredits) {
        // prevent submission while loading data
        return;
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
        // const daosParams = projectIds
        //   .map(projectId => {
        //     const project = projects.find(p => p.id === projectId);
        //     if (!project) {
        //       return null;
        //     }
        //     return {
        //       type: 'project',
        //       name: project.name || project.id || project.offChainId,
        //       projectId,
        //       organizationId,
        //     };
        //   })
        //   .filter(Boolean) as CreateDaoParams[];

        const selectedProjects = projects.filter(project =>
          project.offChain
            ? projectIds.includes(project.id)
            : project.offChainId && projectIds.includes(project.offChainId),
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
              seller: wallet?.address as string,
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
                daoCoreCodeId: codeIds.daoCore,
                daoVotingCw4CodeId: codeIds.votingCw4,
                cw4GroupCodeId: codeIds.cw4Group,
                rbamCodeId: codeIds.rbam,
              });
            return { ...project, dao, daoVotingCw4, cw4Group, rbam };
          }),
        );
        console.log(
          'selectedProjectsWithAddresses',
          selectedProjectsWithAddresses,
        );
        //
        // 3. Recreate sell orders for credits that were previously listed
        // 4. TODO update fiat sell orders if any

        try {
          // TODO sign and broadcast all msgs
        } catch (error) {
          setErrorBannerText(String(error));
          return;
        }
      }

      handleSaveNext({ ...data, ...values });
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
