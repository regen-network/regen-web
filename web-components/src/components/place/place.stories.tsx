import * as React from 'react';
import PlaceInfo from 'web-components/lib/components/place/PlaceInfo';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import CreditPlaceInfo from 'web-components/lib/components/place/CreditPlaceInfo';
import { withKnobs, text, number } from '@storybook/addon-knobs';

export default {
  title: 'Components|Place',
  component: PlaceInfo,
  decorators: [withKnobs],
};

export const basicPlaceInfo = (): JSX.Element => (
  <PlaceInfo>{text('place', 'Melbourne, Victoria, Australia')}</PlaceInfo>
);

export const projectPlaceInfo = (): JSX.Element => (
  <ProjectPlaceInfo
    place={text('place', 'Melbourne, Victoria, Australia')}
    area={number('area', 440)}
    areaUnit={text('areaUnit', 'hectares')}
  />
);

export const creditPlaceInfo = (): JSX.Element => (
  <CreditPlaceInfo place={text('place', 'Brazil')} outcome={text('outcome', 'carbon')} />
);
