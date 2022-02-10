import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dictionary } from 'lodash';

import { Theme } from 'web-components/lib/theme/muiTheme';
import {
  StyledTableContainer,
  StyledTableCell,
  StyledTableRow,
  StyledTableSortLabel,
  formatNumber,
} from 'web-components/lib/components/table';
import { useTablePagination } from 'web-components/lib/components/table/useTablePagination';
import {
  getComparator,
  stableSort,
  Order,
} from 'web-components/lib/components/table/sort';
import { Label } from 'web-components/lib/components/label';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import { truncate } from '../../lib/wallet';
import { ledgerRestUri } from '../../ledger';
import { getHashUrl } from '../../lib/block-explorer';
import { getEcocreditTxs } from '../../lib/ecocredit';

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

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(12),
  },
}));

const ROWS_PER_PAGE_OPTIONS = { options: [5, 10, 20, 50], default: 10 };

const READABLE_NAMES: Dictionary<string> = {
  '/regen.ecocredit.v1alpha1.MsgSend': 'send',
  '/regen.ecocredit.v1alpha1.MsgRetire': 'retire',
  '/regen.ecocredit.v1alpha1.MsgCreateClass': 'create credit class',
  '/regen.ecocredit.v1alpha1.MsgCancel': 'cancel',
  '/regen.ecocredit.v1alpha1.MsgCreateBatch': 'create batch',
};

const CreditActivityTable: React.FC = () => {
  const styles = useStyles();
  const [txs, setTxs] = useState<TxRowData[]>([]);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('date');
  const { TablePagination, setCountTotal, paginationProps } =
    useTablePagination(ROWS_PER_PAGE_OPTIONS);
  const { count, page, rowsPerPage } = paginationProps;

  const getReadableMessages = useCallback((txResponse: any): string[] => {
    return txResponse?.tx?.body?.messages?.map((message: any) => {
      return getReadableName(message['@type']);
    });
  }, []);

  const fetchData = useCallback(
    async (setCountTotal: (count: number) => void): Promise<void> => {
      const tx_responses = await getEcocreditTxs();

      const txRows: TxRowData[] = tx_responses.map((tx_response: any) => {
        return {
          date: tx_response.timestamp,
          txhash: tx_response.txhash,
          messages: getReadableMessages(tx_response).join(', '),
          height: parseFloat(tx_response.height),
          txUrl: getHashUrl(tx_response.txhash),
        } as TxRowData;
      });

      setTxs(txRows);
      const countTotal = tx_responses.length;
      if (countTotal) {
        setCountTotal(countTotal);
      }
    },
    [getReadableMessages],
  );

  const getReadableName = (eventType: string): string => {
    return READABLE_NAMES[eventType] || eventType;
  };

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
    if (!ledgerRestUri) return;
    fetchData(setCountTotal);
  }, [fetchData, getReadableMessages, setCountTotal]);

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
            {ledgerRestUri && txs.length > 0 ? (
              stableSort(txs as any, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tx: any) => {
                  return (
                    <StyledTableRow
                      sx={{ whiteSpace: 'nowrap' }}
                      tabIndex={-1}
                      key={tx.txhash}
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
                        <Label className={styles.label}>{tx.messages}</Label>
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(tx.height)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <OutlinedButton href={tx.txUrl} target="_blank">
                          view transaction
                        </OutlinedButton>
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
