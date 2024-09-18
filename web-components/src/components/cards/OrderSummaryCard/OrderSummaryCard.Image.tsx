import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';

import { ProjectCardBodyTextsMapping } from '../ProjectCard/ProjectCard.types';

export function OrderSummaryImage({
  src,
  prefinanceProject,
  bodyTexts,
  altText,
}: {
  src: string;
  prefinanceProject?: boolean;
  bodyTexts: ProjectCardBodyTextsMapping;
  altText: string;
}) {
  return (
    <div className="w-[90px] sm:w-full  sm:h-[160px]">
      {prefinanceProject && (
        <PrefinanceTag classNames={{ root: 'top-20' }} bodyTexts={bodyTexts} />
      )}
      <img
        src={src}
        alt={altText}
        className="w-[90px] h-[60px] px-15 sm:h-[160px] sm:px-0 sm:w-full object-cover object-center"
      />
    </div>
  );
}
