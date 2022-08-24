import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';
import iso3166 from 'iso-3166-2';

const POSTAL_CODE_MAX_LENGTH = 64;

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
      query: `${iso3166.data[countryKey].name}+${stateProvince}`,
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
  country: string; // iso 3166-1 alpha 2 (ie. US)
  stateProvince?: string; // iso 3166-2 (ie. US-CO)
  postalCode?: string;
};

export const getJurisdictionIsoCode = ({
  country,
  stateProvince,
  postalCode,
}: LocationType): string => {
  // check iso country
  if (!iso3166.country(country)) throw new Error(`Invalid country: ${country}`);
  // check subdivision exists, also iso subdivision (failing search is an empty object)
  if (!stateProvince || !iso3166.subdivision(stateProvince)?.code)
    return country;
  // TODO - text fields allow whitespace strings..
  // The trim must be done before the check, since an empty string
  // returns false, but a string with whitespace returns true.
  const _postalCode = postalCode?.trim();
  // check postal code exists and valid length
  if (!_postalCode || _postalCode.length > POSTAL_CODE_MAX_LENGTH)
    return stateProvince;
  return `${stateProvince} ${_postalCode}`;
};
