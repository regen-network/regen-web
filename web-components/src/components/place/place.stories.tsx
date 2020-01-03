import * as React from 'react';
import PlaceInfo from 'web-components/lib/components/place/PlaceInfo';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import CreditPlaceInfo from 'web-components/lib/components/place/CreditPlaceInfo';

export default {
  title: 'Components|Place',
  component: PlaceInfo,
};

export const basicPlaceInfo = (): JSX.Element => <PlaceInfo>Victoria, Australia</PlaceInfo>;

export const projectPlaceInfo = (): JSX.Element => (
  <ProjectPlaceInfo place="Melbourne, Victoria, Australia" area={440} />
);

export const creditPlaceInfo = (): JSX.Element => <CreditPlaceInfo place="Brazil" outcome="carbon" />;
