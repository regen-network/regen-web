import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import cx from 'clsx';

import {
  StyledTableContainer,
  StyledTableCell,
  StyledTableRow,
  StyledTableSortLabel,
  // StyledTablePagination,
} from 'web-components/lib/components/table';
import { useTablePagination } from 'web-components/lib/components/table/useTablePagination';
import { getComparator, stableSort, Order } from 'web-components/lib/components/table/sort';
import Section from 'web-components/lib/components/section';
import { truncateWalletAddress } from '../../lib/wallet';
import { ledgerRestUri } from '../../ledger';
import { getBatchSupply, getBatches } from '../../lib/ledger-rest';
import { getAccountUrl } from '../../lib/block-explorer';

interface BatchRowData {
  start_date: string | Date;
  end_date: string | Date;
  issuer: string;
  batch_denom: string;
  class_id: string;
  total_amount: number;
  tradable_supply?: number;
  retired_supply?: number;
  amount_cancelled: number;
  project_location: string;
}

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
  { id: 'tradable_supply', numeric: true, label: 'total amount tradable', wrap: true },
  { id: 'retired_supply', numeric: true, label: 'total amount retired', wrap: true },
  { id: 'amount_cancelled', numeric: true, label: 'total amount cancelled', wrap: true },
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
}));

const CreditBatches: React.FC = () => {
  const styles = useStyles();
  const [batches, setBatches] = useState<any[]>([]);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('start_date');

  const { page, rowsPerPage, paginationProps, TablePagination } = useTablePagination(batches.length)

  useEffect(() => {
    if (ledgerRestUri) {
      const addSupplyDataToBatch = (batches: BatchRowData[]): Promise<BatchRowData[]> => {
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

      getBatches().then(res => {
        const creditBatches = res?.data?.batches;
        addSupplyDataToBatch(creditBatches).then(sortableBatches => {
          setBatches(sortableBatches);
        });
      });
    }
  }, []);

  const createSortHandler = (property: keyof BatchRowData) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BatchRowData): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const formatNumber = (num: number | string): string => {
    if (typeof num === 'string') num = parseFloat(num);
    return num > 0 ? Math.floor(num).toLocaleString() : '-';
  };

  return ledgerRestUri && batches.length > 0 ? (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title="Credit Batches"
      titleVariant="h2"
      titleAlign="left"
    >
      <StyledTableContainer className={styles.tableBorder}>
        <div style={{ width: '100%', overflow: 'auto' }}>
          <Table aria-label="credit batch table" stickyHeader>
            <TableHead>
              {headCells.map(headCell => (
                <StyledTableCell
                  className={cx(headCell.wrap && styles.wrap)}
                  key={headCell.id}
                  align="left"
                  padding="default"
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
            </TableHead>
            <TableBody>
              {stableSort(batches, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((batch: any) => {
                  return (
                    <StyledTableRow className={styles.noWrap} tabIndex={-1} key={batch.batch_denom}>
                      <StyledTableCell>
                        <a href={getAccountUrl(batch.issuer)} target="_blank" rel="noopener noreferrer">
                          {truncateWalletAddress(batch.issuer)}
                        </a>
                      </StyledTableCell>
                      <StyledTableCell>{batch.batch_denom}</StyledTableCell>
                      <StyledTableCell>{batch.class_id}</StyledTableCell>
                      <StyledTableCell>{formatNumber(batch.tradable_supply)}</StyledTableCell>
                      <StyledTableCell>{formatNumber(batch.retired_supply)}</StyledTableCell>
                      <StyledTableCell>{formatNumber(batch.amount_cancelled)}</StyledTableCell>
                      <StyledTableCell>{moment(batch.start_date).format('LL')}</StyledTableCell>
                      <StyledTableCell>{moment(batch.end_date).format('LL')}</StyledTableCell>
                      <StyledTableCell>{batch.project_location}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination {...paginationProps} />
              {/* <StyledTablePagination
                rowsPerPageOptions={[5, 10]}
                count={batches.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              /> */}
            </TableRow>
          </TableFooter>
        </Table>
      </StyledTableContainer>
    </Section>
  ) : null;
};

export { CreditBatches };
