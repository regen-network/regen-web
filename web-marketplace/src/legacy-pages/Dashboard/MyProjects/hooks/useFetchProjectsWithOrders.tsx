import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { ProjectWithOrderData } from 'legacy-pages/Projects/AllProjects/AllProjects.types';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { QueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

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
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
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
      enabled: !!queryClient,
      client: queryClient as QueryClient,
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
      offchainProject => offchainProject?.onChainId === project?.id,
    ),
  );

  const projectPagesMetadata = orderedOffChainProjects.map(
    project => project?.metadata,
  );

  const programAccounts = orderedOffChainProjects.map(
    project => project?.creditClassByCreditClassId?.accountByRegistryId,
  );

  // Sanity projects
  const sanityProjectsResults = useQueries({
    queries: projectsWithOrderData?.map(project => {
      const id = project?.slug || project?.id;
      return getProjectByIdQuery({
        id: id as string,
        sanityClient,
        languageCode: selectedLanguage,
        enabled: !!sanityClient && !!id,
      });
    }),
  });
  const sanityProjects = sanityProjectsResults.map(res => {
    return res.data?.allProject?.[0];
  });

  /* Final Normalization */
  const projectsWithMetadata = normalizeProjectsWithMetadata({
    offChainProjects: orderedOffChainProjects,
    projectsWithOrderData,
    projectsMetadata,
    projectPagesMetadata,
    programAccounts,
    classesMetadata,
    sanityProjects,
    wallet,
  });

  return {
    projects: projectsWithMetadata,
    isProjectsMetadataLoading,
    isClassesMetadataLoading,
  };
};
