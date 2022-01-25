import * as React from 'react';
import { DocumentationTable, DocumentRowData } from 'web-components/lib/components/table/DocumentationTable';
import { useTablePagination } from 'web-components/lib/components/table/useTablePagination';
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

export const tablePagination = (): JSX.Element => {
  const { TablePagination, setCountTotal, paginationProps } = useTablePagination([5, 10]);

  React.useEffect(() => {
    setCountTotal(6);
  }, [setCountTotal]);

  return (
    <Table>
      <TableFooter>
        <TableRow>
          <TablePagination {...paginationProps} />
        </TableRow>
      </TableFooter>
    </Table>
  );
};
