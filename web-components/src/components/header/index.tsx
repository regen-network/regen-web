import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';

interface HeaderProps {
  logo: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '3.75rem',
    padding: `${theme.spacing(2.5)} ${theme.spacing(3.75)}`,
    backgroundColor: theme.palette.primary.main,
  },
  image: {
    height: '2.5625rem',
    // margin: `${theme.spacing(2.5)} ${theme.spacing(3.75)} ${theme.spacing(2.25)}`,
    cursor: 'pointer',
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
        <a href="https://www.regen.network/">
          <img alt="Regen Network" src={logo} className={classes.image} />
        </a>
      </Grid>
      {/*<Grid item alignItems="center">
        <SearchIcon className={classes.searchIcon} />
        <MenuIcon className={classes.menuIcon} fontSize="large" />
      </Grid>*/}
    </Grid>
  );
}
