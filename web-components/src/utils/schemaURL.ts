export interface urlType {
  '@type': 'schema:URL';
  '@value'?: string;
}

export function getURLInitialValue(value?: urlType): urlType {
  return (
    value || {
      '@type': 'schema:URL',
    }
  );
}
