// TODO: Use [json-to-ts](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts) to generate type from
// https://github.com/regen-network/regen-registry-standards/blob/a2d81baebe7756226a58b126378d1890ad4cadcc/jsonld/projects/C01-verified-carbon-standard-project.json

export interface VcsProjectMetadataLD {
  '@context': {
    schema: 'http://schema.org/';
    regen: 'http://regen.network/';
    qudt: 'http://qudt.org/schema/qudt';
    unit: 'http://qudt.org/2.1/vocab/unit';
    xsd: 'http://www.w3.org/2001/XMLSchema#';
  };
  '@type': 'http://regen.network/Project';
  'http://regen.network/vcsProjectId': {
    '@type': 'xsd:unsignedInt';
    '@value': number;
  };
  'http://regen.network/vcsProjectPage': {
    '@type': 'http://schema.org/URL';
    '@value': string;
  };
  'http://regen.network/projectDeveloper': {
    '@type': 'http://regen.network/Organization';
    'http://schema.org/name': string;
    'http://schema.org/description': string;
  };
  'http://regen.network/vcsProjectType': string;
  'http://regen.network/projectActivity': {
    'http://schema.org/name': string;
    'http://schema.org/url': {
      '@type': 'http://schema.org/URL';
      '@value': string;
    };
  };
  'http://regen.network/landStory': string;
  'http://regen.network/offsetGenerationMethod': string;
  'http://regen.network/vcsMethodology': {
    'http://schema.org/name': string;
    'http://schema.org/url': {
      '@type': 'http://schema.org/URL';
      '@value': string;
    };
  };
  'http://regen.network/additionalCertification': {
    'http://schema.org/name': string;
    'http://schema.org/version': string;
    'http://schema.org/url': {
      '@type': 'http://schema.org/URL';
      '@value': string;
    };
  };
  'http://regen.network/projectSize': {
    'qudt:unit': {
      '@type': 'qudt:Unit';
      '@value': string;
    };
    'qudt:numericValue': {
      '@type': 'xsd:double';
      '@value': number;
    };
  };
  'http://regen.network/projectStartDate': {
    '@type': 'xsd:date';
    '@value': Date;
  };
  'http://regen.network/projectEndDate': {
    '@type': 'xsd:date';
    '@value': Date;
  };
}
