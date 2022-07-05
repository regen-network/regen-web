import { MediaErrors, MediaValues } from './MediaForm';
import type { Maybe } from '../../../generated/graphql';
import type { MediaErrorsSimple, MediaValuesSimple } from './MediaFormSimple';

export function isSimpleMediaFormErrors(
  _errors: MediaErrors,
  ccId?: Maybe<string> | string,
): _errors is MediaErrorsSimple {
  return !!ccId;
}

export function isSimpleMediaFormValues(
  _values: MediaValues,
  ccId?: Maybe<string> | string,
): _values is MediaValuesSimple {
  return !!ccId;
}
