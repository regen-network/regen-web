import * as React from 'react';
import Table, { Data } from 'web-components/lib/components/table';

export default {
  title: 'Components|Table',
  component: Table,
};

const data: Data[] = [
  {
    name: 'Monitoring',
    type: 'Monitoring',
    date: '2020-03-15T00:00:00.000Z',
    ledgerUrl: 'test',
    url: 'test',
  },
  {
    name: 'Issuance Documents',
    type: 'Issuance',
    date: '2020-03-15T00:00:00.000Z',
    ledgerUrl: 'test',
    url: 'test',
  },
  {
    name: 'Project Review',
    type: 'Project Review',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
];

export const mrvTable = (): JSX.Element => <Table rows={data} />;
