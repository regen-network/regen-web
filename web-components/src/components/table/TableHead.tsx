import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Order } from './sorting';

export interface HeadRow<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps<T> {
  headRows: ReadonlyArray<HeadRow<T>>;
  onRequestSort: (event: React.MouseEvent<unknown>, id: keyof T) => void;
  order: Order;
  orderBy: keyof T;
}

function RegenTableHead<T>(props: EnhancedTableProps<T>): JSX.Element {
  const { headRows, order, orderBy, onRequestSort } = props;

  function createSortHandler(property: keyof T): (event: React.MouseEvent<unknown>) => void {
    return (event: React.MouseEvent<unknown>) => onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={`${row.id}`}
            align="left"
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id)}>
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default RegenTableHead;
