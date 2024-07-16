import { CreditClassMetadataLD } from './credit-class-metadata';

export interface CFCCreditClassMetadataLD
  extends Omit<CreditClassMetadataLD, 'regen:offsetGenerationMethod'> {
  'regen:offsetGenerationMethod': {
    '@type': 'xsd:string';
    '@value': '';
  }[];
}
