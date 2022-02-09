import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { format } from 'date-fns';
import cx from 'clsx';

import {
  StyledTableContainer,
  StyledTableCell,
  StyledTableRow,
  // StyledTableSortLabel,
} from 'web-components/lib/components/table';
import { useTablePagination } from 'web-components/lib/components/table/useTablePagination';
import {
  getComparator,
  stableSort,
  Order,
} from 'web-components/lib/components/table/sort';
import Section from 'web-components/lib/components/section';
import { truncateWalletAddress } from '../../lib/wallet';
import { ledgerRestUri } from '../../ledger';
import { getBatchSupply, getBatches } from '../../lib/ecocredit';
import { getAccountUrl } from '../../lib/block-explorer';
import { BatchRowData } from '../../types/ledger';
import { TableSortLabel } from '@mui/material';

interface HeadCell {
  id: keyof BatchRowData;
  label: string;
  numeric: boolean;
  wrap?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'issuer', numeric: false, label: 'issuer' },
  { id: 'batch_denom', numeric: false, label: 'batch denom' },
  { id: 'class_id', numeric: false, label: 'credit class' },
  {
    id: 'tradable_supply',
    numeric: true,
    label: 'total amount tradable',
    wrap: true,
  },
  {
    id: 'retired_supply',
    numeric: true,
    label: 'total amount retired',
    wrap: true,
  },
  {
    id: 'amount_cancelled',
    numeric: true,
    label: 'total amount cancelled',
    wrap: true,
  },
  { id: 'start_date', numeric: true, label: 'start date' },
  { id: 'end_date', numeric: true, label: 'end date' },
  { id: 'project_location', numeric: false, label: 'project location' },
];

const useStyles = makeStyles(theme => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(17.5),
    },
  },
  title: {
    paddingBottom: theme.spacing(7.5),
  },
  tableBorder: {
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: 8,
  },
  wrap: {
    whiteSpace: 'normal',
    '& span': {
      width: 138,
    },
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  grey: {
    color: theme.palette.info.main,
  },
  tableBody: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ROWS_PER_PAGE_OPTIONS = [5, 10];

const CreditBatches: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [batches, setBatches] = useState<any[]>([]);
  const [order /* , setOrder */] = useState<Order>('desc');
  const [orderBy /* , setOrderBy */] = useState<string>('start_date');
  const { TablePagination, setCountTotal, paginationParams, paginationProps } =
    useTablePagination(ROWS_PER_PAGE_OPTIONS);

  const fetchData = (
    paginationParams: URLSearchParams,
    setCountTotal: (count: number) => void,
  ): void => {
    const addSupplyDataToBatch = (
      batches: BatchRowData[],
    ): Promise<BatchRowData[]> => {
      return Promise.all(
        batches.map(batch => {
          return getBatchSupply(batch.batch_denom)
            .then(({ data }) => {
              if (data) {
                batch.tradable_supply = data.tradable_supply;
                batch.retired_supply = data.retired_supply;
              }
              return batch;
            })
            .catch(err => {
              return batch;
            });
        }),
      );
    };

    getBatches(paginationParams).then(res => {
      const creditBatches = res?.data?.batches;
      addSupplyDataToBatch(creditBatches).then(sortableBatches => {
        setBatches(sortableBatches);
        const _countTotal = parseInt(res?.data?.pagination.total);
        if (_countTotal) {
          setCountTotal(_countTotal);
        }
      });
    });
  };

  useEffect(() => {
    if (!ledgerRestUri || !paginationParams) return;
    fetchData(paginationParams, setCountTotal);
  }, [paginationParams, setCountTotal]);

  // const createSortHandler =
  //   (property: keyof BatchRowData) => (event: React.MouseEvent<unknown>) => {
  //     handleRequestSort(event, property);
  //   };

  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof BatchRowData,
  // ): void => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const formatNumber = (num: number | string): string => {
    if (typeof num === 'string') num = parseFloat(num);
    return num > 0 ? Math.floor(num).toLocaleString() : '-';
  };

  const getPaddingBottom = (
    countTotal: number,
    rowsPerPage: number,
    countPage: number,
  ): number => {
    return countTotal <= rowsPerPage ? 0 : rowsPerPage - countPage;
  };

  return ledgerRestUri && batches.length > 0 ? (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title="Credit Batches"
      titleVariant="h2"
    >
      <StyledTableContainer className={styles.tableBorder}>
        <div
          style={{
            width: '100%',
            overflow: 'auto',
            paddingBottom: `${theme.spacing(
              getPaddingBottom(
                paginationProps.count,
                paginationProps.rowsPerPage,
                batches.length,
              ) * 25,
            )}`,
          }}
        >
          <Table aria-label="credit batch table" stickyHeader>
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <StyledTableCell
                    className={cx(headCell.wrap && styles.wrap)}
                    key={headCell.id}
                    align="left"
                    padding="normal"
                    // TODO implement sorting. See:
                    // https://app.zenhub.com/workspaces/regen-registry-5f8998bec8958d000f4609e2/issues/regen-network/regen-registry/811
                    // sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {/* <StyledTableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    > */}
                    <TableSortLabel
                      sx={{ cursor: 'default', ':hover': { color: 'inherit' } }}
                      IconComponent={() => null}
                    >
                      {headCell.label}
                    </TableSortLabel>
                    {/* </StyledTableSortLabel> */}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {stableSort(batches, getComparator(order, orderBy)).map(
                (batch: any) => {
                  return (
                    <StyledTableRow
                      className={styles.noWrap}
                      tabIndex={-1}
                      key={batch.batch_denom}
                    >
                      <StyledTableCell>
                        <a
                          href={getAccountUrl(batch.issuer)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {truncateWalletAddress(batch.issuer)}
                        </a>
                      </StyledTableCell>
                      <StyledTableCell>{batch.batch_denom}</StyledTableCell>
                      <StyledTableCell>{batch.class_id}</StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(batch.tradable_supply)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(batch.retired_supply)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(batch.amount_cancelled)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDate(batch.start_date)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDate(batch.end_date)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {batch.project_location}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </div>
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination {...paginationProps} />
            </TableRow>
          </TableFooter>
        </Table>
      </StyledTableContainer>
    </Section>
  ) : null;
};

const formatDate = (date: Date): string =>
  format(new Date(date), 'LLLL dd, yyyy');

export { CreditBatches };
