import { geocodingClient } from 'lib/clients/mapbox/geocoding';

import { getGeocodingKey } from './getGeocodingQuery.constants';
import {
  ReactQueryGeocodingProps,
  ReactQueryGeocodingResponse,
} from './getGeocodingQuery.types';

export const getGeocodingQuery = ({
  request: { search },
  ...params
}: ReactQueryGeocodingProps): ReactQueryGeocodingResponse => ({
  queryKey: getGeocodingKey(search),
  queryFn: async () => {
    if (!search) return null;
    const response = await geocodingClient
      // @ts-ignore
      .forwardGeocode({
        query: search,
        limit: 1,
      })
      .send();

    return response;
  },
  ...params,
});
