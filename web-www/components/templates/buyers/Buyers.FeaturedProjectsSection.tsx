import { SxProps } from '@mui/material';
import { useRouter } from 'next/router';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';
import { CardsGridContainer } from 'web-components/src/components/organisms/CardsGridContainer/CardsGridContainer';
import Section from 'web-components/src/components/organisms/Section';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  AllBuyersPageQuery,
  FeaturedProjectCard,
} from '@/generated/sanity-graphql';
import {
  DRAFT_TEXT,
  projectCardBodyTextMapping,
  projectCardButtonMapping,
  projectCardPurchaseDetailsTitleMapping,
} from '@/lib/constants/shared.constants';

interface Props {
  content: AllBuyersPageQuery['allBuyersPage'][0]['featuredProjectCardsSection'];
  sx?: {
    container?: SxProps<Theme>;
    section?: SxProps<Theme>;
  };
}

const BuyersFeaturedProjectsSection = ({ content, sx }: Props) => {
  const router = useRouter();
  const projects = content?.cards;

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
      <CardsGridContainer cardsCount={projects?.length ?? 0}>
        {projects?.map(projectCard => {
          const { project, creditClass } = projectCard as FeaturedProjectCard;
          const { image, link, name } = creditClass?.program ?? {};

          return (
            <ProjectCard
              key={project?.projectId}
              onClick={() =>
                router.push(
                  `https://app.regen.network/project/${project?.projectId}`,
                )
              }
              imgSrc={
                project?.image?.image?.asset?.url ??
                project?.image?.imageHref ??
                ''
              }
              name={project?.projectName ?? ''}
              place={project?.location ?? ''}
              area={project?.area ?? undefined}
              areaUnit={project?.areaUnit ?? undefined}
              program={{
                name: name ?? '',
                address: '',
                type: 'ORGANIZATION',
                link,
                image: image?.asset?.url,
              }}
              draftText={DRAFT_TEXT}
              bodyTexts={projectCardBodyTextMapping}
              purchaseDetailsTitles={projectCardPurchaseDetailsTitleMapping}
              buttons={projectCardButtonMapping}
            />
          );
        })}
      </CardsGridContainer>
    </Section>
  );
};

export { BuyersFeaturedProjectsSection };
