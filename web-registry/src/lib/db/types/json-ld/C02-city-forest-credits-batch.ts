import { UrlType } from 'lib/rdf/types';

import { BatchMetadataLD } from './batch-base';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/credit-batches/C02-batch.jsonld

export interface CFCBatchMetadataLD extends BatchMetadataLD {
  '@context'?: Context;
  'regen:cfcCreditSerialNumbers'?: string[];
  'regen:cfcVintageYear'?: XSDYear;
  'regen:verificationReports'?: UrlType[];
}

interface Context {
  schema: 'http://schema.org/';
  regen: 'http://regen.network/';
  xsd: 'http://www.w3.org/2001/XMLSchema#';
  'regen:cfcVintageYear': { '@type': 'xsd:gYear'; '@value': string };
  'regen:cfcCreditSerialNumbers': { '@container': '@list' };
  'regen:verificationReports': { '@container': '@list' };
  'schema:url': { '@type': 'schema:URL' };
}

interface XSDYear {
  '@type': 'xsd:gYear';
  '@value': string;
}
