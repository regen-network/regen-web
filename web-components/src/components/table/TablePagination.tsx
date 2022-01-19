import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import { TablePagination as MuiTablePagination } from '@material-ui/core';

export interface TablePaginationProps {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = props => {
  return (
    <MuiTablePagination
      rowsPerPageOptions={props.rowsPerPageOptions}
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
    />
  );
};
