import * as React from 'react';
import ImageGrid from 'web-components/lib/components/image-grid';

export default {
  title: 'Image Grid',
  component: ImageGrid,
};
const titleText: string = 'Verified outcomes';
const descriptionText: string =
  'Software-based and remote-sensing monitoring keeps costs low and transparency high.';

export const imageGrid = (): JSX.Element => (
  <ImageGrid
    even={true}
    img={<img src="./andover.jpg" alt="andover" />}
    title={titleText}
    description={descriptionText}
  />
);
