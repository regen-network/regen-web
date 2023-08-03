import { DOCUMENTATION_HEADERS } from './ProjectDetails.Documentation.types';

export const VIEW = 'View';
export const DOCUMENT = 'Document';

export const DOCUMENTATION_MAPPING: Record<
  DOCUMENTATION_HEADERS,
  { name: string; sortKey: string; sortEnabled?: boolean }
> = {
  [DOCUMENTATION_HEADERS.NAME]: {
    name: 'NAME OF DOCUMENT',
    sortKey: 'name',
  },
  [DOCUMENTATION_HEADERS.TYPE]: {
    name: 'DOCUMENT TYPE',
    sortKey: 'type',
    sortEnabled: true,
  },
  [DOCUMENTATION_HEADERS.UPLOAD_DATE]: {
    name: 'DATE OF UPLOAD',
    sortKey: 'date',
    sortEnabled: true,
  },
};
