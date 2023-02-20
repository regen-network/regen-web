import ProjectCard, {
  ProjectCardProps,
} from 'web-components/lib/components/cards/ProjectCard';
import { CardsGridContainer } from 'web-components/lib/components/organisms/CardsGridContainer/CardsGridContainer';
import Section from 'web-components/lib/components/organisms/Section';

import { AllBuyersPageQuery } from 'generated/sanity-graphql';

interface Props {
  projects: ProjectCardProps[];
  content: AllBuyersPageQuery['allBuyersPage'][0]['featuredProjectCardsSection'];
}

const BuyersFeaturedProjectsSection = ({ projects, content }: Props) => {
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
    >
      <CardsGridContainer cardsCount={filteredProjects.length}>
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </CardsGridContainer>
    </Section>
  );
};

export { BuyersFeaturedProjectsSection };
