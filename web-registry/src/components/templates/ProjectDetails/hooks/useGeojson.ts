import { useQuery } from '@tanstack/react-query';

import { getGeojsonQuery } from 'lib/queries/react-query/registry-server/getGeojsonQuery/getGeojsonQuery';

import { parseGeojson } from '../utils/parseGeojson';

export default function useGeojson(metadata: any): {
  geojson: any;
  isGISFile: boolean;
} {
  // Convert kml to geojson
  const mapFile: string = metadata?.['regen:boundaries']?.['@value'];
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);
  const isKMLFile: boolean = /\.kml$/i.test(mapFile);
  const metadataLocation = metadata?.['schema:location'];

  const { data: geojsonResult } = useQuery(
    getGeojsonQuery({ mapFile, enabled: isGISFile && !!mapFile }),
  );
  const geojson =
    parseGeojson({ isKMLFile, geojsonResult }) ?? metadataLocation;

  return { geojson, isGISFile };
}
