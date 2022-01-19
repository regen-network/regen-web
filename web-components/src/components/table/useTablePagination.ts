import { useState } from 'react';
import { TablePagination, TablePaginationProps } from './TablePagination';

export function useTablePagination(count: number): UseTablePaginationResult {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setPage(0);
  };

  let paginationProps = {
    rowsPerPageOptions: [5, 10],
    count,
    rowsPerPage: rowsPerPage,
    page: page,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
  };

  return {
    page,
    rowsPerPage,
    paginationProps,
    TablePagination,
  };
}

export interface UseTablePaginationResult {
  page: number;
  rowsPerPage: number;
  /** The props you should spread onto the Pagination component */
  paginationProps: TablePaginationProps;
  /** The hook returns the UI Table Pagination component as a nicety so you don't have to mess with importing it */
  TablePagination?: any;
}
