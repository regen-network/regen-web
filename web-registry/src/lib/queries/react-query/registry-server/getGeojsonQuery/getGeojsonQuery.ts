import { getGeojsonKey } from './getGeojsonQuery.constants';
import {
  ReactQueryGeojsonProps,
  ReactQueryGeojsonResponse,
} from './getGeojsonQuery.types';

export const getGeojsonQuery = ({
  mapFile,
  ...params
}: ReactQueryGeojsonProps): ReactQueryGeojsonResponse => ({
  queryKey: getGeojsonKey(mapFile),
  queryFn: async () => {
    if (!mapFile) return null;

    return await fetch(mapFile).then(r => r.text());
  },
  ...params,
});
