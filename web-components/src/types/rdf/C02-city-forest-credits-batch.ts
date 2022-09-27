import { UrlType } from 'src/utils/schemaURL';

export interface CFCBatchMetadataLD {
  '@context': Context;
  '@type': 'regen:C02-CreditBatch';
  'regen:cfcCreditSerialNumbers': string[];
  'regen:cfcVintageYear': { '@type': 'xsd:gYear'; '@value': string }; //TODO
  'regen:verificationReports': UrlType[];
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
