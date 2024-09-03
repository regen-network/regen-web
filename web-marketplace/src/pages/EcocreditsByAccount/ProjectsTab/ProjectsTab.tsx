import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';

import { API_URI, IMAGE_STORAGE_BASE_URL } from 'lib/env';
import { useTracker } from 'lib/tracker/useTracker';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useFetchProjectByAdmin } from 'pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';
import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import WithLoader from 'components/atoms/WithLoader';

import { useProfileData } from '../hooks/useProfileData';
import { getDefaultProject } from './ProjectsTab.constants';

const ProjectsTab = (): JSX.Element => {
  const { _ } = useLingui();
  const location = useLocation();
  const navigate = useNavigate();
  const { track } = useTracker();
  const { address, account } = useProfileData();
  const defaultProject = useMemo(() => getDefaultProject({ _ }), [_]);

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: account?.id,
    adminAddress: address,
  });

  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);

  return (
    <>
      <Grid container spacing={8}>
        {adminProjects?.map((project, i) => {
          return (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <WithLoader isLoading={isLoadingAdminProjects} variant="skeleton">
                <ProjectCard
                  {...defaultProject}
                  {...(project as ProjectWithOrderData)}
                  onClick={() => project.href && navigate(project.href)}
                  track={track}
                  pathname={location.pathname}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                  onButtonClick={() => {
                    setSelectedProject(project as ProjectWithOrderData);
                    setIsBuyFlowStarted(true);
                  }}
                />
              </WithLoader>
            </Grid>
          );
        })}
      </Grid>
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={selectedProject && [selectedProject]}
        track={track}
        location={location}
      />
    </>
  );
};

export { ProjectsTab };
