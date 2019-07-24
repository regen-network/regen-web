import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';

interface Props {
  readonly isFirst: boolean;
  readonly labelId: string;
  readonly value: string | number;
}

function RegenTableCell({ isFirst, labelId, value }: Props): JSX.Element {
  return (
    <TableCell
      component={isFirst ? 'th' : 'td'}
      id={labelId}
      scope="row"
      padding={isFirst ? 'none' : 'default'}
    >
      {value}
    </TableCell>
  );
}

export default RegenTableCell;
