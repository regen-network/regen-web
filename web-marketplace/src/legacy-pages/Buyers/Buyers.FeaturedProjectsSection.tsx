import { useNavigate } from 'react-router-dom';
import { SxProps } from '@mui/material';

import ProjectCard, {
  ProjectCardProps,
} from 'web-components/src/components/cards/ProjectCard';
import { CardsGridContainer } from 'web-components/src/components/organisms/CardsGridContainer/CardsGridContainer';
import Section from 'web-components/src/components/organisms/Section';
import { Theme } from 'web-components/src/theme/muiTheme';

import { AllBuyersPageQuery } from 'generated/sanity-graphql';

interface Props {
  projects: ProjectCardProps[];
  content: AllBuyersPageQuery['allBuyersPage'][0]['featuredProjectCardsSection'];
  sx?: {
    container?: SxProps<Theme>;
    section?: SxProps<Theme>;
  };
}

const BuyersFeaturedProjectsSection = ({ projects, content, sx }: Props) => {
  const navigate = useNavigate();
  const featuredProjects = content?.cards?.map(
    card => card?.project?.projectId,
  );
  const filteredProjects = projects?.filter(project =>
    featuredProjects?.includes(project.id),
  );

  return (
    <Section
      title={content?.title ?? ''}
      description={content?.descriptionRaw}
      backgroundImage={
        content?.backgroundImage?.image?.asset?.url ??
        content?.backgroundImage?.imageHref ??
        ''
      }
      sx={sx}
    >
      <CardsGridContainer cardsCount={filteredProjects.length}>
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            onClick={() => navigate(`/project/${project.id}`)}
            {...project}
          />
        ))}
      </CardsGridContainer>
    </Section>
  );
};

export { BuyersFeaturedProjectsSection };
