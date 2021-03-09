import * as React from 'react';
import Image from 'web-components/lib/components/image';

export default {
  title: 'Components|Image',
  component: Image,
};

const imageSrc = 'https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png';

export const imageDefaultQuality80 = (): JSX.Element => <Image src={imageSrc} alt="Wilmot" />;

export const imageQuality70 = (): JSX.Element => <Image src={imageSrc} alt="Wilmot" options={{ q: 70 }} />;

export const imageQuality90 = (): JSX.Element => <Image src={imageSrc} alt="Wilmot" options={{ q: 90 }} />;

export const imageQuality100 = (): JSX.Element => <Image src={imageSrc} alt="Wilmot" options={{ q: 100 }} />;

export const originalImage = (): JSX.Element => <img src={imageSrc} alt="Wilmot" />;
