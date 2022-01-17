import * as React from 'react';
import {
  DocumentationTable,
  DocumentRowData,
} from 'web-components/lib/components/table/DocumentationTable';

export default {
  title: 'Table',
  component: DocumentationTable,
};

const data: DocumentRowData[] = [
  {
    name: 'Monitoring',
    type: 'Monitoring',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
  {
    name: 'Issuance Documents',
    type: 'Issuance',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
  {
    name: 'Project Review',
    type: 'Project Review',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
];

export const documentationTable = (): JSX.Element => (
  <DocumentationTable rows={data} />
);
