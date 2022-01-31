import { useState, useEffect } from 'react';
import { TablePagination, TablePaginationProps } from './TablePagination';

/**
 * Basic offset based pagination (when the dataset doesn't change very often).
 *
 * Another alternative option would be based on "key", with better performance
 * but not always available (more indicated when the dataset changes a lot).
 *
 * This hook handles the state of the paging component.
 * The hook optionally receives a list of rows-per-page options as a parameter.
 * Returns the pagination component as is, the properties that should be passed
 * to the pagination component where it is used, the pagination parameters that
 * correspond when the page is changed, and a setter method to set the total
 * data in the source.
 */
export function useTablePagination(rowsPerPageOptions: number[] = [5]): UseTablePaginationResult {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);
  const [offset, setOffset] = useState<number>(0);
  const [countTotal, setCountTotal] = useState<number>(0);
  const [paginationParams, setPaginationParams] = useState<URLSearchParams | null>(null);

  const prepareParams = (rowsPerPage: number, offset: number): void => {
    const params = new URLSearchParams();
    if (offset < rowsPerPage) {
      params.append('pagination.limit', `${rowsPerPage}`);
      params.append('pagination.count_total', `${true}`);
    } else {
      params.append('pagination.limit', `${rowsPerPage}`);
      params.append('pagination.offset', `${offset}`);
    }
    setPaginationParams(params);
  };

  useEffect(() => {
    prepareParams(rowsPerPage, offset);
  }, [rowsPerPage, offset]);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setOffset(newPage * rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setOffset(0);
    setPage(0);
  };

  const paginationProps = {
    rowsPerPageOptions,
    count: countTotal,
    rowsPerPage: rowsPerPage,
    page: page,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
  };

  return {
    setCountTotal,
    paginationParams,
    paginationProps,
    TablePagination,
  };
}

export interface UseTablePaginationResult {
  setCountTotal: (count: number) => void;
  paginationParams: URLSearchParams | null;
  /** The props you should spread onto the Pagination component */
  paginationProps: TablePaginationProps;
  /** The hook returns the UI Table Pagination component as a nicety so you don't have to mess with importing it */
  TablePagination?: any;
}
