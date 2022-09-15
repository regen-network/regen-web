import { DeliverTxResponse } from '@cosmjs/stargate';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import iso3166 from 'iso-3166-2';

import {
  getISOString,
  getJurisdictionIsoCode,
} from 'web-components/lib/utils/locationStandard';

import {
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '../../generated/json-ld';

const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const getOnChainProjectId = (
  deliverTxResponse?: DeliverTxResponse,
): string => {
  if (!deliverTxResponse?.rawLog) return '';
  const rawLog = JSON.parse(deliverTxResponse?.rawLog);
  // regen.ecocredit.v1.EventCreateProject
  const event = rawLog?.[0]?.events?.find((event: any) =>
    event?.type?.includes('EventCreateProject'),
  );
  const projectId = event?.attributes
    ?.find((attribute: any) => attribute?.key === 'project_id')
    ?.value?.replace(/['"]+/g, '');
  return projectId;
};

export const getJurisdiction = async (
  metadata: Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>,
): Promise<string | undefined> => {
  if (!mapboxToken) return Promise.reject('Missing map API token');
  let isoString;
  const location = metadata?.['schema:location'];
  if (!location?.['geojson:context'] && !location?.['geojson:place_name']) {
    return Promise.reject('Please select a location for this project.');
  }
  const context: any[] = location?.['geojson:context'] || [];
  let countryKey = '';
  let stateProvince = '';
  let postalCode = '';
  context.forEach(ctx => {
    if (ctx?.['geojson:id'].includes('country')) {
      countryKey = getCountryKey(ctx?.['geojson:text']);
      return;
    }
    if (ctx?.['geojson:id'].includes('region')) {
      stateProvince = ctx?.['geojson:text'];
      return;
    }
    if (ctx?.['geojson:id'].includes('postcode')) {
      postalCode = ctx?.['geojson:text'];
      return;
    }
  });

  // if GeocodeFeature context is insufficient, we can get a country code from place_name
  if (!countryKey && location?.['geojson:place_name']) {
    const placeSegments = location['geojson:place_name'].split(',');
    // find the country key
    placeSegments.forEach((segment: string) => {
      const isUnitedStates = segment.toLowerCase().includes('united states');
      if (isUnitedStates) countryKey = 'US';
      const foundCountry = getCountryKey(segment.trim());
      if (foundCountry) {
        countryKey = foundCountry;
        return;
      }
    });
  }

  if (countryKey && !stateProvince) {
    const placeSegments = location['geojson:place_name'].split(',');

    placeSegments.forEach((segment: string) => {
      const foundStateProvince = getStateProvince(countryKey, segment.trim());
      if (foundStateProvince) {
        stateProvince = foundStateProvince;
        return;
      }
    });
  }
  // console.log('iso3166 \n', iso3166.data);
  console.log('countryKey', countryKey);
  console.log('stateProvince', stateProvince);
  console.log('postalCode', postalCode);
  try {
    isoString = await getISOString(mapboxToken, {
      countryKey,
      stateProvince,
      postalCode,
    });
    // isoString = await getJurisdictionIsoCode({
    //   country: countryKey,
    //   stateProvince,
    //   postalCode,
    // });
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve(isoString);
};

const getCountryKey = (country: string): string => {
  const foundKey = Object.keys(iso3166.data).find(key => {
    return (
      iso3166.data[key].name.toLowerCase() === country.trim().toLowerCase()
    );
  });
  if (foundKey) return foundKey;
  return '';
};

const getStateProvince = (
  countryKey: string,
  stateProvince: string,
): string | undefined => {
  const subdivision = iso3166.subdivision(countryKey, stateProvince);
  console.log('subdivision', subdivision);
  return subdivision?.name;
};
