import { URL } from 'lib/rdf/types';

import { ApprovedMethodologies } from './methodology';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/credit-classes/C01-verified-carbon-standard-class.json

export interface CreditClassMetadataLD {
  '@type': string;
  '@context': Context;
  'schema:url': URL;
  'schema:name': string;
  'schema:description': string;
  'regen:sectoralScope': string[];
  'regen:sourceRegistry': NameURL;
  'regen:verificationMethod': string;
  'regen:approvedMethodologies': ApprovedMethodologies;
  'regen:offsetGenerationMethod': string[];
  'regen:ecosystemType': string[];
  'regen:projectActivities': string[];
  'regen:carbonOffsetStandard': NameURL;
  'regen:tokenizationSource': string;
}

interface NameURL {
  'schema:url': URL;
  'schema:name': string;
}

interface Context {
  xsd: string;
  regen: string;
  schema: string;
  'regen:sectoralScope': ContainerList;
  'schema:itemListElement': ContainerList;
  'regen:offsetGenerationMethod': ContainerList;
}

interface ContainerList {
  '@container': '@list';
}
