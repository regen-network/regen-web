import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreateProjectCard } from 'web-components/lib/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import { useCreateProjectMutation } from 'generated/graphql';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { projectsCurrentStepAtom } from 'pages/ProjectCreate/ProjectCreate.store';
import WithLoader from 'components/atoms/WithLoader';

import { useDashboardContext } from '../Dashboard.context';
import { useFetchProjectByAdmin } from './hooks/useFetchProjectsByAdmin';
import { DEFAULT_PROJECT } from './MyProjects.constants';
import { submitCreateProject } from './MyProjects.utils';

const MyProjects = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isIssuer, isProjectAdmin } = useDashboardContext();
  const [createProject] = useCreateProjectMutation();
  const reactQueryClient = useQueryClient();
  const { track } = useTracker();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);
  const { wallet, accountId } = useWallet();

  const { adminProjects, walletData, isLoadingAdminProjects } =
    useFetchProjectByAdmin({
      adminAccountId: accountId,
      adminAddress: wallet?.address,
    });

  const isFirstProject = !adminProjects || adminProjects?.length < 1;

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
          adminProjects?.map((project, i) => {
            return (
              <Grid key={i} item xs={12} md={6} lg={4}>
                <WithLoader
                  isLoading={isLoadingAdminProjects}
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
