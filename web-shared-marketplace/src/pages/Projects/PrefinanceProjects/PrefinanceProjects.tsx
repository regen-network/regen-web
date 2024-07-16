import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BlockContent } from 'web-components/src/components/block-content';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import { ProjectCard } from 'web-components/src/components/cards/ProjectCard';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography';

import { useTracker } from 'lib/tracker/useTracker';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
} from '../AllProjects/AllProjects.config';
import { useProjectsContext } from '../Projects.context';

export const PrefinanceProjects: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const navigate = useNavigate();
    const { track } = useTracker();
    const { prefinanceProjects, prefinanceProjectsContent } =
      useProjectsContext();

    return (
      <>
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
                  learn more&nbsp;
                  <SmallArrowIcon />
                </TextButton>
              )}
            </div>
          </div>
        )}
        {prefinanceProjects?.map(project => {
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
                  navigate(
                    `/project/${project.slug}` ?? `/project/${project.id}`,
                  )
                }
                imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                apiServerUrl={API_URI}
                truncateTitle={true}
                sx={{ width: 400, height: 479 }}
                track={track}
                program={project.program}
                projectPrefinancing={project.projectPrefinancing}
                offChain={project.offChain}
              />
            </div>
          );
        })}
      </>
    );
  };
