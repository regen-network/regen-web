import React from 'react';
import {
  Grid,
  TablePagination as MuiTablePagination,
  TablePaginationProps as MuiTablePaginationProps,
} from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import PrevNextButton from '../buttons/PrevNextButton';

const useStylesAction = makeStyles()((theme: Theme) => ({
  buttonsWrapper: {
    display: 'flex',
    marginRight: theme.spacing(7.5),
    width: '100%',
    maxWidth: theme.spacing(27.5),
    justifyContent: 'space-between',
  },
}));

const TablePaginationActions = (props: any): any => {
  const { classes } = useStylesAction();
  const { count, page, rowsPerPage, onPageChange, dark = true } = props;
  const pageTotal = Math.ceil(count / rowsPerPage);

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

  if (pageTotal === 1) return null; // no need for pagination if only one page
  return (
    <Grid
      container
      justifyContent="flex-end"
      className={classes.buttonsWrapper}
    >
      <PrevNextButton
        dark={dark}
        direction="prev"
        onClick={handleBackButtonClick}
        disabled={page === 0}
      />
      <PrevNextButton
        dark={dark}
        direction="next"
        onClick={handleNextButtonClick}
        disabled={page >= pageTotal - 1}
      />
    </Grid>
  );
};

// fix issue with emotion+TS
// https://github.com/emotion-js/emotion/issues/1182
const uppercase: 'uppercase' = 'uppercase';

const StyledTablePagination = withStyles(
  MuiTablePagination,
  (theme: Theme) => ({
    root: {
      height: theme.spacing(29),
      borderTop: `1px solid ${theme.palette.info.light}`,
      borderBottom: 'none',
    },
    selectLabel: {
      fontSize: '1rem',
      '&:first-of-type': {
        fontFamily: 'Muli',
        fontSize: '0.75rem',
        fontWeight: 800,
        letterSpacing: '1px',
        textTransform: uppercase,
        color: theme.palette.grey[500],
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(10),
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
      marginLeft: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    selectIcon: {
      color: theme.palette.secondary.main,
      marginRight: theme.spacing(2),
      fontSize: '1.75rem',
      top: 'calc(50% - 16px)',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    displayedRows: {
      marginRight: theme.spacing(7.5),
    },
  }),
);

export interface TablePaginationProps {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  dark?: boolean;
  onPageChange: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelDisplayedRows?: MuiTablePaginationProps['labelDisplayedRows'];
}

export const TablePagination: React.FC<
  React.PropsWithChildren<TablePaginationProps>
> = props => {
  return (
    <StyledTablePagination
      rowsPerPageOptions={props.rowsPerPageOptions}
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onPageChange={props.onPageChange}
      onRowsPerPageChange={props.onChangeRowsPerPage}
      labelDisplayedRows={props.labelDisplayedRows}
      ActionsComponent={paginationProps => (
        <TablePaginationActions {...paginationProps} dark={props.dark} />
      )}
    />
  );
};
