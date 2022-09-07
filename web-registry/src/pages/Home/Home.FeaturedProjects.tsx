import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import Section from 'web-components/lib/components/section';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
} from 'pages/Projects/Projects.config';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import WithLoader from 'components/atoms/WithLoader';

import { useHomeStyles } from './Home.styles';

type Props = {
  projects: ProjectWithOrderData[];
  isLoading: boolean;
};

export const FeaturedProjects = ({
  projects,
  isLoading,
}: Props): JSX.Element => {
  const styles = useHomeStyles();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);

  return (
    <div id="projects">
      <Section
        title="Featured Projects"
        titleAlign="center"
        classes={{ root: styles.section, title: styles.title }}
      >
        <WithLoader
          isLoading={isLoading}
          sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 338px))',
              gridGap: '1.125rem',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {projects?.map(project => (
              <Box key={project?.id}>
                <ProjectCard
                  name={project?.name}
                  imgSrc={project?.imgSrc}
                  place={project?.place}
                  area={project?.area}
                  areaUnit={project?.areaUnit}
                  onButtonClick={() => setSelectedProject(project)}
                  purchaseInfo={project.purchaseInfo}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                  truncateTitle={true}
                  sx={{ width: 338, height: 479 }}
                />
              </Box>
            ))}
          </Box>
        </WithLoader>
      </Section>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 30 }}>
        <Link to="/projects">
          <ContainedButton>{'DISCOVER PROJECTS'}</ContainedButton>
        </Link>
      </Box>
      <BuySellOrderFlow selectedProject={selectedProject} />
    </div>
  );
};
