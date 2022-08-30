import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';
import iso3166 from 'iso-3166-2';

import { Option } from '../components/inputs/SelectTextField';

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

/**
 * Utility function to obtain the list of country options according
 * to the iso-3166-2 package, for the selector type input.
 * By default it is initialized with the selection in US. It also places
 * the default country as the first option in the list, after the placeholder.
 */

const DEFAULT_COUNTRY = 'US';

const COUNTRY_OPTION_PLACEHOLDER: Option = {
  value: '',
  label: 'Please choose a country',
};

export function getCountryOptions(): Option[] {
  const countries = Object.keys(iso3166.data)
    .map(key => ({
      value: key,
      label: iso3166.data[key].name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const defaultCountry = countries.find(
    country => country.value === DEFAULT_COUNTRY,
  );
  const otherCountries = countries.filter(
    country => country.value !== DEFAULT_COUNTRY,
  );

  let options = [COUNTRY_OPTION_PLACEHOLDER];
  if (defaultCountry) options.push(defaultCountry);
  options.push(...otherCountries);

  return options;
}

/**
 * Utility function to obtain the list of options of the subdivisions
 * (aka. state/region) corresponding to a country, according to the
 * iso-3166-2 package, for the selector type input.
 */

const COUNTRY_SUBDIVISION_OPTION_PLACEHOLDER: Option = {
  value: '',
  label: 'Please choose a state',
};

export function getCountrySubdivisionOptions(country: string): Option[] {
  const countrySubdivisions = iso3166.country(country);

  const options: Option[] = Object.keys(countrySubdivisions?.sub || {})
    .map(isoCode => ({
      value: isoCode,
      label: `${countrySubdivisions?.sub[isoCode].name} (${countrySubdivisions?.sub[isoCode].type})`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  if (options.length > 0)
    options.unshift(COUNTRY_SUBDIVISION_OPTION_PLACEHOLDER);

  return options;
}
