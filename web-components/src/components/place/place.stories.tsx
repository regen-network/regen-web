import PlaceInfo from './PlaceInfo';
import ProjectPlaceInfo from './ProjectPlaceInfo';

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
