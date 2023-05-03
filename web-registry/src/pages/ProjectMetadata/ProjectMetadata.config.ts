import { UNANCHORED_PROJECT_KEYS } from 'lib/rdf/rdf.constants';

export const OMITTED_METADATA_KEYS = [
  '@id',
  '@type',
  'schema:name',
  'regen:projectSize',
  'schema:location',
  'regen:projectDeveloper',
  ...UNANCHORED_PROJECT_KEYS,
];
