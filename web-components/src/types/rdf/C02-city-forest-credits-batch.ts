import { UrlType } from 'src/utils/schemaURL';

export interface CFCBatchMetadataLD {
  '@context': Context;
  '@type': 'regen:C02-CreditBatch';
  'regen:cfcCreditSerialNumbers': string[];
  'regen:cfcVintageYear': string;
  'regen:verificationReports': UrlType[];
}

interface Context {
  schema: 'http://schema.org/';
  regen: 'http://regen.network/';
  xsd: 'http://www.w3.org/2001/XMLSchema#';
  'regen:cfcVintageYear': { '@type': 'xsd:gYear' };
  'regen:cfcCreditSerialNumbers': { '@container': '@list' };
  'regen:verificationReports': { '@container': '@list' };
  'schema:url': { '@type': 'schema:URL' };
}
