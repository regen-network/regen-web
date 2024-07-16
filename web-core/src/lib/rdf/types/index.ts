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

export interface UrlType {
  '@type': 'schema:URL';
  '@value'?: string | null;
}

export interface UrlList {
  '@list': Array<UrlType>;
}

export interface CompactedNameUrl {
  'schema:name': string;
  'schema:url': string;
}

export interface CompactedNameOptionalUrl {
  'schema:name': string;
  'schema:url'?: string;
}
