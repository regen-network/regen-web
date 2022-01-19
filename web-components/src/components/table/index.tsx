import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  TableSortLabelProps,
  TablePagination,
} from '@material-ui/core';
import DropdownIcon from '../icons/DropdownIcon';

const StyledTableContainer = withStyles(theme => ({
  root: {
    // paddingBottom: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',
    // [theme.breakpoints.up('sm')]: {
    //   maxHeight: theme.spacing(119.5),
    // },
    // [theme.breakpoints.down('xs')]: {
    //   maxHeight: theme.spacing(96.75),
    // },
  },
}))(TableContainer);

const StyledTableRow = withStyles(theme => ({
  root: {
    color: theme.palette.info.dark,
    height: theme.spacing(20),
    fontSize: theme.typography.pxToRem(16),
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
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    lineHeight: theme.spacing(4),
    verticalAlign: 'bottom',
    whiteSpace: 'nowrap',
    '&:first-of-type': {
      paddingLeft: theme.spacing(8.5),
    },
    '& .MuiTableSortLabel-active': {
      color: theme.palette.info.main,
    },
    '& svg': {
      alignSelf: 'end',
      top: theme.spacing(-1),
    },
  },
  body: {
    border: 'none',
    color: theme.palette.primary.light,
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
    '&:first-of-type': {
      paddingLeft: theme.spacing(8.5),
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

export { StyledTableContainer, StyledTableRow, StyledTableCell, StyledTableSortLabel };
