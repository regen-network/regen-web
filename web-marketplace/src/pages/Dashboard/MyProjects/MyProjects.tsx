import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Grid } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreateProjectCard } from 'web-components/lib/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import { useCreateProjectMutation } from 'generated/graphql';
import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getWalletByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { projectsCurrentStepAtom } from 'pages/ProjectCreate/ProjectCreate.store';
import WithLoader from 'components/atoms/WithLoader';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useDashboardContext } from '../Dashboard.context';
import { useFetchProjectsWithOrders } from './hooks/useFetchProjectsWithOrders';
import { DEFAULT_PROJECT } from './MyProjects.constants';
import { Project } from './MyProjects.types';
import { submitCreateProject } from './MyProjects.utils';

const MyProjects = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const graphqlClient = useApolloClient();
  const { wallet, accountId } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const { isIssuer, isProjectAdmin } = useDashboardContext();
  const [createProject] = useCreateProjectMutation();
  const reactQueryClient = useQueryClient();
  const { data: walletData, isFetching: isWalletLoading } = useQuery(
    getWalletByAddrQuery({
      addr: wallet?.address ?? '',
      client: graphqlClient,
      enabled: wallet?.address !== undefined,
    }),
  );
  const { track } = useTracker();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);

  const { ecocreditClient } = useLedger();
  const { data: projectsData, isFetching: isOnChainProjectsLoading } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!wallet?.address && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: wallet?.address },
    }),
  );
  const offChainProjects =
    walletData?.walletByAddr?.projectsByAdminWalletId?.nodes;
  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Get data for on chain projects
  const {
    projects: onChainProjectsWithData,
    isProjectsMetadataLoading,
    isClassesMetadataLoading,
  } = useFetchProjectsWithOrders({
    projects: projectsData?.projects,
    offChainProjects,
    sanityCreditClassData,
  });

  // Get data for projects that are only off chain
  const onlyOffChainProjects =
    accountId === walletData?.walletByAddr?.partyByWalletId?.accountId
      ? offChainProjects?.filter(project => !project?.onChainId)
      : undefined;

  const onlyOffChainProjectsWithData =
    onlyOffChainProjects?.map(project => ({
      offChain: true,
      ...normalizeProjectWithMetadata({
        offChainProject: project,
        projectMetadata: project?.metadata,
        projectPageMetadata: project?.metadata,
        programParty: project?.creditClassByCreditClassId?.partyByRegistryId,
        sanityClass: findSanityCreditClass({
          sanityCreditClassData,
          creditClassIdOrUrl:
            project?.creditClassByCreditClassId?.onChainId ??
            project?.metadata?.['regen:creditClassId'] ??
            '',
        }),
      }),
    })) ?? [];

  const projects: Project[] = [
    ...onChainProjectsWithData,
    ...onlyOffChainProjectsWithData,
  ];
  const isFirstProject = !projects || projects?.length < 1;

  return (
    <>
      <Grid container spacing={8}>
        {isIssuer && (
          <Grid item xs={12} md={6} lg={4}>
            <CreateProjectCard
              isFirstProject={isFirstProject}
              onClick={() =>
                submitCreateProject({
                  createProject,
                  setError,
                  navigate,
                  walletData,
                  reactQueryClient,
                })
              }
              sx={{ height: { xs: '100%' } }}
            />
          </Grid>
        )}
        {isProjectAdmin &&
          projects?.map((project, i) => {
            return (
              <Grid key={i} item xs={12} md={6} lg={4}>
                <WithLoader
                  isLoading={
                    isWalletLoading ||
                    isOnChainProjectsLoading ||
                    isProjectsMetadataLoading ||
                    isClassesMetadataLoading
                  }
                  variant="skeleton"
                >
                  <ProjectCard
                    {...DEFAULT_PROJECT}
                    {...project}
                    onButtonClick={() => {
                      if (!project.offChain) {
                        navigate(
                          `/project-pages/${project.id}/edit/basic-info`,
                        );
                      } else {
                        const currentStep = projectsCurrentStep[project?.id];
                        navigate(
                          `/project-pages/${project?.id}/${
                            currentStep || 'basic-info'
                          }`,
                        );
                      }
                    }}
                    track={track}
                    pathname={location.pathname}
                  />
                </WithLoader>
              </Grid>
            );
          })}
      </Grid>
      {error && <ErrorBanner text={error} />}
    </>
  );
};

export { MyProjects };
