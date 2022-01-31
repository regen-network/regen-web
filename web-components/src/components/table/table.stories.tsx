import * as React from 'react';
import { DocumentationTable, DocumentRowData } from 'web-components/lib/components/table/DocumentationTable';
import { TablePagination } from 'web-components/lib/components/table/TablePagination';
import { Table, TableFooter, TableRow } from '@material-ui/core';

export default {
  title: 'Components|Table',
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

export const documentationTable = (): JSX.Element => <DocumentationTable rows={data} />;

export const tablePagination = (): JSX.Element => (
  <Table>
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          count={6}
          rowsPerPage={5}
          page={0}
          onChangePage={(e, newPage) => {}}
          onChangeRowsPerPage={e => {}}
        />
      </TableRow>
    </TableFooter>
  </Table>
);
