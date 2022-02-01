import React from 'react';

import { Image, ImageProps } from 'web-components/lib/components/image';

const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.REACT_APP_API_URI;

function OptimizedImage(props: ImageProps): JSX.Element {
  return (
    <Image
      apiServerUrl={apiServerUrl}
      imageStorageBaseUrl={imageStorageBaseUrl}
      {...props}
    />
  );
}

export { OptimizedImage };
