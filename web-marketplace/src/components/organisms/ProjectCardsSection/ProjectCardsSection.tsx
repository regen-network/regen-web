import { useQuery } from '@tanstack/react-query';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';
import { CardsGridContainer } from 'web-components/src/components/organisms/CardsGridContainer/CardsGridContainer';
import Section from 'web-components/src/components/section';

import { Maybe, Scalars } from 'generated/sanity-graphql';
import { client as sanityClient } from 'lib/clients/sanity';
import { getSoldOutProjectsQuery } from 'lib/queries/react-query/sanity/getSoldOutProjectsQuery/getSoldOutProjectsQuery';
import { useTracker } from 'lib/tracker/useTracker';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { getPriceToDisplay } from 'pages/Projects/AllProjects/hooks/useProjectsSellOrders.utils';
import { getCreditsTooltip } from 'pages/Projects/AllProjects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'pages/Projects/AllProjects/utils/getIsSoldOut';
import WithLoader from 'components/atoms/WithLoader';
import BlockContentBody from 'components/molecules/BlockContentBody';

import { useAllSoldOutProjectsIds } from './hooks/useSoldOutProjectsIds';
import { API_URI, IMAGE_STORAGE_BASE_URL } from './ProjectCardsSection.config';
import { useSectionStyles } from './ProjectCardsSection.styles';
import { ProjectCardOnButtonClickParams } from './ProjectCardsSection.types';

interface Props {
  projects: ProjectWithOrderData[];
  title?: string;
  body?: Maybe<Scalars['JSON']>;
  titleAlign?: 'center' | 'left';
  onButtonClick?: (params: ProjectCardOnButtonClickParams) => void;
  loading?: boolean;
}

export function ProjectCardsSection({
  projects,
  title = 'Projects',
  body,
  titleAlign = 'center',
  onButtonClick,
  loading,
}: Props): JSX.Element {
  const { classes } = useSectionStyles();
  const { track } = useTracker();
  const { data: sanitySoldOutProjects, isFetching } = useQuery(
    getSoldOutProjectsQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });

  return (
    <Section
      title={title}
      titleAlign={titleAlign}
      classes={{ root: classes.section, title: classes.title }}
    >
      {body && <BlockContentBody body={body} />}

      <WithLoader
        isLoading={!!loading || isFetching}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <CardsGridContainer cardsCount={projects.length}>
          {projects?.map(project => {
            const isSoldOut = getIsSoldOut({ project, soldOutProjectsIds });
            return (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                creditClassId={project.creditClassId}
                imgSrc={project.imgSrc}
                place={project.place}
                area={project.area}
                areaUnit={project.areaUnit}
                onButtonClick={
                  onButtonClick && (() => onButtonClick({ project }))
                }
                purchaseInfo={project.purchaseInfo}
                href={`/project/${project.slug ?? project.id}`}
                target={'_self'}
                imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                apiServerUrl={API_URI}
                truncateTitle={true}
                sx={{ width: 400, height: 479 }}
                track={track}
                isSoldOut={isSoldOut}
                creditsTooltip={getCreditsTooltip({ isSoldOut, project })}
                program={project.program}
                projectPrefinancing={project.projectPrefinancing}
              />
            );
          })}
        </CardsGridContainer>
      </WithLoader>
    </Section>
  );
}
