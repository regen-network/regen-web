import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { QueryClient, useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getSellOrdersBySellerQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery';
import { useWallet } from 'lib/wallet/wallet';

import { CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR } from 'pages/CreateOrganization/CreateOrganization.constants';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { FormValues } from 'components/organisms/MigrateProjects/MigrateProjects.types';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { useCreateDao } from '../useCreateDao/useCreateDao';
import { CreateDaoParams } from '../useCreateDao/useCreateDao.types';
import { OrganizationMultiStepData } from '../useOrganizationFlow';
import { regen } from '@regen-network/api';

export const useMigrateProjects = (projects: NormalizeProject[]) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { handleSaveNext, data } = useMultiStep<OrganizationMultiStepData>();
  const { createDaos } = useCreateDao();
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
      const organizationId = data.dao?.organizationId;
      if (!organizationId) {
        setErrorBannerText(_(CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR));
        return;
      }
      const projectIds = values.selectedProjectIds;
      if (projectIds.length > 0) {
        const daosParams = projectIds
          .map(projectId => {
            const project = projects.find(p => p.id === projectId);
            if (!project) {
              return null;
            }
            return {
              type: 'project',
              name: project.name || project.id || project.offChainId,
              projectId,
              organizationId,
            };
          })
          .filter(Boolean) as CreateDaoParams[];

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
        // 1. Cancel selected sell orders so we can send previously escrowed credits
        const cancelSellOrdersMsgs = selectedSellOrders?.map(order =>
          regen.ecocredit.marketplace.v1.MessageComposer.withTypeUrl.cancelSellOrder(
            {
              seller: wallet?.address as string,
              sellOrderId: order.id,
            },
          ),
        );
        // 2. TODO Send selected credits to projects DAO addresses
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
      createDaos,
      credits,
      setErrorBannerText,
    ],
  );
  return migrateProjects;
};
