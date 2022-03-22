export type VcsProjectMetadata = {
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
    '@type': 'schema:URL';
    '@value': string;
  };
  'http://regen.network/projectDeveloper': {
    '@type': 'http://regen.network/Organization';
    'schema:name': string;
    'schema:description': string;
  };
  'http://regen.network/vcsProjectType': string;
  'http://regen.network/projectActivity': string;
  'http://regen.network/landStory': string;
  'http://regen.network/offsetGenerationMethod': string;
  'http://regen.network/vcsMethodology': {
    'schema:name': string;
    'schema:url': {
      '@type': 'schema:URL';
      '@value': string;
    };
  };
  'http://regen.network/projectSize': {
    'qudt:unit': {
      '@type': 'qudt:Unit';
      '@value': 'unit:HA';
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
};
