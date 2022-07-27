import { useState, useEffect } from 'react';
import { getISOString } from 'web-components/lib/utils/locationStandard';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import {
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '../../../generated/json-ld';

const useGetJurisdiction = (
  metadata: Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>,
): string => {
  const [jurisdiction, setJurisdiction] = useState('');
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  useEffect(() => {
    const getJurisdiction = async (): Promise<void> => {
      if (!mapboxToken) return Promise.reject();
      const location = metadata?.['schema:location'];
      if (!location) setJurisdiction('');
      const context: GeocodeFeature[] = location?.context || [];
      let countryKey = '';
      let stateProvince = '';
      let postalCode = '';
      context.forEach(ctx => {
        if (ctx.id.includes('country')) {
          countryKey = ctx.text;
          return;
        }
        if (ctx.id.includes('region')) {
          stateProvince = ctx.text;
          return;
        }
        if (ctx.id.includes('postcode')) {
          postalCode = ctx.text;
          return;
        }
      });

      try {
        const isoString = await getISOString(mapboxToken, {
          countryKey,
          stateProvince,
          postalCode,
        });
        if (geocodingError) setGeocodingError(null);
        if (isoString) setJurisdiction(isoString);
      } catch (err) {
        // initially this effect may fail mainly because the accessToken
        // (mapboxToken) is not set in the environment variables.
        setGeocodingError((err as string) || 'Geocoding service not available');
      }
    };

    getJurisdiction();
  }, [mapboxToken, geocodingError, setGeocodingError, metadata]);

  return jurisdiction;
};

export { useGetJurisdiction };
