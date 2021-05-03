import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from './sort';
import DocumentIcon from '../icons/DocumentIcon';
import EyeIcon from '../icons/EyeIcon';
import OutlinedButton from '../buttons/OutlinedButton';
import { getFormattedDate } from '../../utils/format';

export interface Data {
  name: string;
  type: string;
  date: string | Date;
  url: string;
}

interface RegenTableProps {
  rows: Data[];
  canClickRow?: boolean;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name of document' },
  { id: 'type', numeric: true, label: 'Document type' },
  { id: 'date', numeric: true, label: 'Date of upload' },
  { id: 'url', numeric: true, label: '' },
];

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(7),
  },
  headerCell: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.75rem',
    color: theme.palette.primary.light,
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    lineHeight: '1.25rem',
    whiteSpace: 'nowrap',
    '&:first-of-type': {
      paddingLeft: theme.spacing(6),
    },
  },
  row: {
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:nth-child(even)': {
      backgroundColor: '#FAFAFA',
    },
    '& .MuiTableCell-body': {
      padding: theme.spacing(4, 4),
    },
  },
  rowClickable: {
    cursor: 'pointer',
  },
  cell: {
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(5.75),
    },
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
  link: {
    textDecoration: 'none',
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
    '& svg': {
      marginRight: '8px',
    },
  },
  documentCell: {
    minWidth: theme.spacing(60),
  },
  viewBtn: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 'inherit',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2.75),
    },
  },
}));

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            className={classes.headerCell}
            key={headCell.id}
            align="left"
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/*orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null*/}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function RegenTable({ rows, canClickRow = false }: RegenTableProps): JSX.Element {
  const classes = useStyles({});

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');

  function handleClickNavigate(url: string): void {
    if (canClickRow) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table aria-label="documentation table">
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  tabIndex={-1}
                  key={row.name}
                  className={clsx(classes.row, canClickRow && classes.rowClickable)}
                  onClick={() => handleClickNavigate(row.url)}
                >
                  <TableCell className={clsx(classes.cell, classes.nameCell)} id={labelId} scope="row">
                    <div className={classes.name}>
                      <DocumentIcon className={classes.icon} fileType={row.name.split('.').pop()} />{' '}
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    {row.type}
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    {getFormattedDate(row.date, options)}
                  </TableCell>
                  <TableCell className={clsx(classes.cell, classes.documentCell)} align="right">
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className={classes.link}>
                      <OutlinedButton startIcon={<EyeIcon />} className={classes.viewBtn}>
                        view document
                      </OutlinedButton>
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          {/*emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )*/}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
