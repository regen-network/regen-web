import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RegenIcon from '../icons/RegenIcon';
// import {
//   Link,
//   useParams,
//   useRouteMatch
// } from 'react-router-dom';
// import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';

interface HeaderProps {
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(37)}`,
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(27.5),
      '& svg': {
        fontSize: '12rem',
        height: theme.spacing(20.75),
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(3.75)}`,
      height: theme.spacing(15),
      '& svg': {
        // fontSize: '5rem',
        height: theme.spacing(10.25),
        width: theme.spacing(23),
      },
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  searchIcon: {
    color: theme.palette.grey[50],
    marginRight: theme.spacing(6.25),
    marginBottom: theme.spacing(1),
  },
  menuIcon: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function Header({ children }: HeaderProps): JSX.Element {
  const classes = useStyles({});
  // TODO: Add search/menu logic
  return (
    <div className={classes.background}>
      <Grid container direction="row" className={classes.root} alignItems="center" justify="space-between">
        <Grid item>
          <a href="/">
            <RegenIcon />
          </a>
        </Grid>
        <Grid item>{children}</Grid>
        {/*<Grid item alignItems="center">
          <SearchIcon className={classes.searchIcon} />
          <MenuIcon className={classes.menuIcon} fontSize="large" />
        </Grid>*/}
      </Grid>
    </div>
  );
}
