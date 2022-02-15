import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Box,
  TableFooter,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  getTablePaginationPadding,
  // StyledTableSortLabel,
} from 'web-components/lib/components/table';
// import {
//   getComparator,
//   Order,
//   stableSort,
// } from 'web-components/lib/components/table/sort';
import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import type { BatchRowData, EcocreditAccountBalance } from '../../types/ledger';
import { TablePagination } from 'web-components/lib/components/table/TablePagination';

const useStyles = makeStyles(theme => ({
  borderLeft: {
    // absolutely position border to get around MUI style quirks
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderLeft: `1px solid ${theme.palette.info.light}`,
  },
  greyText: {
    color: theme.palette.info.main,
  },
}));

export interface TableCredits extends BatchRowData, EcocreditAccountBalance {}

export const EcocreditsTable: React.FC<{
  credits: TableCredits[];
  renderActionButtons: (row: TableCredits) => React.ReactElement;
}> = ({ credits, renderActionButtons }) => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayCredits, setDisplayCredits] = useState<TableCredits[]>(credits);
  // const [order, setOrder] = useState<Order>('desc');
  // const [orderBy, setOrderBy] = useState<keyof TableCredits>('start_date');

  useEffect(() => {
    setDisplayCredits(credits.slice(offset, offset + rowsPerPage));
  }, [offset, rowsPerPage, credits]);

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

  const styles = useStyles();
  return (
    <StyledTableContainer>
      <Box
        sx={{
          width: '100%',
          overflow: 'auto',
          paddingBottom:
            getTablePaginationPadding(
              credits.length,
              rowsPerPage,
              displayCredits.length,
            ) * 25,
        }}
      >
        <Table aria-label="eco credits table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Box
                  sx={{
                    minWidth: {
                      xs: 'auto',
                      sm: '11rem',
                      lg: '13rem',
                    },
                  }}
                >
                  Batch Denom
                </Box>
              </StyledTableCell>
              <StyledTableCell>Issuer</StyledTableCell>
              <StyledTableCell>Credit Class</StyledTableCell>
              <StyledTableCell>Amount Tradable</StyledTableCell>
              <StyledTableCell>Amount Retired</StyledTableCell>
              <StyledTableCell>Batch Start Date</StyledTableCell>
              <StyledTableCell>Batch End Date</StyledTableCell>
              <StyledTableCell>Project Location</StyledTableCell>
              <StyledTableCell
                sx={{
                  textAlign: 'left',
                  background: 'primary.main',
                  position: 'sticky',
                  right: 0,
                }}
              >
                <Box>
                  <div className={styles.borderLeft} />
                  Actions
                </Box>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {stableSort(
                    credits as any, // TODO type coercion shouldn't be necessary here
                    getComparator(order, orderBy),
                  ).map((row, i) => ( */}
            {displayCredits.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell>{row.batch_denom}</StyledTableCell>
                <StyledTableCell>
                  <a
                    href={getAccountUrl(row.issuer as string)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {truncate(row.issuer as string)}
                  </a>
                </StyledTableCell>
                <StyledTableCell>{row.class_id}</StyledTableCell>
                <StyledTableCell>
                  {formatNumber(row.tradable_amount)}
                </StyledTableCell>
                <StyledTableCell>
                  {formatNumber(row.retired_amount)}
                </StyledTableCell>
                <StyledTableCell>
                  <span className={styles.greyText}>
                    {formatDate(row.start_date)}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className={styles.greyText}>
                    {formatDate(row.end_date)}
                  </span>
                </StyledTableCell>
                <StyledTableCell>{row.project_location}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    background: 'inherit',
                    position: 'sticky',
                    right: 0,
                  }}
                >
                  <div className={styles.borderLeft} />
                  {renderActionButtons(row)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
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
              count={credits.length}
              page={page}
              onPageChange={(_, newPage) => {
                setPage(newPage);
                setOffset(newPage * rowsPerPage);
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
};

const formatDate = (date: string | number | Date): string =>
  dayjs(date).format('MMMM D, YYYY');

const formatNumber = (num: string | number | Date): string => {
  return +num > 0 ? Math.floor(+num).toLocaleString() : '-';
};
