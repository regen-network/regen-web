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
    date: 'March 15, 2020',
    url: 'test',
  },
  {
    name: 'Issuance Documents',
    type: 'Issuance',
    date: 'February 10, 2020',
    url: 'test',
  },
  {
    name: 'Project Review',
    type: 'Project Review',
    date: 'November 1, 2019',
    url: 'test',
  },
];

export const mrvTable = (): JSX.Element => <Table rows={data} />;
