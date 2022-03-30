import { URL } from '../rdf';

// TODO: Use [json-to-ts](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts) to generate type from
// https://github.com/regen-network/regen-registry-standards/blob/a2d81baebe7756226a58b126378d1890ad4cadcc/jsonld/projects/C01-verified-carbon-standard-project.json

export interface VcsProjectMetadataLD {
  '@type': 'http://regen.network/Project';
  'http://regen.network/vcsProjectId': {
    '@type': 'xsd:unsignedInt';
    '@value': number;
  };
  'http://regen.network/vcsProjectPage': URL;
  'http://regen.network/projectDeveloper': {
    '@type': 'http://regen.network/OrganizationDisplay';
    'http://schema.org/name': string;
    'http://schema.org/description': string;
    'http://regen.network/showOnProjectPage': boolean;
  };
  'http://regen.network/vcsProjectType': string;
  'http://regen.network/projectActivity': {
    'http://schema.org/name': string;
    'http://schema.org/url': URL;
  };
  'http://regen.network/landStory': string;
  'http://regen.network/offsetGenerationMethod': string;
  'http://regen.network/vcsMethodology': {
    'http://schema.org/name': string;
    'http://schema.org/url': URL;
  };
  'http://regen.network/additionalCertification': {
    'http://schema.org/name': string;
    'http://schema.org/url': URL;
  };
  'http://regen.network/projectSize': {
    'http://qudt.org/schema/qudt/unit': {
      '@type': 'http://qudt.org/schema/qudt/Unit';
      '@value': string;
    };
    'http://qudt.org/schema/qudt/numericValue': {
      '@type': 'http://www.w3.org/2001/XMLSchema#double';
      '@value': number;
    };
  };
  'http://regen.network/projectStartDate': {
    '@type': 'http://www.w3.org/2001/XMLSchema#date';
    '@value': Date;
  };
  'http://regen.network/projectEndDate': {
    '@type': 'http://www.w3.org/2001/XMLSchema#date';
    '@value': Date;
  };
}
