import { CompactedNameUrl } from 'lib/rdf/types';

import { Certification } from './certification';
import { ApprovedMethodologies } from './methodology';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/credit-classes/C01-verified-carbon-standard-class.json

export interface CreditClassMetadataLD {
  '@type': string;
  '@context': Context;
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
  'regen:carbonOffsetStandard'?: CompactedNameUrl;
  'regen:tokenizationSource'?: string;
  'regen:certifications'?: Certification[];
}

interface Context {
  xsd: string;
  regen: string;
  schema: string;
  'regen:sectoralScope': ContainerList;
  'schema:itemListElement': ContainerList;
  'regen:offsetGenerationMethod': ContainerList;
  'regen:certification'?: ContainerList;
}

interface ContainerList {
  '@container': '@list';
}
