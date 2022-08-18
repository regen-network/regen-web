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
  if (!countryKey || !accessToken)
    return Promise.reject(
      'Geocoding service is unavailable: missing `countryKey` or `accessToken`',
    );
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
      if (!!result) {
        placeCode = result;
        const isResultValid = countryKey.toUpperCase() !== result.toUpperCase();
        if (isResultValid && postalCode) placeCode += ` ${postalCode}`;
      }
    });

  // If country-only, mapbox returns lowercase ('us'), so need toUppercase here for ledger
  return Promise.resolve(placeCode?.toUpperCase());
};

// Util function to prepare jurisdiction ISO code
// based on package iso-3166-2

type LocationType = {
  country: string;
  stateProvince?: string;
  postalCode?: string;
};

export const getJurisdictionIsoCode = ({
  country, // US
  stateProvince, // US-CO
  postalCode,
}: LocationType): string => {
  let jurisdiction = country;

  // TODO - text fields allow whitespace strings..
  const _postalCode = postalCode?.trim();

  if (stateProvince && !_postalCode) {
    jurisdiction = stateProvince;
  }

  if (stateProvince && _postalCode) {
    jurisdiction = `${stateProvince} ${_postalCode}`;
  }

  return jurisdiction;
};
