import * as React from 'react';
import Image from 'web-components/lib/components/image';
import { withKnobs, number } from '@storybook/addon-knobs';

export default {
  title: 'Components|Image',
  component: Image,
  decorators: [withKnobs],
};

const imageSrc = 'https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png';
const imageStorageBaseUrl = process.env.STORYBOOK_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.STORYBOOK_API_URI;

const label = 'Image Quality';
const defaultValue = 100;
const options = {
  range: true,
  min: 1,
  max: 100,
  step: 1,
};

export const imageDefaultQuality100 = (): JSX.Element => {
  const value = number(label, defaultValue, options);

  return (
    <div style={{ width: 521, height: 486 }}>
      <Image
        src={imageSrc}
        alt="Wilmot"
        options={{ q: value }}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
      />
    </div>
  );
};

export const originalImage = (): JSX.Element => <img src={imageSrc} alt="Wilmot" />;
