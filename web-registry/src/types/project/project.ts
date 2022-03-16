// export interface EntityDisplayValues {
//   'http://regen.network/landOwner'?: DisplayValues;
//   'http://regen.network/landSteward'?: DisplayValues;
//   'http://regen.network/projectDeveloper'?: DisplayValues;
//   'http://regen.network/projectOriginator'?: DisplayValues;
// }

export type VcsProjectMetadata = {
  '@context': {
    schema: 'http://schema.org/';
    regen: 'http://regen.network/';
    qudt: 'http://qudt.org/schema/qudt';
    unit: 'http://qudt.org/2.1/vocab/unit';
    xsd: 'http://www.w3.org/2001/XMLSchema#';
  };
  '@type': 'regen:Project';
  'regen:vcsProjectId': {
    '@type': 'xsd:unsignedInt';
    '@value': number;
  };
  'regen:vcsProjectPage': {
    '@type': 'schema:URL';
    '@value': string;
  };
  'regen:projectProponent': {
    '@type': 'regen:Organization';
    'schema:name': string;
  };
  'regen:vcsProjectType': string;
  'regen:projectActivity': string;
  'regen:offsetGenerationMethod': string;
  'regen:vcsMethodology': {
    'schema:name': string;
    'schema:url': {
      '@type': 'schema:URL';
      '@value': string;
    };
  };
  'regen:projectSize': {
    'qudt:unit': {
      '@type': 'qudt:Unit';
      '@value': 'unit:HA';
    };
    'qudt:numericValue': {
      '@type': 'xsd:double';
      '@value': number;
    };
  };
  'regen:projectStartDate': {
    '@type': 'xsd:date';
    '@value': Date;
  };
  'regen:projectEndDate': {
    '@type': 'xsd:date';
    '@value': Date;
  };
}
