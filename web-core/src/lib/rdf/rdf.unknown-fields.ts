import { ContextDefinition, ExpandedTermDefinition } from 'jsonld';

import {
  AnchoredProjectMetadataLD,
  CreditBatchMetadataIntersectionLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';

function getUnknowFields(data: object, knownFields: string[]) {
  return Object.entries(data).filter(
    ([key]) => !['@context', '@type', '@id', ...knownFields].includes(key),
  );
}

type KnownClassFields = keyof CreditClassMetadataLD;
const knownClassFields: KnownClassFields[] = [
  'schema:url',
  'schema:name',
  'schema:description',
  'schema:image',
  'regen:sectoralScope',
  'regen:sourceRegistry',
  'regen:verificationMethod',
  'regen:approvedMethodologies',
  'regen:offsetGenerationMethod',
  'regen:ecosystemType',
  'regen:projectActivities',
  'regen:eligibleActivities',
  'regen:carbonOffsetStandard',
  'regen:tokenizationSource',
  'regen:certifications',
  'regen:coBenefits',
  'regen:measuredGHGs',
  'regen:bufferPoolAccounts',
];

export function getClassUnknownFields<T extends CreditClassMetadataLD>(
  data: T,
) {
  return getUnknowFields(data, knownClassFields);
}

type KnownProjectFields = keyof AnchoredProjectMetadataLD;
const knownProjectFields: KnownProjectFields[] = [
  'schema:name',
  'schema:location',
  'regen:projectType',
  'regen:projectActivity',
  'regen:offsetGenerationMethod',
  'regen:projectSize',
  'regen:projectStartDate',
  'regen:projectEndDate',
  'regen:projectDeveloper',
  'regen:projectVerifier',
  'regen:landSteward',
  'regen:landOwner',
  'regen:projectOriginator',
  'regen:vcsProjectId',
  'regen:vcsProjectPage',
  'regen:vcsMethodology',
  'regen:approvedMethodologies',
  'regen:toucanProjectTokenId',
  'regen:toucanURI',
  'regen:cfcProjectId',
  'regen:cfcProjectPage',
  'regen:offsetProtocol',
  'regen:projectDesignDocument',
];

export function getProjectUnknownFields<T extends AnchoredProjectMetadataLD>(
  data: T,
) {
  return getUnknowFields(data, knownProjectFields);
}

type KnownBatchFields = keyof CreditBatchMetadataIntersectionLD;
const knownBatchFields: KnownBatchFields[] = [
  'regen:vcsProjectId',
  'regen:vcsRetirementSerialNumber',
  'regen:additionalCertifications',
  'regen:cfcCreditSerialNumbers',
  'regen:cfcVintageYear',
  'regen:verificationReports',
  'regen:toucanVintageTokenId',
  'regen:toucanURI',
];

export function getBatchUnknownFields<
  T extends CreditBatchMetadataIntersectionLD,
>(data: T) {
  return getUnknowFields(data, knownBatchFields);
}

export function getFieldLabel(fieldName: string) {
  return fieldName.split(':')[1].replace(/([A-Z])/g, ' $1');
}

export function getFieldType(fieldName: string, context?: ContextDefinition) {
  return (context?.[fieldName] as ExpandedTermDefinition | undefined)?.[
    '@type'
  ];
}
