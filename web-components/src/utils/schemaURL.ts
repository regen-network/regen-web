// TODO: type UrlType and getURLInitialValue
// this has been temporarily duplicated due to moving the RDF types to the web-registry app

export interface UrlType {
  '@type': 'schema:URL';
  '@value'?: string | null;
}

export function getURLInitialValue(value?: UrlType): UrlType {
  return (
    value || {
      '@type': 'schema:URL',
      '@value': null,
    }
  );
}
