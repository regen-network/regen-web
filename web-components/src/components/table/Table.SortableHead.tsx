import { ReactNode } from 'react';

import { StyledTableCell, StyledTableSortLabel } from '.';
import { Order } from './Table.utils';

type Props = {
  fieldIndex: number;
  sortOrder: Order;
  isActive: boolean;
  children: ReactNode;
  handleSort: (sortOrder: number) => void;
};

export const SortableHead: React.FC<Props> = ({
  fieldIndex,
  sortOrder,
  isActive,
  children,
  handleSort,
}) => {
  return (
    <StyledTableCell sortDirection={isActive ? sortOrder : false}>
      <StyledTableSortLabel
        active={isActive}
        direction={isActive ? sortOrder : 'asc'}
        onClick={() => handleSort(fieldIndex)}
      >
        {children}
      </StyledTableSortLabel>
    </StyledTableCell>
  );
};
