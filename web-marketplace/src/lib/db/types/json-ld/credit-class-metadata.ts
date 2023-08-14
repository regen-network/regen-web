import { ContextDefinition } from 'jsonld';

import { CompactedNameUrl } from 'lib/rdf/types';

import { Certification } from './certification';
import { ApprovedMethodologies } from './methodology';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/credit-classes/C01-verified-carbon-standard-class.json
export interface CreditClassMetadataLD {
  '@type': string;
  '@context': ContextDefinition;
  'schema:url': string;
  'schema:name': string;
  'schema:description': string;
  'schema:image': string;
  'regen:sectoralScope': string[];
  'regen:sourceRegistry': CompactedNameUrl;
  'regen:verificationMethod': string;
  'regen:approvedMethodologies': ApprovedMethodologies;
  'regen:offsetGenerationMethod': string[];
  'regen:ecosystemType': string[];
  'regen:projectActivities': string[];
  'regen:eligibleActivities': string[];
  'regen:carbonOffsetStandard'?: CompactedNameUrl;
  'regen:tokenizationSource'?: string;
  'regen:certifications'?: Certification[];
  'regen:primaryImpact': Impact;
  'regen:coBenefits'?: (Impact | string)[]; // Keeping support for string[] for now until C04 metadata is fixed (#1983).
  'regen:measuredGHGs': string[];
  'regen:bufferPoolAccounts': {
    // We probably want to simplify this to be just a @list instead,
    // but keeping as is, until C04 class metadata is updated accordingly (#1983).
    '@type': 'schema:ItemList';
    'schema:itemListElement': BufferPoolAccount[];
  };
}

export type BufferPoolAccount = {
  'schema:name': string;
  // Keeping both regen:walletAddress and regen:address for now,
  // until C04 class metadata gets fixed.
  // But ultimately, we should just use regen:address (#1983).
  'regen:walletAddress'?: string;
  'regen:address'?: string;
  'regen:poolAllocation': string;
};

export interface Impact {
  '@id': string;
  'schema:name'?: string;
  'regen:SDGs'?: { '@id': string }[];
  '@type'?: typeof MEASURED_CO_BENEFIT_IRI | typeof PROJECT_BENEFIT_IRI;
}

export const MEASURED_CO_BENEFIT_IRI = 'regen:MeasuredCoBenefit';
export const PROJECT_BENEFIT_IRI = 'regen:ProjectBenefit';
