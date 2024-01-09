import type { ViewState } from 'react-map-gl';

export type EditFileFormLocationType = 'none' | 'file' | 'custom';

export type RestrictedViewState = Pick<
  ViewState,
  'longitude' | 'latitude' | 'zoom'
>;
