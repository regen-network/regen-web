/* eslint-disable lingui/no-unlocalized-strings */
import { HeadCell } from './DocumentationTable';

export const DOCUMENTATION_HEAD_CELLS: HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name of document' },
  { id: 'type', numeric: true, label: 'Document type' },
  { id: 'date', numeric: true, label: 'Date of upload' },
  { id: 'url', numeric: true, label: '' },
];
