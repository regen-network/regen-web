export interface URL {
  '@type': 'http://schema.org/URL' | 'schema:URL';
  '@value': string;
}

export interface TypeValue {
  '@type': string;
  '@value': string;
}

export interface NameUrl {
  'schema:name': string;
  'schema:url': URL;
}
