import { UrlList, UrlType } from './types';

export function getURLInitialValue(value?: UrlType): UrlType {
  return (
    value || {
      '@type': 'schema:URL',
      '@value': null,
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
