import { DOCUMENTATION_HEADERS } from './ProjectDetails.Documentation.types';

export const VIEW_DOCUMENT = 'View Document';

export const DOCUMENTATION_MAPPING: Record<
  DOCUMENTATION_HEADERS,
  { name: string; sortKey: string; sortEnabled?: boolean }
> = {
  [DOCUMENTATION_HEADERS.NAME]: {
    name: 'NAME OF DOCUMENT',
    sortKey: 'name',
  },
  [DOCUMENTATION_HEADERS.TYPE]: {
    name: 'NAME OF DOCUMENT',
    sortKey: 'type',
  },
  [DOCUMENTATION_HEADERS.UPLOAD_DATE]: {
    name: 'NAME OF DOCUMENT',
    sortKey: 'type',
    sortEnabled: true,
  },
};
