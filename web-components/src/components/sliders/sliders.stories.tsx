import * as React from 'react';
import { ItemProps } from 'web-components/lib/components/sliders/Item';
import ProtectedSpecies, {
  ProtectedSpeciesProps,
} from 'web-components/lib/components/sliders/ProtectedSpecies';
import ProjectMedia, { Media } from 'web-components/lib/components/sliders/ProjectMedia';

import Grid from '@material-ui/core/Grid';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'Components|Sliders',
  component: ProtectedSpecies,
  decorators: [withKnobs],
};

const item: ItemProps = {
  name: 'Melaleuca brevifolia',
  imgSrc: './melaleuca-b.png',
};

const species: ProtectedSpeciesProps = [item, item, item, item, item, item, item, item, item, item];

// export const protectedSpeciesItem = (): JSX.Element => (
//   <Item name={text('Name', item.name)} imgSrc={item.imgSrc} />
// );

export const protectedSpecies = (): JSX.Element => (
  <Grid container>
    <Grid item xs={12} sm={4}>
      <ProtectedSpecies species={object('Species', species)} />
    </Grid>
  </Grid>
);

const assets: Media[] = [
  {
    src: './andover.jpg',
    thumbnail: './andover.jpg',
  },
  {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
];

export const projectMedia = (): JSX.Element => (
  <div style={{ width: 600, height: 400 }}>
    <ProjectMedia assets={object('assets', assets)} />
  </div>
);

// TODO: add other sliders
