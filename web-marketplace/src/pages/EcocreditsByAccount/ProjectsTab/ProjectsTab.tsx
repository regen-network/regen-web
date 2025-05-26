import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';

import {
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
} from 'lib/constants/shared.constants';
import { API_URI, IMAGE_STORAGE_BASE_URL } from 'lib/env';
import { useTracker } from 'lib/tracker/useTracker';

import { useFetchProjectByAdmin } from 'pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';
import WithLoader from 'components/atoms/WithLoader';

import { useProfileData } from '../hooks/useProfileData';

const ProjectsTab = (): JSX.Element => {
  const { _ } = useLingui();
  const location = useLocation();
  const navigate = useNavigate();
  const { track } = useTracker();
  const { address, account } = useProfileData();

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: account?.id,
    adminAddress: address,
  });

  const buttons = useMemo(() => getProjectCardButtonMapping(_), [_]);
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);

  return (
    <>
      <Grid container spacing={8}>
        {adminProjects?.map((project, i) => {
          return (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <WithLoader isLoading={isLoadingAdminProjects} variant="skeleton">
                <ProjectCard
                  {...project}
                  onClick={() => project.href && navigate(project.href)}
                  track={track}
                  pathname={location.pathname}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                  buttons={buttons}
                  bodyTexts={bodyTexts}
                  purchaseInfo={undefined}
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
