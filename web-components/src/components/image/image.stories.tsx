import * as React from 'react';
import Image from 'web-components/lib/components/image';

export default {
  title: 'Components|Image',
  component: Image,
};

const imageSrc = 'https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png';

export const image = (): JSX.Element => <Image src={imageSrc} alt="Wilmot" />;

export const originalImage = (): JSX.Element => <img src={imageSrc} alt="Wilmot" />;
