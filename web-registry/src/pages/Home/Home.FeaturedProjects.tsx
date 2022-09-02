import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';

import { useFeaturedProjects } from './hooks/useFeaturedProjects';

export function FeaturedProjects(): JSX.Element {
  const { featuredProjects } = useFeaturedProjects();

  return (
    <div id="projects">
      <ProjectCardsSection
        title="Featured Projects"
        projects={featuredProjects}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 20 }}>
        <Link to="/projects">
          <ContainedButton>{'DISCOVER PROJECTS'}</ContainedButton>
        </Link>
      </Box>
    </div>
  );
}
