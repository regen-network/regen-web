import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

import { Maybe, Scalars } from 'generated/sanity-graphql';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';

import { useFeaturedProjects } from './hooks/useFeaturedProjects';

export function FeaturedProjects({
  title,
  body,
}: {
  title: string;
  body: Maybe<Scalars['JSON']>;
}): JSX.Element {
  const { featuredProjects, loading } = useFeaturedProjects();
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  return (
    <div id="projects">
      <ProjectCardsSection
        title={title}
        body={body}
        projects={featuredProjects}
        onButtonClick={({ project }) => {
          setSelectedProject(project);
          setIsBuyFlowStarted(true);
        }}
        loading={loading}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 20 }}>
        <Link to="/projects/1">
          <ContainedButton>{'DISCOVER PROJECTS'}</ContainedButton>
        </Link>
      </Box>
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={selectedProject && [selectedProject]}
      />
    </div>
  );
}
