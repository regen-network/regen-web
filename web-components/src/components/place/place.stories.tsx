import * as React from 'react';
import PlaceInfo from 'web-components/lib/components/place/PlaceInfo';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';

export default {
  title: 'Place',
  component: PlaceInfo,
};

const place = 'Melbourne, Victoria, Australia';

export const projectPlaceInfo = (): JSX.Element => (
  <ProjectPlaceInfo place={place} area={440} areaUnit={'hectares'} />
);

// export const creditPlaceInfo = (): JSX.Element => (
//   <CreditPlaceInfo place={'Brazil'} outcome={'carbon'} />
// );
