import React, { useState } from 'react';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
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

export interface Data {
  name: string;
  type: string;
  date: string | Date;
  url: string;
}

interface RegenTableProps {
  rows: Data[];
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const CustomTableCell = withStyles((theme: Theme) => ({
  root: {
    verticalAlign: 'baseline',
  },
}))(TableCell);

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name of document' },
  { id: 'type', numeric: true, label: 'Document type' },
  { id: 'date', numeric: true, label: 'Date of upload' },
  { id: 'url', numeric: true, label: '' },
];

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
  },
  headerCell: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.75rem',
    color: theme.palette.primary.light,
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
    lineHeight: '1.25rem',
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
  },
  cell: {
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      lineHeight: '40px',
    },
  },
  nameCell: {
    fontWeight: 'bold',
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(2.75),
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
    minWidth: theme.spacing(50),
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
          <CustomTableCell
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
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function RegenTable({ rows }: RegenTableProps): JSX.Element {
  const classes = useStyles({});

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');

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
                <TableRow tabIndex={-1} key={row.name} className={classes.row}>
                  <CustomTableCell
                    className={`${classes.cell} ${classes.nameCell}`}
                    component="th"
                    id={labelId}
                    scope="row"
                  >
                    <DocumentIcon className={classes.icon} /> {row.name}
                  </CustomTableCell>
                  <CustomTableCell className={classes.cell} align="left">
                    {row.type}
                  </CustomTableCell>
                  <CustomTableCell className={classes.cell} align="left">
                    {new Date(row.date).toLocaleDateString('en-US', options)}
                  </CustomTableCell>
                  <CustomTableCell className={`${classes.cell} ${classes.documentCell}`} align="left">
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className={classes.link}>
                      <OutlinedButton startIcon={<EyeIcon />}>view document</OutlinedButton>
                    </a>
                  </CustomTableCell>
                </TableRow>
              );
            })}
          {/*emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <CustomTableCell colSpan={6} />
            </TableRow>
          )*/}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
