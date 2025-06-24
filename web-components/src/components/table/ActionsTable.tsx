import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  styled,
  SxProps,
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TablePaginationProps,
  TableRow,
  Toolbar,
} from '@mui/material';

import type { Theme } from '../../theme/muiTheme';
import {
  getTablePaginationPadding,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
} from './';
import { DEFAULT_TABLE_PAGINATION_PARAMS } from './Table.constants';
import { SortableHead } from './Table.SortableHead';
import { TablePagination } from './Table.TablePagination';
import { Order } from './Table.utils';

const BorderLeft = styled('div')(({ theme }) => ({
  // absolutely position border to get around MUI style quirks
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  borderLeft: `1px solid ${theme.palette.info.light}`,
  boxShadow: `-1px 0px 1px rgba(0,0,0,.05), -2px 0px 4px rgba(0,0,0,.15), -6px 0px 10px rgba(0,0,0,.5)`,
}));

/** `i` represents the index of the current row in the data set - ie it can be
 * used in the parent component to access that row's data. ex.
 * ```ts
 * const selectedRow = data[i];
 * ```
 *  */
export type RenderActionButtonsFunc = (i: number) => React.ReactNode;

export type RenderToolbarContentFunc = () => React.ReactNode;

export type TablePaginationParams = {
  page: number;
  rowsPerPage: number;
  offset: number;
  count?: number;
};

type SortCallbackType = (sortOrder: Order) => void;
export type SortCallbacksType = (SortCallbackType | undefined)[];

interface ActionsTableProps {
  tableLabel: string;
  headerRows: React.ReactNode[];
  rows: React.ReactNode[][];
  renderActionButtons?: RenderActionButtonsFunc;
  renderToolbarContentFunc?: RenderToolbarContentFunc;
  onTableChange?: Dispatch<SetStateAction<TablePaginationParams>>;
  initialPaginationParams?: TablePaginationParams;
  sortCallbacks?: SortCallbacksType;
  isIgnoreOffset?: boolean;
  actionButtonsText: string;
  labelDisplayedRows: TablePaginationProps['labelDisplayedRows'];
  dark?: boolean;
  sx?: {
    root?: SxProps<Theme>;
  };
}

const ActionsTable: React.FC<React.PropsWithChildren<ActionsTableProps>> = ({
  tableLabel,
  headerRows,
  rows,
  initialPaginationParams = DEFAULT_TABLE_PAGINATION_PARAMS,
  sortCallbacks = [],
  isIgnoreOffset = false,
  actionButtonsText,
  renderActionButtons,
  renderToolbarContentFunc,
  onTableChange,
  labelDisplayedRows,
  dark = true,
  sx,
}) => {
  const {
    offset: initialOffset,
    page: initialPage,
    rowsPerPage: initialRowsPerPage,
  } = initialPaginationParams;
  const [page, setPage] = useState(initialPage);
  const [offset, setOffset] = useState(initialOffset);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const maxCount = Math.max(initialPaginationParams?.count ?? 0, rows.length);
  const [sortOrder, setSortOrder] = useState<Order>('asc');
  const [sortBy, setSortBy] = useState<number | undefined>();

  const handleSort = (selectedSortBy: number): void => {
    const isAsc = sortBy === selectedSortBy && sortOrder === 'asc';
    const newSortOrder: Order = isAsc ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortBy(selectedSortBy);
    const sortCallback = sortCallbacks[selectedSortBy];
    sortCallback && sortCallback(newSortOrder);
  };

  const onChangeRowsPerPage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newRowsPerPage = parseInt(e.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      setOffset(0);
      onTableChange &&
        onTableChange({
          page,
          rowsPerPage: newRowsPerPage,
          offset: 0,
          count: initialPaginationParams.count,
        });
    },
    [onTableChange, page, initialPaginationParams],
  );

  const onPageChange = useCallback(
    (_: unknown, newPage: number) => {
      const offset = newPage * rowsPerPage;
      setPage(newPage);
      if (!isIgnoreOffset) {
        setOffset(offset);
      }
      onTableChange &&
        onTableChange({
          page: newPage,
          rowsPerPage,
          offset,
          count: initialPaginationParams.count,
        });
    },
    [onTableChange, rowsPerPage, isIgnoreOffset, initialPaginationParams],
  );

  const displayRows = useMemo<React.ReactNode[][]>(() => {
    // if we've fetched rowsPerPage on the server, just show them
    if (rows.length <= rowsPerPage) {
      return rows;
    }
    // otherwise slice client-side
    return rows.slice(offset, offset + rowsPerPage);
  }, [rows, offset, rowsPerPage]);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'info.light',
        overflow: 'hidden',
        ...sx?.root,
      }}
    >
      <StyledTableContainer>
        <Box
          sx={{
            width: '100%',
            overflow: 'auto',
            paddingBottom:
              getTablePaginationPadding(
                rows.length,
                rowsPerPage,
                displayRows.length,
              ) * 25,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {renderToolbarContentFunc && (
            <Toolbar className="sticky top-0 left-0 w-full p-0">
              {renderToolbarContentFunc()}
            </Toolbar>
          )}
          <Table aria-label={tableLabel}>
            <TableHead>
              <TableRow>
                {headerRows.map((headerRow, i) =>
                  sortCallbacks[i] && rows.length > 1 ? (
                    <SortableHead
                      key={i}
                      fieldIndex={i}
                      handleSort={handleSort}
                      isActive={i === sortBy}
                      sortOrder={sortOrder}
                    >
                      {headerRow}
                    </SortableHead>
                  ) : (
                    <StyledTableCell key={i}>{headerRow}</StyledTableCell>
                  ),
                )}
                {!!renderActionButtons && (
                  <StyledTableCell
                    sx={{
                      textAlign: 'left',
                      background: 'primary.main',
                      position: 'sticky',
                      right: 0,
                      width: { sm: 29 },
                    }}
                  >
                    <Box>
                      <BorderLeft />
                      {actionButtonsText}
                    </Box>
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayRows.map((row, i) => (
                <StyledTableRow key={i}>
                  {row.map((elem, j) => (
                    <StyledTableCell key={j}>{elem}</StyledTableCell>
                  ))}
                  {!!renderActionButtons && (
                    <StyledTableCell
                      sx={{
                        background: 'inherit',
                        position: 'sticky',
                        right: 0,
                        width: { sm: 29 },
                      }}
                    >
                      <BorderLeft />
                      {renderActionButtons(offset + i)}
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {maxCount > 5 && (
          <Table>
            <TableFooter sx={{ position: 'sticky', left: 0 }}>
              <TableRow>
                <TablePagination
                  dark={dark}
                  rowsPerPageOptions={[5, 10]}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={onChangeRowsPerPage}
                  count={initialPaginationParams?.count ?? rows.length}
                  page={page}
                  labelDisplayedRows={labelDisplayedRows}
                  onPageChange={onPageChange}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </StyledTableContainer>
    </Box>
  );
};

export { ActionsTable };
