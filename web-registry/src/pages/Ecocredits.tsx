import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableRow, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledTableSortLabel,
} from 'web-components/lib/components/table';
import Section from 'web-components/lib/components/section';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import {
  getComparator,
  Order,
  stableSort,
} from 'web-components/lib/components/table/sort';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
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
      minWidth: theme.spacing(45),
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: theme.spacing(50),
    },
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

  const SortableHead: React.FC<{ field: string }> = ({ field, children }) => {
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
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="My Ecocredits" titleVariant="h3" titleAlign="left">
        <Box
          sx={{
            border: 1,
            borderColor: 'info.light',
            borderRadius: '8px',
            marginTop: 8,
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          <StyledTableContainer sx={{ overflow: 'auto' }}>
            <Table aria-label="eco credits table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <div className={styles.batchDenomTitleCell}>
                      Batch Denom
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>Issuer</StyledTableCell>
                  <StyledTableCell>Credit Class</StyledTableCell>
                  <SortableHead field="amount_tradeable">
                    Amount Tradeable
                  </SortableHead>
                  <SortableHead field="amount_retired">
                    Amount Retired
                  </SortableHead>
                  <SortableHead field="batch_start_date">
                    Batch Start Date
                  </SortableHead>
                  <SortableHead field="batch_end_date">
                    Batch End Date
                  </SortableHead>
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
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell>{row.batch_denom}</StyledTableCell>
                      <StyledTableCell>
                        <Box
                          display="inline"
                          sx={{
                            color: 'secondary.main',
                            fontWeight: 700,
                          }}
                        >
                          {row.issuer}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>{row.class_id}</StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(row.amount_tradeable)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatNumber(row.amount_retired)}
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
                  ),
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </Section>
    </Box>
  );
};

const formatDate = (date: Date): string => format(date, 'LLLL dd, yyyy');
const formatNumber = (num: number | string): string => {
  return +num > 0 ? Math.floor(+num).toLocaleString() : '-';
};
