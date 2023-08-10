import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';

import { ParseProjectPageMetadataReturn } from './ProjectStorySection.types';

export const parseProjectPageMetadata = (
  projectPageMetadata?: Partial<ProjectPageMetadataLD>,
): ParseProjectPageMetadataReturn => {
  const storyMedia = projectPageMetadata?.['regen:storyMedia'];
  const storyTitle = projectPageMetadata?.['regen:storyTitle'];
  const story = projectPageMetadata?.['regen:story'];

  return {
    storyMedia,
    storyTitle,
    story,
  };
};
