import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
  StyledTableContainer,
  StyledTableCell,
  StyledTableRow,
  StyledTableSortLabel,
} from 'web-components/lib/components/table';
import { useTablePagination } from 'web-components/lib/components/table/useTablePagination';
import {
  getComparator,
  stableSort,
  Order,
} from 'web-components/lib/components/table/sort';
import { Label } from 'web-components/lib/components/typography';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { ledgerRESTUri } from '../../lib/ledger';
import { getHashUrl } from '../../lib/block-explorer';
import { getEcocreditTxs, getReadableMessages } from '../../lib/ecocredit/api';

dayjs.extend(relativeTime);

interface TxRowData {
  date: string | Date;
  txhash: string;
  messages: string;
  height: number;
  txUrl: string;
}

interface HeadCell {
  id: keyof TxRowData;
  label: string;
  numeric: boolean;
  wrap?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'date', numeric: false, label: 'date' },
  { id: 'txhash', numeric: false, label: 'hash' },
  { id: 'messages', numeric: false, label: 'messages' },
  { id: 'height', numeric: true, label: 'block height' },
  { id: 'txUrl', numeric: false, label: '' },
];

const ROWS_PER_PAGE_OPTIONS = { options: [5, 10, 20, 50], default: 10 };

const CreditActivityTable: React.FC = () => {
  const [txs, setTxs] = useState<TxRowData[]>([]);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('date');
  const { TablePagination, setCountTotal, paginationProps } =
    useTablePagination(ROWS_PER_PAGE_OPTIONS);
  const { count, page, rowsPerPage } = paginationProps;

  const handleClickNavigate = (txhash: string): void => {
    const url = getHashUrl(txhash);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fetchData = useCallback(
    async (setCountTotal: (count: number) => void): Promise<void> => {
      try {
        const txResponses = await getEcocreditTxs();
        const txRows: TxRowData[] = txResponses.map(txResponse => {
          return {
            date: txResponse.timestamp,
            txhash: txResponse.txhash,
            messages: getReadableMessages(txResponse),
            height: txResponse.height.getLowBits(),
            txUrl: getHashUrl(txResponse.txhash),
          } as TxRowData;
        });

        setTxs(txRows);
        const countTotal = txResponses.length;
        if (countTotal) {
          setCountTotal(countTotal);
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
      }
    },
    [],
  );

  const createSortHandler =
    (property: keyof TxRowData) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TxRowData,
  ): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getPaddingBottom = (
    countTotal: number,
    rowsPerPage: number,
    countPage: number,
  ): number => {
    return countTotal <= rowsPerPage ? 0 : rowsPerPage - countPage;
  };

  useEffect(() => {
    if (!ledgerRESTUri) return;
    fetchData(setCountTotal);
  }, [fetchData, setCountTotal]);

  return (
    <StyledTableContainer
      sx={{
        border: theme => `1px solid ${theme.palette.info.light}`,
        borderRadius: '8px',
        overflow: 'auto',
        mb: { xs: 18.5, sm: 30 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          overflow: 'auto',
          pb: theme =>
            `${theme.spacing(
              getPaddingBottom(count, rowsPerPage, txs.length) * 20,
            )}`,
        }}
      >
        <Table aria-label="credit activity table" stickyHeader>
          <TableHead>
            <TableRow>
              {headCells.map(headCell => (
                <StyledTableCell
                  key={headCell.id}
                  align="left"
                  padding="normal"
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <StyledTableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                  </StyledTableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'primary.main' }}>
            {ledgerRESTUri && txs.length > 0 ? (
              stableSort(txs as any, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tx: any) => {
                  return (
                    <StyledTableRow
                      sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
                      tabIndex={-1}
                      key={tx.txhash}
                      onClick={() => handleClickNavigate(tx.txhash)}
                    >
                      <StyledTableCell sx={{ color: 'info.main' }}>
                        {dayjs(tx.date).fromNow()}
                      </StyledTableCell>
                      <StyledTableCell>
                        <a
                          href={getHashUrl(tx.txhash)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {truncate(tx.txhash)}
                        </a>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Label size="xs" color="info.dark">
                          {tx.messages}
                        </Label>
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(tx.height)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <OutlinedButton>view transaction</OutlinedButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
            ) : (
              <StyledTableRow
                sx={{
                  width: '100%',
                  bgcolor: 'transparent',
                }}
              >
                <StyledTableCell>Loading...</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination {...paginationProps} />
          </TableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
};

export { CreditActivityTable };
