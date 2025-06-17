import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledTableSortLabel,
} from 'web-components/src/components/table';
import { useTablePagination } from 'web-components/src/components/table/hooks/useTablePagination';
import {
  getComparator,
  Order,
  stableSort,
} from 'web-components/src/components/table/Table.utils';
import { Label } from 'web-components/src/components/typography';
import { formatNumber } from 'web-components/src/utils/format';
import { truncate } from 'web-components/src/utils/truncate';

import { getHashUrl } from 'lib/block-explorer';
import { ledgerRESTUri } from 'lib/ledger';
import { getAllEcocreditTxesQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllEcocreditTxes/getAllEcocreditTxes';

import { normalizeAllTxes } from './CreditActivityTable.normalizers';

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
  label: MessageDescriptor;
  numeric: boolean;
  wrap?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'date', numeric: false, label: msg`date` },
  { id: 'txhash', numeric: false, label: msg`hash` },
  { id: 'messages', numeric: false, label: msg`messages` },
  { id: 'height', numeric: true, label: msg`block height` },
  { id: 'txUrl', numeric: false, label: msg`` },
];

const ROWS_PER_PAGE_OPTIONS = { options: [5, 10, 20, 50], default: 10 };

const CreditActivityTable: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('date');
  const { TablePagination, setCountTotal, paginationProps } =
    useTablePagination(ROWS_PER_PAGE_OPTIONS);
  const { count, page, rowsPerPage } = paginationProps;

  const handleClickNavigate = (txhash: string): void => {
    const url = getHashUrl(txhash);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const { data: allEcocreditTxesData, isLoading } = useQuery(
    getAllEcocreditTxesQuery({
      client: graphqlClient,
      first: rowsPerPage,
      offset: rowsPerPage * page,
      enabled: !!graphqlClient,
    }),
  );

  const txs = normalizeAllTxes({
    allEcocreditTxesData: allEcocreditTxesData?.data,
  });

  useEffect(() => {
    const txesCount = allEcocreditTxesData?.data.allEcocreditTxes?.totalCount;

    if (txesCount) {
      setCountTotal(txesCount);
    }
  }, [allEcocreditTxesData, setCountTotal]);

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
        <Table aria-label={_(msg`credit activity table`)} stickyHeader>
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
                    {_(headCell.label)}
                  </StyledTableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'primary.main' }}>
            {ledgerRESTUri && !isLoading ? (
              stableSort(txs as any, getComparator(order, orderBy)).map(
                (tx: any, index) => {
                  return (
                    <StyledTableRow
                      sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
                      tabIndex={-1}
                      key={index}
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
                        {formatNumber({ num: tx.height })}
                      </StyledTableCell>
                      <StyledTableCell>
                        <OutlinedButton>
                          <Trans>view transaction</Trans>
                        </OutlinedButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                },
              )
            ) : (
              <StyledTableRow
                sx={{
                  width: '100%',
                  bgcolor: 'transparent',
                }}
              >
                <StyledTableCell
                  sx={{
                    width: '100%',
                  }}
                >
                  <Trans>Loading...</Trans>
                </StyledTableCell>
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
