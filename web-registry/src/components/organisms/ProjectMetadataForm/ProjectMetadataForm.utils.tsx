import {
  invalidJSON,
  isValidJSON,
} from 'web-components/lib/components/inputs/validation';
import { object, string } from 'yup';

export const validationSchema = object({
  metadata: string().test(
    'is-json',
    invalidJSON,
    value => !!value && isValidJSON(value),
  ),
});
