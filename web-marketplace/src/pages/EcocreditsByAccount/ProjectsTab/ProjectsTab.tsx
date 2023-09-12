import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import { isValidAddress } from 'web-components/lib/components/inputs/validation';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getWalletByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useTracker } from 'lib/tracker/useTracker';

import { projectsCurrentStepAtom } from 'pages/ProjectCreate/ProjectCreate.store';
import WithLoader from 'components/atoms/WithLoader';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useProfileData } from '../hooks/useProfileData';
import { DEFAULT_PROJECT } from './ ProjectsTab.constants';
import { useFetchProjectsWithOrders } from './hooks/useFetchProjectsWithOrders';
import { Project } from './ProjectsTab.types';

const ProjectsTab = (): JSX.Element => {
  const graphqlClient = useApolloClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { track } = useTracker();
  const { ecocreditClient } = useLedger();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);
  const { address, party } = useProfileData();

  const { data: walletData, isFetching: isWalletLoading } = useQuery(
    getWalletByAddrQuery({
      addr: address ?? '',
      client: graphqlClient,
      enabled: !!address,
    }),
  );

  const { data: projectsData, isFetching: isOnChainProjectsLoading } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!address && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: address },
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
    party?.accountId === walletData?.walletByAddr?.partyByWalletId?.accountId
      ? offChainProjects
          ?.filter(project => !project?.onChainId)
          .filter(project => !project?.approved)
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

  return (
    <>
      <Grid container spacing={8}>
        {projects?.map((project, i) => {
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
                      navigate(`/project-pages/${project.id}/edit/basic-info`);
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
    </>
  );
};

export { ProjectsTab };
