import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useAtom } from 'jotai';

import { CreateProjectCard } from 'web-components/src/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/src/components/cards/ProjectCard';

import { useAuth } from 'lib/auth/auth';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { projectsCurrentStepAtom } from 'pages/ProjectCreate/ProjectCreate.store';
import WithLoader from 'components/atoms/WithLoader';

import { useDashboardContext } from '../Dashboard.context';
import { useFetchProjectByAdmin } from './hooks/useFetchProjectsByAdmin';
import { DRAFT_ID } from './MyProjects.constants';
import { getDefaultProject } from './MyProjects.utils';

const MyProjects = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isIssuer, isProjectAdmin } = useDashboardContext();
  const { track } = useTracker();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);
  const { wallet, loginDisabled } = useWallet();
  const { activeAccountId, activeAccount } = useAuth();

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: activeAccountId,
    adminAddress: loginDisabled ? wallet?.address : activeAccount?.addr,
    keepUnpublished: true,
  });

  const isFirstProject = !adminProjects || adminProjects?.length < 1;

  return (
    <>
      <Grid container spacing={8}>
        {activeAccountId && (
          <Grid item xs={12} md={6} lg={4}>
            <CreateProjectCard
              isFirstProject={isFirstProject}
              onClick={() => {
                if (isIssuer) {
                  navigate(`/project-pages/${DRAFT_ID}/choose-credit-class`);
                } else {
                  navigate(`/project-pages/${DRAFT_ID}/basic-info`);
                }
              }}
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
                    {...getDefaultProject(!activeAccountId)}
                    {...project}
                    draft={project.offChain && !project.published}
                    onButtonClick={() => {
                      if (
                        !project.offChain ||
                        (project.offChain && project.published)
                      ) {
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
    </>
  );
};

export { MyProjects };
