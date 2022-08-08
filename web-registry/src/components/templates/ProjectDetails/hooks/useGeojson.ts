import { useEffect, useState } from 'react';
import * as togeojson from '@mapbox/togeojson';

import { UseStateSetter } from 'types/react/use-state';

export default function useGeojson(metadata: any): {
  geojson: any;
  isGISFile: boolean;
  setGeojson: UseStateSetter<any | null>;
} {
  const [geojson, setGeojson] = useState<any | null>(null);

  // Convert kml to geojson
  const mapFile: string = metadata?.['regen:boundaries']?.['@value'];
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);
  const isKMLFile: boolean = /\.kml$/i.test(mapFile);
  const metadataLocation = metadata?.['schema:location'];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetch(mapFile)
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
    };

    if (!geojson && isGISFile) {
      fetchData();
    } else if (metadataLocation) {
      setGeojson(metadataLocation);
    }
  }, [geojson, isGISFile, isKMLFile, mapFile, metadataLocation]);

  return { geojson, isGISFile, setGeojson };
}
