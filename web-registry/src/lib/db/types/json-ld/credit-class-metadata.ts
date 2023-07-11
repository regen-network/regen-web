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
}
