import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Grid } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreateProjectCard } from 'web-components/lib/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import { useCreateProjectMutation } from 'generated/graphql';
import { getWalletByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';

import { useDashboardContext } from '../Dashboard.context';
import { useFetchProjectsByIdsWithOrders } from './hooks/useFetchProjectsByIdsWithOrders';
import { DEFAULT_PROJECT } from './MyProjects.constants';
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
  const { data: walletData } = useQuery(
    getWalletByAddrQuery({
      addr: wallet?.address ?? '',
      client: graphqlClient,
      enabled: wallet?.address !== undefined,
    }),
  );

  const { track } = useTracker();

  const projects =
    accountId === walletData?.walletByAddr?.partyByWalletId?.accountId
      ? walletData?.walletByAddr?.projectsByAdminWalletId?.nodes
      : undefined;
  const isFirstProject = !projects || projects?.length < 1;
  const onChainIds =
    projects
      ?.map(project => project?.onChainId)
      .filter((id): id is string => {
        return typeof id === 'string';
      }) ?? [];

  const { projects: projectsWithOrders, isProjectsLoading } =
    useFetchProjectsByIdsWithOrders({
      projectIds: onChainIds,
    });

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
            const currentProject = projectsWithOrders.find(
              projectsWithOrder => projectsWithOrder.id === project?.onChainId,
            );
            const name =
              currentProject?.name ??
              project?.metadata?.['schema:name'] ??
              project?.handle ??
              project?.id;
            return (
              <Grid key={i} item xs={12} md={6} lg={4}>
                <WithLoader isLoading={isProjectsLoading} variant="skeleton">
                  <ProjectCard
                    {...DEFAULT_PROJECT}
                    {...(currentProject ?? {})}
                    name={name}
                    onButtonClick={() => {
                      if (project?.onChainId) {
                        navigate(
                          `/project-pages/${project?.onChainId}/edit/basic-info`,
                        );
                      } else {
                        // TODO: update to navigate to the step the user left off the flow instead of /basic-info
                        // https://github.com/regen-network/regen-registry/issues/1574
                        navigate(`/project-pages/${project?.id}/basic-info`);
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
