import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';

import { useTracker } from 'lib/tracker/useTracker';

import { useFetchProjectByAdmin } from 'pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';
import WithLoader from 'components/atoms/WithLoader';

import { useProfileData } from '../hooks/useProfileData';
import { DEFAULT_PROJECT } from './ProjectsTab.constants';

const ProjectsTab = (): JSX.Element => {
  const location = useLocation();
  const { track } = useTracker();
  const { address, account } = useProfileData();

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: account?.id,
    adminAddress: address,
  });

  return (
    <>
      <Grid container spacing={8}>
        {adminProjects?.map((project, i) => {
          return (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <WithLoader isLoading={isLoadingAdminProjects} variant="skeleton">
                <ProjectCard
                  {...DEFAULT_PROJECT}
                  {...project}
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
