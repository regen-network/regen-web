import React from 'react';
import { withStyles } from '@mui/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { TableSortLabel, TableSortLabelProps } from '@mui/material';
import DropdownIcon from '../icons/DropdownIcon';

const StyledTableContainer = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    overflowY: 'hidden',
  },
}))(TableContainer);

const StyledTableRow = withStyles(theme => ({
  root: {
    color: theme.palette.info.dark,
    height: theme.spacing(25),
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:nth-child(even)': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTableCell-body': {
      padding: theme.spacing(4, 4),
    },
  },
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.info.main,
    background: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.info.light}`,
    lineHeight: theme.spacing(4),
    verticalAlign: 'bottom',
    whiteSpace: 'nowrap',
    '& .MuiTableSortLabel-active': {
      color: theme.palette.info.main,
    },
    '& svg': {
      alignSelf: 'end',
      top: theme.spacing(-1),
    },
    [theme.breakpoints.up('sm')]: {
      '&:first-of-type': {
        paddingLeft: theme.spacing(8.5),
      },
    },
  },
  body: {
    border: 'none',
    color: theme.palette.primary.light,
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(6),
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 700,
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
      '& svg': {
        marginRight: theme.spacing(2),
      },
    },
    [theme.breakpoints.up('sm')]: {
      '&:first-of-type': {
        paddingLeft: theme.spacing(8.5),
      },
    },
  },
}))(TableCell);

const StyledTableSortLabel: React.FC<TableSortLabelProps> = props => {
  return (
    <TableSortLabel {...props} IconComponent={DropdownIcon}>
      {props.children}
    </TableSortLabel>
  );
};

/** Our table rows have a fixed height - this is used to calculate padding bottom
 * for container div on a paginated table so the last page maintains height */
const getTablePaginationPadding = (
  countTotal: number,
  rowsPerPage: number,
  countPage: number,
): number => {
  return countTotal <= rowsPerPage ? 0 : rowsPerPage - countPage;
};

const formatNumber = (num: number | string | undefined): string => {
  if (!num) return '-';
  if (typeof num === 'string') num = parseFloat(num);
  return num > 0 ? Math.floor(num).toLocaleString() : '-';
};

export {
  StyledTableContainer,
  StyledTableRow,
  StyledTableCell,
  StyledTableSortLabel,
  getTablePaginationPadding,
  formatNumber,
};
