export interface UrlType {
  '@type': 'schema:URL';
  '@value'?: string;
}

export interface UrlList {
  '@list': Array<UrlType>;
}

export function getURLInitialValue(value?: UrlType): UrlType {
  return (
    value || {
      '@type': 'schema:URL',
    }
  );
}

export function getURLListInitialValue(
  arrSize: number,
  value?: UrlList,
): UrlList {
  return (
    value || {
      '@list': Array(arrSize).fill(getURLInitialValue(undefined)),
    }
  );
}
