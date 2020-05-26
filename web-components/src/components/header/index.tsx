import React from 'react';
import { makeStyles, Theme, MenuItem, MenuList, Link } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RegenIcon from '../icons/RegenIcon';
import clsx from 'clsx';
import MenuHover from '../menu-hover';
// import {
//   Link,
//   useParams,
//   useRouteMatch
// } from 'react-router-dom';
// import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';

interface HeaderProps {
  logo: string;
  absolute?: boolean;
  children?: any;
  transparent?: boolean;
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  menuList: {
    display: 'flex',
    position: 'unset',
    width: 'unset',
    'z-index': 0,
  },
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  transparent: {
    backgroundColor: `rgba(0,0,0,0)`,
  },
  absolute: {
    position: 'absolute',
    'z-index': 10,
    width: '100%',
  },
  color: (props: any) => ({
    color: props.textColor || '#000',
    '& ul > li > a': {
      color: props.textColor || '#000',
    },
  }),
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

export default function Header({ children, logo, transparent, color, absolute }: HeaderProps): JSX.Element {
  const classes = useStyles({ textColor: color });
  let headerClass = [];
  headerClass.push(transparent ? classes.transparent : classes.background);
  headerClass.push(absolute ? classes.absolute : '');
  headerClass.push(classes.color, classes.root);
  // TODO: Add search/menu logic
  return (
    <div>
      <Grid
        className={clsx(headerClass)}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <a href="/">
            <RegenIcon />
          </a>
        </Grid>
        <Grid item>
          <MenuList className={classes.menuList}>
            <MenuItem>
              <Link href="/buyers">Buyers</Link>
            </MenuItem>
            <MenuItem>
              <Link href="">Land Stewards</Link>
            </MenuItem>
            <MenuItem>
              <MenuHover text="Learn More">
                <MenuItem>
                  <Link href="https://regen.network/#">Case Studies</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="https://regen.network/#">FAQ</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="https://regen.network/#">Team</Link>
                </MenuItem>
              </MenuHover>
            </MenuItem>
          </MenuList>
        </Grid>
        {/*<Grid item alignItems="center">
          <SearchIcon className={classes.searchIcon} />
          <MenuIcon className={classes.menuIcon} fontSize="large" />
        </Grid>*/}
      </Grid>
    </div>
  );
}
