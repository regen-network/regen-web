import { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import { GeocodeResponse } from '@mapbox/mapbox-sdk/services/geocoding';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGeocodingResponse =
  QueryObserverOptions<MapiResponse<GeocodeResponse> | null>;

export type ReactQueryGeocodingProps = {
  request: { search?: string };
} & ReactQueryBuilderResponse<ReactQueryGeocodingResponse>;
