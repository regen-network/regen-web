import React from 'react';
import { TablePagination as MuiTablePagination, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

function TablePaginationActions(props: any) {
  const classes = useStylesAction();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  return (
    <Grid container justify="flex-end" className={classes.buttonsWrapper}>
      <PrevNextButton direction="prev" onClick={handleBackButtonClick} disabled={page === 0} />
      <PrevNextButton
        direction="next"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      />
    </Grid>
  );
}

const StyledTablePagination = withStyles(theme => ({
  root: {
    height: theme.spacing(29),
  },
  caption: {
    color: theme.palette.grey[500],
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  select: {
    border: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    '& .MuiSelect-icon .MuiSvgIcon-root': {
      color: theme.palette.secondary.main,
    },
  },
}))(MuiTablePagination);

export interface TablePaginationProps {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = props => {
  return (
    <StyledTablePagination
      rowsPerPageOptions={props.rowsPerPageOptions}
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};
