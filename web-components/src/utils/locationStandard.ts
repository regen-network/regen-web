import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

import { countries } from './countries';

/**
 * Fetches from mapbox to compose a proper ISO 3166-2 standard location string
 */
export const getISOString = async (
  accessToken: string,
  location: {
    countryKey?: string;
    stateProvince?: string;
    postalCode?: string;
  },
): Promise<string | undefined> => {
  const { countryKey, stateProvince, postalCode } = location;
  if (!countryKey || !accessToken) return Promise.reject();
  if (!stateProvince) {
    return Promise.resolve(countryKey); // no need to search
  }
  const baseClient = MapboxClient({ accessToken });
  const geocoderService = mbxGeocoder(baseClient);
  let placeCode: string | undefined;

  await geocoderService
    .forwardGeocode({
      mode: 'mapbox.places',
      query: `${countries[countryKey]}+${stateProvince}`,
      types: ['country', 'region'],
    })
    .send()
    .then(res => {
      const placeCodes = res?.body?.features
        ?.filter((f: any) => !!f?.properties?.short_code)
        .sort((p: any) => p.relevance);

      const result = placeCodes?.[0]?.properties?.short_code || '';
      if (!!result) placeCode = result;
      if (postalCode) placeCode += ` ${postalCode}`;
    });

  // If country-only, mapbox returns lowercase ('us'), so need toUppercase here for ledger
  return Promise.resolve(placeCode?.toUpperCase());
};
