import React from 'react';
import { TableSortLabel, TableSortLabelProps } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { withStyles } from 'tss-react/mui';

import DropdownIcon from '../icons/DropdownIcon';

const StyledTableContainer = withStyles(TableContainer, theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    overflowY: 'hidden',
  },
}));

const StyledTableRow = withStyles(TableRow, theme => ({
  root: {
    color: theme.palette.info.dark,
    height: theme.spacing(25),
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTableCell-body': {
      padding: theme.spacing(4, 4),
    },
  },
}));

// fix issue with emotion+TS
// https://github.com/emotion-js/emotion/issues/1182
const uppercase: 'uppercase' = 'uppercase';
const nowrap: 'nowrap' = 'nowrap';

const StyledTableCell = withStyles(TableCell, theme => ({
  head: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: uppercase,
    letterSpacing: '1px',
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.info.main,
    background: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.info.light}`,
    height: theme.spacing(19),
    lineHeight: theme.spacing(4),
    verticalAlign: 'bottom',
    whiteSpace: nowrap,
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
}));

const StyledTableSortLabel: React.FC<
  React.PropsWithChildren<TableSortLabelProps>
> = props => {
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

export {
  getTablePaginationPadding,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledTableSortLabel,
};
