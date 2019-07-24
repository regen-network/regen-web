import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

interface Props {
  readonly emptyRows: number;
}

const TablePageFiller = ({ emptyRows }: Props): JSX.Element => {
  if (emptyRows === 0) return <React.Fragment />;

  return (
    <TableRow style={{ height: 49 * emptyRows }}>
      <TableCell colSpan={6} />
    </TableRow>
  );
};

export default TablePageFiller;
