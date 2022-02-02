import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import {
  StyledTableContainer,
  StyledTableCell,
  StyledTableRow,
  StyledTableSortLabel,
} from '.';

import { getComparator, stableSort, Order } from './sort';
import DocumentIcon from '../icons/DocumentIcon';
import EyeIcon from '../icons/EyeIcon';
import OutlinedButton from '../buttons/OutlinedButton';
import { getFormattedDate } from '../../utils/format';
import ContainedButton from '../buttons/ContainedButton';
import ShieldIcon from '../icons/ShieldIcon';

interface DocumentRowData {
  name: string;
  type: string;
  date: string | Date;
  url: string;
  ledger: string;
}

interface Document extends DocumentRowData {
  eventByEventId?: any;
}

interface DocumentationTableProps {
  className?: string;
  rows: Document[];
  canClickRow?: boolean;
  onViewOnLedger?: (ledgerData: any) => void;
  txClient?: ServiceClientImpl;
}

interface HeadCell {
  id: keyof DocumentRowData;
  label: string;
  numeric: boolean;
}

const useStyles = makeStyles(theme => ({
  rowClickable: {
    cursor: 'pointer',
  },
  nameCell: {
    fontWeight: 'bold',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(8),
      paddingRight: theme.spacing(3.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      paddingRight: theme.spacing(3.75),
    },
  },
  documentCell: {
    minWidth: theme.spacing(60),
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 'inherit',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2.75),
    },
  },
  ledgerBtn: {
    padding: theme.spacing(2, 4),
  },
}));

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DocumentRowData,
  ) => void;
  order: Order;
  orderBy: string;
  hasViewOnLedgerColumn?: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
  const { order, orderBy, onRequestSort, hasViewOnLedgerColumn } = props;
  const createSortHandler =
    (property: keyof DocumentRowData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  let headCells: HeadCell[] = [
    { id: 'name', numeric: false, label: 'Name of document' },
    { id: 'type', numeric: true, label: 'Document type' },
    { id: 'date', numeric: true, label: 'Date of upload' },
    { id: 'url', numeric: true, label: '' },
  ];

  const ledgerColumnCell: HeadCell = { id: 'ledger', numeric: true, label: '' };
  if (hasViewOnLedgerColumn) headCells.splice(3, 0, ledgerColumnCell); // don't show this headerCell if no ledger data

  return (
    <TableHead>
      <StyledTableRow>
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
              {/*orderBy === headCell.id ? (
                <span className={styles.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null*/}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

const DocumentationTable: React.FC<DocumentationTableProps> = ({
  rows,
  canClickRow = false,
  onViewOnLedger,
  txClient,
  className,
}) => {
  const styles = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DocumentRowData>('name');

  function handleClickNavigate(url: string): void {
    if (canClickRow) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DocumentRowData,
  ): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  let hasViewOnLedgerColumn: boolean = false;
  for (const r of rows) {
    if (
      r.eventByEventId?.creditVintageByEventId?.txHash &&
      txClient &&
      onViewOnLedger
    ) {
      hasViewOnLedgerColumn = true;
    }
  }

  return (
    <StyledTableContainer className={className}>
      <Table aria-label="documentation table" stickyHeader>
        <EnhancedTableHead
          classes={styles}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          hasViewOnLedgerColumn={hasViewOnLedgerColumn}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              const hasViewOnLedger =
                row.eventByEventId?.creditVintageByEventId?.txHash &&
                txClient &&
                onViewOnLedger;
              return (
                <StyledTableRow
                  tabIndex={-1}
                  key={row.name}
                  className={clsx(canClickRow && styles.rowClickable)}
                  onClick={() => handleClickNavigate(row.url)}
                >
                  <StyledTableCell
                    className={styles.nameCell}
                    id={labelId}
                    scope="row"
                  >
                    <div className={styles.name}>
                      <DocumentIcon
                        className={styles.icon}
                        fileType={row?.name?.split('.')?.pop()}
                      />{' '}
                      {row.name}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.type}</StyledTableCell>
                  <StyledTableCell align="left">
                    {typeof row.date === 'string' &&
                      getFormattedDate(
                        row.date,
                        options as Intl.DateTimeFormatOptions,
                      )}
                  </StyledTableCell>
                  {hasViewOnLedger && onViewOnLedger && (
                    <StyledTableCell
                      className={styles.documentCell}
                      align="right"
                    >
                      <ContainedButton
                        className={clsx(styles.button, styles.ledgerBtn)}
                        onClick={() =>
                          onViewOnLedger(
                            row.eventByEventId.creditVintageByEventId,
                          )
                        }
                        startIcon={<ShieldIcon />}
                      >
                        view on ledger
                      </ContainedButton>
                    </StyledTableCell>
                  )}
                  {hasViewOnLedgerColumn && !hasViewOnLedger && (
                    <StyledTableCell
                      className={styles.documentCell}
                      align="right"
                    ></StyledTableCell>
                  )}
                  <StyledTableCell
                    className={styles.documentCell}
                    align="right"
                  >
                    <a href={row.url} target="_blank" rel="noopener noreferrer">
                      <OutlinedButton
                        startIcon={<EyeIcon />}
                        className={styles.button}
                      >
                        view document
                      </OutlinedButton>
                    </a>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          {/*emptyRows > 0 && (
            <StyledTableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )*/}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export { DocumentationTable, DocumentRowData, Document };
