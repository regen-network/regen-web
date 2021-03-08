import * as React from 'react';
import ImageGrid from 'web-components/lib/components/image-grid';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components|Image Grid',
  component: ImageGrid,
  decorators: [withKnobs],
  parameters: {
    fileName: __filename,
  },
};
const titleText: string = 'Verified outcomes';
const descriptionText: string =
  'Software-based and remote-sensing monitoring keeps costs low and transparency high.';

export const imageGrid = (): JSX.Element => (
  <ImageGrid
    even={boolean('even', true)}
    img={<img src="./andover.jpg" alt="andover" />}
    title={text('title', titleText)}
    description={text('description', descriptionText)}
  />
);
