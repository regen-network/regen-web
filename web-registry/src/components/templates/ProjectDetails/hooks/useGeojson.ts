import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useQuery } from '@tanstack/react-query';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { getGeojsonQuery } from 'lib/queries/react-query/registry-server/getGeojsonQuery/getGeojsonQuery';

import { parseGeojson } from '../utils/parseGeojson';

interface UseGeojsonParams {
  projectMetadata?: AnchoredProjectMetadataBaseLD;
  projectPageMetadata?: ProjectPageMetadataLD;
}

export default function useGeojson({
  projectMetadata,
  projectPageMetadata,
}: UseGeojsonParams): {
  geojson?: string | GeocodeFeature;
  isGISFile: boolean;
} {
  // Convert kml to geojson
  const mapFile = projectPageMetadata?.['regen:boundaries'];
  let isGISFile = false,
    isKMLFile = false;
  if (mapFile) {
    isGISFile = /\.(json|kml)$/i.test(mapFile);
    isKMLFile = /\.kml$/i.test(mapFile);
  }

  const metadataLocation = projectMetadata?.['schema:location'];

  const { data: geojsonResult } = useQuery(
    getGeojsonQuery({ mapFile, enabled: isGISFile && !!mapFile }),
  );
  const geojson =
    parseGeojson({ isKMLFile, geojsonResult }) ?? metadataLocation;

  return { geojson, isGISFile };
}
