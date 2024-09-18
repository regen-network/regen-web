import { msg } from '@lingui/macro';

import { HeadCell } from 'web-components/src/components/table/DocumentationTable/DocumentationTable';

import { TranslatorType } from 'lib/i18n/i18n.types';

export const getDocumentationHeadCells = (_: TranslatorType): HeadCell[] => [
  { id: 'name', numeric: false, label: _(msg`Name of document`) },
  { id: 'type', numeric: true, label: _(msg`Document type`) },
  { id: 'date', numeric: true, label: _(msg`Date of upload`) },
  { id: 'url', numeric: true, label: _(msg``) },
];

export const DOCUMENTATION_TABLE_ARIA_LABEL = msg`documentation table`;
export const DOCUMENTATION_TABLE_VIEW_LEDGER_TEXT = msg`view on ledger`;
export const DOCUMENTATION_TABLE_VIEW_DOCUMENT_TEXT = msg`view document`;
