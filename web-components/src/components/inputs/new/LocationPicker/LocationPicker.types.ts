import type { ViewState } from 'react-map-gl';

export type RestrictedViewState = Pick<
  ViewState,
  'longitude' | 'latitude' | 'zoom'
>;
