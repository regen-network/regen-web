import { API_URI } from 'lib/env';

type Params = {
  url: string;
  startPattern: string;
  width: number;
};

const IMAGE_ENDPOINT = '/marketplace/v1/image';

export const getResizedImageUrl = ({ startPattern, url, width }: Params) => {
  const startPatternIndex = url.indexOf(startPattern);
  const endIndex = url.length;
  const imagePath = url.substring(startPatternIndex, endIndex);

  return `${API_URI}${IMAGE_ENDPOINT}${imagePath}?w=${width}`;
};
