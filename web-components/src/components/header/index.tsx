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

export interface node {
  [key: number]: React.ReactNode;
}

interface HeaderProps {
  logo: string;
  absolute?: boolean;
  children?: any;
  transparent?: boolean;
  color?: string;
  menuItems?: HeaderMenuItem[];
}

interface HeaderMenuItem {
  title: string;
  href?: string;
  dropdownItems?: { title: string; href: string }[];
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
    color: props.textColor || theme.palette.primary.contrastText,
    '& ul > li > a': {
      color: props.textColor || theme.palette.primary.contrastText,
      textDecoration: 'none',
      'font-family': 'Muli',
      'text-transform': 'uppercase',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
    '& ul > li > div > span': {
      color: props.textColor || theme.palette.primary.contrastText,
      textDecoration: 'none',
      'font-family': 'Muli',
      'text-transform': 'uppercase',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
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

export default function Header({
  children,
  logo,
  transparent,
  color,
  absolute,
  menuItems,
}: HeaderProps): JSX.Element {
  const classes = useStyles({ textColor: color });
  let headerClass = [];
  headerClass.push(transparent ? classes.transparent : classes.background);
  headerClass.push(absolute ? classes.absolute : '');
  headerClass.push(classes.color, classes.root);

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
            <RegenIcon color={color} />
          </a>
        </Grid>
        <Grid item>
          <MenuList className={classes.menuList}>
            {menuItems?.map((item, index) => (
              <MenuItem key={index}>
                {item.dropdownItems ? (
                  <MenuHover text={item.title}>
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <MenuItem key={index}>
                        <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
                      </MenuItem>
                    ))}
                  </MenuHover>
                ) : (
                  <Link href={item.href}>{item.title}</Link>
                )}
              </MenuItem>
            ))}
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
