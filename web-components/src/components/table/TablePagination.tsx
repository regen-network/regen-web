import React from 'react';
import { TablePagination as MuiTablePagination, Grid } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import PrevNextButton from '../buttons/PrevNextButton';

const useStylesAction = makeStyles(theme => ({
  buttonsWrapper: {
    display: 'flex',
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(7.5),
    width: '100%',
    maxWidth: theme.spacing(27.5),
    justifyContent: 'space-between',
  },
}));

const TablePaginationActions = (props: any): any => {
  const classes = useStylesAction();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ): void => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ): void => {
    onPageChange(event, page + 1);
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      className={classes.buttonsWrapper}
    >
      <PrevNextButton
        dark
        direction="prev"
        onClick={handleBackButtonClick}
        disabled={page === 0}
      />
      <PrevNextButton
        dark
        direction="next"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      />
    </Grid>
  );
};

const StyledTablePagination = withStyles(theme => ({
  root: {
    height: theme.spacing(29),
  },
  caption: {
    fontSize: '1rem',
    '&:first-of-type': {
      fontFamily: 'Muli',
      fontSize: '0.75rem',
      fontWeight: 800,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: theme.palette.grey[500],
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(10),
    },
  },
  selectRoot: {
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  select: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '2px',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    paddingRight: `${theme.spacing(12)} !important`,
  },
  selectIcon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
    fontSize: '1.75rem',
    top: 'calc(50% - 16px)',
  },
}))(MuiTablePagination);

export interface TablePaginationProps {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = props => {
  return (
    <StyledTablePagination
      rowsPerPageOptions={props.rowsPerPageOptions}
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onPageChange={props.onPageChange}
      onRowsPerPageChange={props.onChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};
