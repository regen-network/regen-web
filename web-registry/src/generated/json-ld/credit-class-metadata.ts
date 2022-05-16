import { URL, TypeValue } from '../../types/rdf';

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
}

export interface ApprovedMethodologies {
  '@type': 'schema:BreadcrumbList';
  'schema:url': URL;
  'schema:itemListElement': ItemListElement[];
}

interface ItemListElement {
  '@type': string;
  'schema:url': URL;
  'schema:name': string;
  'schema:version': TypeValue;
  'schema:identifier': TypeValue;
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
