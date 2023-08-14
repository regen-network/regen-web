import { CompactedNameOptionalUrl, CompactedNameUrl } from 'lib/rdf/types';

type OrArray<T> = T | T[];

export type BaseValue =
  | CompactedNameOptionalUrl
  | CompactedNameUrl
  | string
  | number;

export type Value = OrArray<BaseValue>;

export function isCompactedNameUrlOrOptionalUrl(
  baseValue: BaseValue,
): baseValue is CompactedNameUrl | CompactedNameOptionalUrl {
  return typeof baseValue === 'object' && !!baseValue['schema:name'];
}
