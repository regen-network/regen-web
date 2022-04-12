export interface URL {
  '@type': string;
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
