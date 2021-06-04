import React from 'react';

import { StepCard, StepCardProps } from 'web-components/lib/components/cards/StepCard';

const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.REACT_APP_API_URI;

/**
 * StepCard with optimized image props for registry provided
 */
function ProcessStepCard(props: StepCardProps): JSX.Element {
  return <StepCard apiServerUrl={apiServerUrl} imageStorageBaseUrl={imageStorageBaseUrl} {...props} />;
}

export { ProcessStepCard };
