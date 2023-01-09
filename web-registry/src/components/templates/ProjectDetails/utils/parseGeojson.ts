import * as togeojson from '@mapbox/togeojson';

type Params = {
  isKMLFile: boolean;
  geojsonResult?: string | null;
};

export const parseGeojson = ({
  isKMLFile,
  geojsonResult,
}: Params): string | undefined => {
  if (geojsonResult && isKMLFile) {
    const dom = new DOMParser().parseFromString(geojsonResult, 'text/xml');
    return togeojson.kml(dom);
  } else if (geojsonResult) {
    return JSON.parse(geojsonResult);
  }

  return undefined;
};
