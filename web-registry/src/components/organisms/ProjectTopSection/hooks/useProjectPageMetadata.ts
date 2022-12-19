import { useEffect, useState } from 'react';

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

const defaultValues = {
  videoURL: undefined,
  glanceText: undefined,
  primaryDescription: undefined,
  quote: undefined,
  landStewardPhoto: undefined,
  landStewardStoryTitle: undefined,
  landStewardStory: undefined,
};

export const useProjectPageMetadata = (
  projectPageMetadata?: Partial<ProjectPageMetadataLD>,
): UseProjectPageResponse => {
  const [values, setValues] = useState<UseProjectPageResponse>(defaultValues);

  useEffect(() => {
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

    setValues({
      videoURL,
      glanceText,
      primaryDescription,
      quote,
      landStewardPhoto,
      landStewardStoryTitle,
      landStewardStory,
    });
  }, [projectPageMetadata]);

  return values;
};
