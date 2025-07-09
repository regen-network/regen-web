import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';

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
import { NoProjectsDisplay } from './NoProjectsDisplay';

const ProjectsTab = (): JSX.Element => {
  const { _ } = useLingui();
  const location = useLocation();
  const navigate = useNavigate();
  const { track } = useTracker();
  const { address, account } = useProfileData();

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: account?.id,
    adminAddress: address,
    keepUnpublished: true,
  });

  const cardProps = useMemo(
    () => ({
      buttons: getProjectCardButtonMapping(_),
      bodyTexts: getProjectCardBodyTextMapping(_),
      track,
      pathname: location.pathname,
      imageStorageBaseUrl: IMAGE_STORAGE_BASE_URL,
      apiServerUrl: API_URI,
      purchaseInfo: undefined,
    }),
    [_, location.pathname, track],
  );

  if (
    !isLoadingAdminProjects &&
    (!adminProjects || adminProjects.length === 0)
  ) {
    return <NoProjectsDisplay />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30">
      {adminProjects?.map((project, index) => (
        <div key={project.id || index}>
          <WithLoader isLoading={isLoadingAdminProjects} variant="skeleton">
            <ProjectCard
              {...project}
              {...cardProps}
              onClick={() => project.href && navigate(project.href)}
            />
          </WithLoader>
        </div>
      ))}
    </div>
  );
};

export { ProjectsTab };
