import * as React from 'react';
import PlaceInfo from 'web-components/lib/components/place/PlaceInfo';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import { withKnobs, text, number } from '@storybook/addon-knobs';

export default {
  title: 'Components|Place',
  component: PlaceInfo,
  decorators: [withKnobs],
};

const place = 'Melbourne, Victoria, Australia';

export const projectPlaceInfo = (): JSX.Element => (
  <ProjectPlaceInfo
    place={text('place', place)}
    area={number('area', 440)}
    areaUnit={text('areaUnit', 'hectares')}
  />
);

// export const creditPlaceInfo = (): JSX.Element => (
//   <CreditPlaceInfo place={text('place', 'Brazil')} outcome={text('outcome', 'carbon')} />
// );
