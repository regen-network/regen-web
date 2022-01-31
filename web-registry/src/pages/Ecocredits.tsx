import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledTableSortLabel,
} from 'web-components/lib/components/table';
import Section from 'web-components/lib/components/section';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { getComparator, Order, stableSort } from 'web-components/lib/components/table/sort';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  tableWrap: {
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: '8px',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
    overflow: 'hidden',
  },
  stickyHead: {
    // TODO once we upgrade MUI there is a built in solution:
    // https://mui.com/components/data-grid/columns/#column-pinning
    textAlign: 'left',
    background: theme.palette.primary.main,
    position: 'sticky',
    right: 0,
  },
  stickyCell: {
    background: 'inherit',
    position: 'sticky',
    right: 0,
  },
  borderLeft: {
    // absolutely position border to get around MUI style quirks
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderLeft: `1px solid ${theme.palette.info.light}`,
  },
  batchDenomTitleCell: {
    minWidth: theme.spacing(25),
    [theme.breakpoints.up('md')]: {
      minWidth: theme.spacing(40),
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: theme.spacing(50),
    },
  },
  greenText: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  greyText: {
    color: theme.palette.info.main,
  },
}));

type RowItem = {
  batch_denom: string;
  issuer: string;
  class_id: string;
  amount_tradeable: number;
  amount_retired: number;
  start_date: Date;
  end_date: Date;
  project_location: string;
};

function createRow(i: number): RowItem {
  return {
    batch_denom: 'C01-20190101-20200101-00' + i,
    issuer: 'Regen Registry',
    class_id: 'C01',
    amount_tradeable: i * 1000,
    amount_retired: i * 100,
    start_date: new Date(),
    end_date: new Date(),
    project_location: 'Colorado',
  };
}

const rows: RowItem[] = [];
for (let i = 0; i < 10; i++) {
  rows.push(createRow(i));
}

export const Ecocredits: React.FC = () => {
  const styles = useStyles();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('start_date');

  const handleSort = (sortBy: string): void => {
    const isAsc = orderBy === sortBy && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(sortBy);
  };

  const SortableCell: React.FC<{ field: string }> = ({ field, children }) => {
    const isCurrentSort = orderBy === field;
    return (
      <StyledTableCell sortDirection={isCurrentSort ? order : false}>
        <StyledTableSortLabel
          active={isCurrentSort}
          direction={isCurrentSort ? order : 'asc'}
          onClick={() => handleSort(field)}
        >
          {children}
        </StyledTableSortLabel>
      </StyledTableCell>
    );
  };

  return (
    <div className={styles.root}>
      <Section title="My Ecocredits" titleVariant="h3" titleAlign="left">
        <div className={styles.tableWrap}>
          <StyledTableContainer>
            <Table aria-label="eco credits table" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <div className={styles.batchDenomTitleCell}>Batch Denom</div>
                  </StyledTableCell>
                  <StyledTableCell>Issuer</StyledTableCell>
                  <StyledTableCell>Credit Class</StyledTableCell>
                  <SortableCell field="amount_tradeable">Amount Tradeable</SortableCell>
                  <SortableCell field="amount_retired">Amount Retired</SortableCell>
                  <SortableCell field="batch_start_date">Batch Start Date</SortableCell>
                  <SortableCell field="batch_end_date">Batch End Date</SortableCell>
                  <StyledTableCell>Project Location</StyledTableCell>
                  <StyledTableCell className={styles.stickyHead}>
                    <Box>
                      <div className={styles.borderLeft} />
                      Actions
                    </Box>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{row.batch_denom}</StyledTableCell>
                    <StyledTableCell>
                      <span className={styles.greenText}>{row.issuer}</span>
                    </StyledTableCell>
                    <StyledTableCell>{row.class_id}</StyledTableCell>
                    <StyledTableCell>{formatNumber(row.amount_tradeable)}</StyledTableCell>
                    <StyledTableCell>{formatNumber(row.amount_retired)}</StyledTableCell>
                    <StyledTableCell>
                      <span className={styles.greyText}>{formatDate(row.start_date)}</span>
                    </StyledTableCell>
                    <StyledTableCell>
                      <span className={styles.greyText}>{formatDate(row.end_date)}</span>
                    </StyledTableCell>
                    <StyledTableCell>{row.project_location}</StyledTableCell>
                    <StyledTableCell className={styles.stickyCell}>
                      <div className={styles.borderLeft} />
                      <TableActionButtons
                        buttons={[
                          {
                            label: 'sell',
                            onClick: () => 'TODO sell credit',
                          },
                          {
                            label: 'Transfer',
                            onClick: () => 'TODO transfer credit',
                          },
                          {
                            label: 'Retire',
                            onClick: () => 'TODO retire credit',
                          },
                        ]}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </Section>
    </div>
  );
};

const formatDate = (date: Date): string => format(date, 'LLLL dd, yyyy');
const formatNumber = (num: number | string): string => {
  return +num > 0 ? Math.floor(+num).toLocaleString() : '-';
};
