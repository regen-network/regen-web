import * as React from 'react';
import { Image } from 'web-components/lib/components/image';

export default {
  title: 'Image',
  component: Image,
};

const imageSrc =
  'https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png';
const imageStorageBaseUrl = process.env.STORYBOOK_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.STORYBOOK_API_URI;

// const label = 'Image Quality';
const defaultValue = 100;
// const options = {
//   range: true,
//   min: 1,
//   max: 100,
//   step: 1,
// };

export const imageDefaultQuality100 = (): JSX.Element => {
  return (
    <div style={{ width: 521, height: 486 }}>
      <Image
        src={imageSrc}
        alt="Wilmot"
        options={{ q: defaultValue }}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
      />
    </div>
  );
};

export const originalImage = (): JSX.Element => (
  <img src={imageSrc} alt="Wilmot" />
);
