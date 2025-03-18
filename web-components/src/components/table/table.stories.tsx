import { LabelDisplayedRowsArgs } from '@mui/material';
import Table from '@mui/material/Table';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';

import { TableActionButtons } from '../buttons/TableActionButtons';
import { ActionsTable } from './ActionsTable';
import { TablePagination } from './Table.TablePagination';

export const tablePagination = (): JSX.Element => (
  <Table>
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          count={6}
          rowsPerPage={5}
          page={0}
          onPageChange={(e, newPage) => {}}
          onChangeRowsPerPage={e => {}}
        />
      </TableRow>
    </TableFooter>
  </Table>
);

const isIgnoreOffset = false;
const rows = [
  ['Row 11', 'Row 12', 'Row 13'],
  ['Row 21', 'Row 22', 'Row 23'],
];

export const actionsTable = (): JSX.Element => (
  <ActionsTable
    tableLabel="actions table"
    actionButtonsText="Actions"
    isIgnoreOffset={isIgnoreOffset}
    labelDisplayedRows={({ from, to, count }: LabelDisplayedRowsArgs) => {
      const displayedTo = isIgnoreOffset ? from + rows.length - 1 : to;
      return count !== -1
        ? `${from}–${displayedTo} of ${count}`
        : `${from}–${displayedTo} of more than ${to}`;
    }}
    renderActionButtons={i => (
      <TableActionButtons
        buttons={[
          {
            label: `Do something with row ${i + 1}`,
            onClick: () => alert(`Action clicked for row ${i + 1}`),
          },
        ]}
      />
    )}
    headerRows={['Column 1', 'Column 2', 'Column 3']}
    rows={rows}
  />
);
