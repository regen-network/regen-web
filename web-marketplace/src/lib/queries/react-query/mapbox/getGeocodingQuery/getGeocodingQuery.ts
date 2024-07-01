import { getGeocodingClient } from 'lib/clients/mapbox/geocoding';

import { getGeocodingKey } from './getGeocodingQuery.constants';
import {
  ReactQueryGeocodingProps,
  ReactQueryGeocodingResponse,
} from './getGeocodingQuery.types';

export const getGeocodingQuery = ({
  request: { reverse = false, query, types },
  mapboxToken,
  ...params
}: ReactQueryGeocodingProps): ReactQueryGeocodingResponse => ({
  queryKey: getGeocodingKey({ reverse, query, types }),
  queryFn: async () => {
    if (!query) return null;
    const geocodingClient = getGeocodingClient(mapboxToken);
    const response = reverse
      ? await geocodingClient
          .reverseGeocode({
            query,
            limit: 1,
            types,
          })
          .send()
      : await geocodingClient
          .forwardGeocode({
            query,
            limit: 1,
            types,
          })
          .send();

    return response;
  },
  ...params,
});
