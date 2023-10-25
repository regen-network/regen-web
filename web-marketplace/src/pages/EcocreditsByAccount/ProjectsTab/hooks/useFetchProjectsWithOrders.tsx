import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { useLedger } from 'ledger';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useProjectsMetadata } from 'hooks/projects/useProjectsMetadata';

interface Response {
  projects: ProjectWithOrderData[];
  isProjectsMetadataLoading: boolean;
  isClassesMetadataLoading: boolean;
}

interface Props {
  projects?: ProjectInfo[];
  offChainProjects?: Maybe<ProjectFieldsFragment>[];
  sanityCreditClassData?: AllCreditClassQuery;
}

export const useFetchProjectsWithOrders = ({
  projects,
  offChainProjects,
  sanityCreditClassData,
}: Props): Response => {
  const { marketplaceClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  const {
    isProjectsMetadataLoading,
    isClassesMetadataLoading,
    projectsMetadata,
    classesMetadata,
  } = useProjectsMetadata(projects);

  // Sell Orders
  const { data: sellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!marketplaceClient,
      client: marketplaceClient,
      reactQueryClient,
      request: {},
    }),
  );

  const projectsWithOrderData = normalizeProjectsWithOrderData({
    projects: projects?.filter(
      project => project !== undefined,
    ) as ProjectInfo[],
    sellOrders,
    userAddress: wallet?.address,
    sanityCreditClassData,
  });

  const orderedOffChainProjects = projectsWithOrderData.map(project =>
    offChainProjects?.find(
      offchainProject => offchainProject?.onChainId === project.id,
    ),
  );

  const projectPagesMetadata = orderedOffChainProjects.map(
    project => project?.metadata,
  );

  const programAccounts = orderedOffChainProjects.map(
    project => project?.creditClassByCreditClassId?.accountByRegistryId,
  );

  /* Final Normalization */

  const projectsWithMetadata = normalizeProjectsWithMetadata({
    projectsWithOrderData,
    projectsMetadata,
    projectPagesMetadata,
    programAccounts,
    classesMetadata,
  });
  return {
    projects: projectsWithMetadata,
    isProjectsMetadataLoading,
    isClassesMetadataLoading,
  };
};
