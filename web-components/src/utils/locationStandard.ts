import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

import { countries } from './countries';

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const baseClient = MapboxClient({ accessToken });
const geocoderService = mbxGeocoder(baseClient);

/**
 * Fetches from mapbox to compose a proper ISO 3166-2 standard location string
 */
export const getISOString = async (
  countryKey?: string,
  stateProvice?: string,
  postalCode?: string,
): Promise<string | undefined> => {
  let placeCode: string | undefined;
  if (!countryKey) return Promise.reject();
  if (countryKey && !stateProvice && !postalCode) {
    return Promise.resolve(countryKey); // no need to search
  }

  await geocoderService
    .forwardGeocode({
      mode: 'mapbox.places',
      query: `${countries[countryKey]}+${stateProvice}`,
      types: ['country', 'region'],
    })
    .send()
    .then(res => {
      const placeCodes = res?.body?.features
        ?.filter((f: any) => !!f?.properties?.short_code)
        .sort((p: any) => p.relevance);

      const result = placeCodes?.[0]?.properties?.short_code || '';
      if (!!result) placeCode = result;
      if (!!postalCode) placeCode += ` ${postalCode}`;
    });

  // If country-only, mapbox returns lowercase ('us'), so need toUppercase here for ledger
  return Promise.resolve(placeCode?.toUpperCase());
};
