import { DeliverTxResponse } from '@cosmjs/stargate';
import {
  GeocodeFeature,
  GeocodeProperties,
} from '@mapbox/mapbox-sdk/services/geocoding';

import {
  getCountryCodeByName,
  getIsoSubdivision,
} from 'web-components/src/utils/locationStandard';

import {
  AnchoredProjectMetadataBaseLD,
  CFCProjectMetadataLD,
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from 'lib/db/types/json-ld';
import { isCFCCreditClass, isVCSCreditClass } from 'lib/ecocredit/api';

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
  metadata: Partial<AnchoredProjectMetadataBaseLD>,
): Promise<string | undefined> => {
  const location = metadata?.['schema:location'];

  if (!location) {
    throw new Error('Cannot get Jurisdiction. Location data is missing.');
  }
  const { context, place_name, properties } = location;

  if (!context && !place_name) {
    throw new Error('Please select a location for this project.');
  }

  let countryKey = getCountryKey(context, place_name);
  let stateProvince = getStateProvince(
    countryKey,
    place_name,
    properties,
    context,
  );
  let postalCode = getPostalCode(context);
  const jurisdiction = stateProvince ? stateProvince + postalCode : countryKey;
  return jurisdiction.toLocaleUpperCase();
};

const getCountryKey = (context: any, place_name: string) => {
  let countryKey =
    findInContext(context, 'country', 'short_code') ||
    getCountryCodeFromPlaceName(place_name);
  return countryKey;
};

const getStateProvince = (
  countryKey: string | undefined,
  stateProvince: string,
  properties: GeocodeProperties,
  context: GeocodeFeature | GeocodeFeature[],
): string | undefined => {
  if (properties?.short_code) {
    return properties.short_code;
  }

  const regionShortCode = findInContext(context, 'region', 'short_code');
  if (regionShortCode) {
    return regionShortCode;
  }

  const subdivision = getIsoSubdivision({
    country: countryKey,
    subdivision: stateProvince,
  });
  if (subdivision) {
    return subdivision?.name;
  }
};

const getPostalCode = (context: GeocodeFeature | GeocodeFeature[]) =>
  findInContext(context, 'postcode', 'text');

const findInContext = (
  context: GeocodeFeature | GeocodeFeature[],
  id: 'country' | 'region' | 'postcode',
  property: 'short_code' | 'text',
): string => {
  const contextArray = Array.isArray(context) ? context : [context];
  const found = contextArray.find(ctx => ctx.id.includes(id));
  const foundProperty = found?.[property];
  return foundProperty || '';
};

const getCountryCodeFromPlaceName = (place_name: string) => {
  if (!place_name) return '';
  const segments = place_name.split(',');
  for (const segment of segments) {
    const foundCountry = getCountryCodeByName(segment.trim());
    if (foundCountry) return foundCountry;
  }
  return '';
};

// TODO: Handle for all cases: regen-network/regen-registry#1104
export const getProjectReferenceID = (
  metadata: Partial<ProjectMetadataLD>,
  creditClassId?: string | null,
): string => {
  if (!creditClassId) return '';
  const isVCS = isVCSCreditClass(creditClassId);
  const vcsProjectId = (metadata as Partial<VCSProjectMetadataLD>)?.[
    'regen:vcsProjectId'
  ];
  if (isVCS && vcsProjectId) return `VCS-${vcsProjectId}`;
  const isCFC = isCFCCreditClass(creditClassId);
  const cfcProjectId = (metadata as Partial<CFCProjectMetadataLD>)?.[
    'regen:cfcProjectId'
  ];
  if (isCFC && cfcProjectId) return `CFC-${cfcProjectId}`;
  return '';
};
