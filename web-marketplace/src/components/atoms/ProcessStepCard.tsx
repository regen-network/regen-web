import React from 'react';

import {
  StepCard,
  StepCardProps,
} from 'web-components/src/components/cards/StepCard';

const imageStorageBaseUrl = import.meta.env.VITE_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = import.meta.env.VITE_API_URI;

/**
 * StepCard with optimized image props for registry provided
 */
function ProcessStepCard(props: StepCardProps): JSX.Element {
  return (
    <StepCard
      apiServerUrl={apiServerUrl}
      imageStorageBaseUrl={imageStorageBaseUrl}
      {...props}
    />
  );
}

export { ProcessStepCard };
