import { getOptimizedImageSrc } from 'web-components/src/utils/optimizedImageSrc';

import { API_URI, IMAGE_STORAGE_BASE_URL } from 'lib/env';

type Params = {
  url: string;
  width: number;
};

export const getResizedImageUrl = ({ url, width }: Params) => {
  const imageSrc = getOptimizedImageSrc(url, IMAGE_STORAGE_BASE_URL, API_URI);

  return `${imageSrc}?w=${width}`;
};
