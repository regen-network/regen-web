import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import Section from 'web-components/lib/components/section';

import { UseStateSetter } from 'types/react/use-state';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import WithLoader from 'components/atoms/WithLoader';

import { API_URI, IMAGE_STORAGE_BASE_URL } from './ProjectCardsSection.config';
import { useSectionStyles } from './ProjectCardsSection.styles';

interface Props {
  projects: ProjectWithOrderData[];
  title?: string;
  titleAlign?: 'center' | 'left';
  onButtonClick?: UseStateSetter<ProjectWithOrderData | null>;
}

export function ProjectCardsSection({
  projects,
  title = 'Projects',
  titleAlign = 'center',
  onButtonClick,
}: Props): JSX.Element {
  const navigate = useNavigate();
  const styles = useSectionStyles();

  return (
    <Section
      title={title}
      titleAlign={titleAlign}
      classes={{ root: styles.section, title: styles.title }}
    >
      <WithLoader
        isLoading={projects?.length === 0}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
            gridGap: '1.125rem',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {projects?.map(project => (
            <Box key={project.id}>
              <ProjectCard
                name={project.name}
                imgSrc={project.imgSrc}
                place={project.place}
                area={project.area}
                areaUnit={project.areaUnit}
                onButtonClick={onButtonClick && (() => onButtonClick(project))}
                purchaseInfo={project.purchaseInfo}
                onClick={() => navigate(`/projects/${project.id}`)}
                imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                apiServerUrl={API_URI}
                truncateTitle={true}
                sx={{ width: 400, height: 479 }}
              />
            </Box>
          ))}
        </Box>
      </WithLoader>
    </Section>
  );
}
