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
  logo: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(25)}`,
      height: theme.spacing(27.5),
      '& svg': {
        fontSize: '12rem',
        height: theme.spacing(20.75),
      },
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
  },
  searchIcon: {
    color: '#D2D5D9', // TODO: change with color from theme.palette
    marginRight: theme.spacing(6.25),
    marginBottom: theme.spacing(1),
  },
  menuIcon: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function Header({ logo }: HeaderProps): JSX.Element {
  const classes = useStyles({});
  // TODO: Add search/menu logic
  return (
    <Grid container direction="row" className={classes.root} alignItems="center" justify="space-between">
      <Grid item>
        <a href="/">
          <RegenIcon />
        </a>
      </Grid>
      {/*<Grid item alignItems="center">
        <SearchIcon className={classes.searchIcon} />
        <MenuIcon className={classes.menuIcon} fontSize="large" />
      </Grid>*/}
    </Grid>
  );
}
