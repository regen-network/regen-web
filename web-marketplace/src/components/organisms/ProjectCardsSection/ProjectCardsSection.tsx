import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import {
  COMPLIANCE_MARKET,
  VOLUNTARY_MARKET,
} from 'legacy-pages/Projects/AllProjects/AllProjects.constants';
import { TerrasosCredits } from 'legacy-pages/Projects/AllProjects/AllProjects.TerrasosCredits';
import { getCreditsTooltip } from 'legacy-pages/Projects/AllProjects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'legacy-pages/Projects/AllProjects/utils/getIsSoldOut';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';
import { CardsGridContainer } from 'web-components/src/components/organisms/CardsGridContainer/CardsGridContainer';
import Section from 'web-components/src/components/section';

import { Maybe, Scalars } from 'generated/sanity-graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import {
  DRAFT_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import { IS_REGEN, IS_TERRASOS } from 'lib/env';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getSoldOutProjectsQuery } from 'lib/queries/react-query/sanity/getSoldOutProjectsQuery/getSoldOutProjectsQuery';
import { useTracker } from 'lib/tracker/useTracker';

import WithLoader from 'components/atoms/WithLoader';
import BlockContentBody from 'components/molecules/BlockContentBody';

import { useAllSoldOutProjectsIds } from './hooks/useSoldOutProjectsIds';
import { API_URI, IMAGE_STORAGE_BASE_URL } from './ProjectCardsSection.config';
import { useSectionStyles } from './ProjectCardsSection.styles';
import { ProjectCardOnButtonClickParams } from './ProjectCardsSection.types';

interface Props {
  projects: NormalizeProject[];
  title?: string;
  body?: Maybe<Scalars['JSON']>;
  titleAlign?: 'center' | 'left';
  onButtonClick?: (params: ProjectCardOnButtonClickParams) => void;
  loading?: boolean;
}

export function ProjectCardsSection({
  projects,
  title,
  body,
  titleAlign = 'center',
  onButtonClick,
  loading,
}: Props): JSX.Element {
  const { _ } = useLingui();
  const { classes } = useSectionStyles();
  const { track } = useTracker();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: sanitySoldOutProjects, isFetching } = useQuery(
    getSoldOutProjectsQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });
  const navigate = useNavigate();
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);
  const purchaseDetailsTitles = useMemo(
    () => getProjectCardPurchaseDetailsTitleMapping(_),
    [_],
  );
  const buttons = useMemo(() => getProjectCardButtonMapping(_), [_]);
  return (
    <Section
      title={title ?? _(msg`Projects`)}
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
            const href = `/project/${project.slug ?? project.id}`;
            const isComplianceProject =
              project.marketType?.includes(COMPLIANCE_MARKET) ?? false;
            const isVoluntaryProject =
              project.marketType?.includes(VOLUNTARY_MARKET) ?? false;
            const complianceCredits = project.complianceCredits;

            return (
              <ProjectCard
                buttons={buttons}
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
                href={href}
                onClick={() => navigate(href)}
                target={'_self'}
                imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                apiServerUrl={API_URI}
                truncateTitle={true}
                sx={{ width: 400, height: 479 }}
                track={track}
                isSoldOut={isSoldOut}
                creditsTooltip={getCreditsTooltip({ isSoldOut, project, _ })}
                program={project.program}
                projectPrefinancing={project.projectPrefinancing}
                offChain={project.offChain}
                draftText={_(DRAFT_TEXT)}
                bodyTexts={bodyTexts}
                purchaseDetailsTitles={purchaseDetailsTitles}
                creditsChildren={
                  IS_TERRASOS ? (
                    <TerrasosCredits
                      project={project}
                      isVoluntaryProject={isVoluntaryProject}
                      isComplianceProject={isComplianceProject}
                      complianceCredits={complianceCredits.creditsAvailable}
                    />
                  ) : null
                }
                useProjectCardButton={IS_REGEN}
              />
            );
          })}
        </CardsGridContainer>
      </WithLoader>
    </Section>
  );
}
