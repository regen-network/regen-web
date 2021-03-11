import * as React from 'react';
import Image from 'web-components/lib/components/image';
import { withKnobs, number } from '@storybook/addon-knobs';

export default {
  title: 'Components|Image',
  component: Image,
  decorators: [withKnobs],
};

const imageSrc = 'https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png';

const label = 'Image Quality';
const defaultValue = 80;
const options = {
  range: true,
  min: 1,
  max: 100,
  step: 1,
};

export const imageDefaultQuality80 = (): JSX.Element => {
  const value = number(label, defaultValue, options);

  return (
    <div style={{ width: 521, height: 486 }}>
      <Image src={imageSrc} alt="Wilmot" options={{ q: value }} />
    </div>
  );
};

export const originalImage = (): JSX.Element => <img src={imageSrc} alt="Wilmot" />;
