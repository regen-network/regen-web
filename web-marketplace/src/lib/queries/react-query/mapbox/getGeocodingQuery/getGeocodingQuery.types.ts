import { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import {
  GeocodeQueryType,
  GeocodeResponse,
} from '@mapbox/mapbox-sdk/services/geocoding';
import { QueryObserverOptions } from '@tanstack/react-query';
import { LngLatLike } from 'mapbox-gl';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGeocodingResponse =
  QueryObserverOptions<MapiResponse<GeocodeResponse> | null>;

export type ReactQueryGeocodingRequest = {
  query?: string | LngLatLike;
  reverse?: boolean;
  types?: GeocodeQueryType[];
};
export type ReactQueryGeocodingProps = {
  request: ReactQueryGeocodingRequest;
  mapboxToken?: string;
} & ReactQueryBuilderResponse<ReactQueryGeocodingResponse>;
