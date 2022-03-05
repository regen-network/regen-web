import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Box,
  TableFooter,
  styled,
} from '@mui/material';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  getTablePaginationPadding,
  // StyledTableSortLabel,
} from './';
// import {
//   getComparator,
//   Order,
//   stableSort,
// } from 'web-components/lib/components/table/sort';
import { TablePagination } from './TablePagination';

const BorderLeft = styled('div')(({ theme }) => ({
  // absolutely position border to get around MUI style quirks
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  borderLeft: `1px solid ${theme.palette.info.light}`,
}));

/** `i` represents the index of the current row in the data set - ie it can be
 * used in the parent component to access that row's data. ex.
 * ```ts
 * const selectedRow = data[i];
 * ```
 *  */
export type RenderActionButtonsFunc = (i: number) => React.ReactElement;

const ActionsTable: React.FC<{
  tableLabel: string;
  headerRows: React.ReactNode[];
  rows: React.ReactNode[][];
  renderActionButtons?: RenderActionButtonsFunc;
}> = ({ tableLabel, headerRows, rows, renderActionButtons }) => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayRows, setDisplayRows] = useState<React.ReactNode[][]>(rows);
  // const [order, setOrder] = useState<Order>('desc');
  // const [orderBy, setOrderBy] = useState<keyof TableCredits>('start_date');

  useEffect(() => {
    setDisplayRows(rows.slice(offset, offset + rowsPerPage));
  }, [offset, rowsPerPage, rows]);

  // const handleSort = (sortBy: keyof TableCredits): void => {
  //   const isAsc = orderBy === sortBy && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(sortBy);
  // };

  // TODO this will pass the correct fields and can replace <StyledTableCell>
  // header components, however only works on elements within the current
  // pagination page. See:
  // https://app.zenhub.com/workspaces/regen-registry-5f8998bec8958d000f4609e2/issues/regen-network/regen-registry/811
  // const SortableHead: React.FC<{ field: string }> = ({ field, children }) => {
  //   const isCurrentSort = orderBy === field;
  //   return (
  //     <StyledTableCell sortDirection={isCurrentSort ? order : false}>
  //       <StyledTableSortLabel
  //         active={isCurrentSort}
  //         direction={isCurrentSort ? order : 'asc'}
  //         onClick={() => handleSort(field as keyof TableCredits)}
  //       >
  //         {children}
  //       </StyledTableSortLabel>
  //     </StyledTableCell>
  //   );
  // };

  console.log('rows :>> ', rows);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'info.light',
        borderRadius: '8px',
        overflow: 'hidden',
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
          }}
        >
          <Table aria-label={tableLabel}>
            <TableHead>
              <TableRow>
                {headerRows.map((headerRow, i) => (
                  <StyledTableCell key={i}>{headerRow}</StyledTableCell>
                ))}
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
                      Actions
                    </Box>
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {stableSort(
                credits as any, // TODO type coercion shouldn't be necessary here
                getComparator(order, orderBy),
              ).map((row, i) => ( */}
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
                      {renderActionButtons(i)}
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {rows.length > 5 && (
          <Table>
            <TableFooter sx={{ position: 'sticky', left: 0 }}>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={e => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setOffset(0);
                  }}
                  count={rows.length}
                  page={page}
                  onPageChange={(_, newPage) => {
                    setPage(newPage);
                    setOffset(newPage * rowsPerPage);
                  }}
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
