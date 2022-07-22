import { useEffect, useState } from 'react';
import * as togeojson from '@mapbox/togeojson';

export default function useGeojson(metadata: any) {
  const [geojson, setGeojson] = useState<any | null>(null);

  // Convert kml to geojson
  const mapFile: string = metadata?.['regen:boundaries']?.['@value'];
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);
  const isKMLFile: boolean = /\.kml$/i.test(mapFile);
  const metadataLocation = metadata?.['schema:location'];

  useEffect(() => {
    if (!geojson && isGISFile) {
      fetch(mapFile)
        .then(r => r.text())
        .then(text => {
          let geojson;
          if (isKMLFile) {
            const dom = new DOMParser().parseFromString(text, 'text/xml');
            geojson = togeojson.kml(dom);
          } else {
            geojson = JSON.parse(text);
          }
          setGeojson(geojson);
        });
    } else if (metadataLocation) {
      setGeojson(metadataLocation);
    }
  }, [geojson, isGISFile, isKMLFile, mapFile, metadataLocation]);

  return { geojson, isGISFile, setGeojson };
}
