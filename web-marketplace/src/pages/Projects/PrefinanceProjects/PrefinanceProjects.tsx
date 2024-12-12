import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { BlockContent } from 'web-components/src/components/block-content';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import { ProjectCard } from 'web-components/src/components/cards/ProjectCard';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography';

import {
  DRAFT_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import { useTracker } from 'lib/tracker/useTracker';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
} from '../AllProjects/AllProjects.config';
import ProjectFilterMobile from '../AllProjects/AllProjects.ProjectFilterMobile';
import { getIsSoldOut } from '../AllProjects/utils/getIsSoldOut';
import { useResetFilters } from '../hooks/useResetFilters';
import { useProjectsContext } from '../Projects.context';

export const PrefinanceProjects: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const { _ } = useLingui();
    const navigate = useNavigate();
    const { track } = useTracker();
    const {
      prefinanceProjects,
      prefinanceProjectsContent,
      soldOutProjectsIds,
      allProjects,
      hasCommunityProjects,
    } = useProjectsContext();

    const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);
    const purchaseDetailsTitles = useMemo(
      () => getProjectCardPurchaseDetailsTitleMapping(_),
      [_],
    );
    const buttons = useMemo(() => getProjectCardButtonMapping(_), [_]);
    const { resetFilters, showResetButton } = useResetFilters();
    return (
      <>
        <ProjectFilterMobile
          allProjects={allProjects}
          resetFilters={resetFilters}
          showResetButton={showResetButton}
          className="lg:hidden w-full mb-15 mr-0"
          hasCommunityProjects={hasCommunityProjects}
          creditClassFilters={[]}
        />
        {prefinanceProjectsContent && (
          <div className="flex items-start sm:items-center max-w-[696px] col-[1/-1] pt-[7px] sm:pt-[12px] pb-25 sm:pb-30">
            <img
              className="pr-15 w-[75px] h-[75px] sm:w-[122px] sm:h-[122px]"
              src="/svg/prefinancing.svg"
              alt="prefinancing"
            />
            <div>
              <Body size="lg">
                <BlockContent
                  content={prefinanceProjectsContent.descriptionRaw}
                />
              </Body>
              {prefinanceProjectsContent.learnMore && (
                <TextButton
                  className="pt-15 flex justify-start items-center"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={prefinanceProjectsContent.learnMore}
                  textSize="sm"
                >
                  <Trans>learn more</Trans>&nbsp;
                  <SmallArrowIcon />
                </TextButton>
              )}
            </div>
          </div>
        )}
        {prefinanceProjects?.map(project => {
          const isSoldOut = getIsSoldOut({ project, soldOutProjectsIds });
          return (
            <div key={project?.id}>
              <ProjectCard
                id={project?.id}
                name={project?.name}
                creditClassId={project?.creditClassId}
                imgSrc={project?.imgSrc}
                place={project?.place}
                area={project?.area}
                areaUnit={project?.areaUnit}
                purchaseInfo={project.purchaseInfo || {}}
                onClick={() =>
                  navigate(`/project/${project.slug ?? project.id}`)
                }
                imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                apiServerUrl={API_URI}
                truncateTitle={true}
                sx={{ width: 400, height: 479 }}
                track={track}
                program={project.program}
                projectPrefinancing={project.projectPrefinancing}
                offChain={project.offChain}
                isSoldOut={isSoldOut}
                draftText={_(DRAFT_TEXT)}
                bodyTexts={bodyTexts}
                purchaseDetailsTitles={purchaseDetailsTitles}
                buttons={buttons}
              />
            </div>
          );
        })}
      </>
    );
  };
