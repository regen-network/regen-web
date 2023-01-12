import { ProjectPageMetadataLD, ProjectQuote } from 'lib/db/types/json-ld';

type UseProjectPageResponse = {
  videoURL?: string | null;
  glanceText?: string[];
  primaryDescription?: string;
  quote?: ProjectQuote;
  landStewardPhoto?: string | null;
  landStewardStoryTitle?: string | null;
  landStewardStory?: string | null;
};

export const useProjectPageMetadata = (
  projectPageMetadata?: Partial<ProjectPageMetadataLD>,
): UseProjectPageResponse => {
  const videoURL = projectPageMetadata?.['regen:videoURL']?.['@value'];
  const glanceText = projectPageMetadata?.['regen:glanceText']?.['@list'];
  const primaryDescription =
    projectPageMetadata?.['regen:landStory'] ||
    projectPageMetadata?.['schema:description'];
  const quote = projectPageMetadata?.['regen:projectQuote'];
  const landStewardPhoto =
    projectPageMetadata?.['regen:landStewardPhoto']?.['@value'];
  const landStewardStoryTitle =
    projectPageMetadata?.['regen:landStewardStoryTitle'];
  const landStewardStory = projectPageMetadata?.['regen:landStewardStory'];

  return {
    videoURL,
    glanceText,
    primaryDescription,
    quote,
    landStewardPhoto,
    landStewardStoryTitle,
    landStewardStory,
  };
};
