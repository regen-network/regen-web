import React from 'react';
import { withStyles, makeStyles, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';

import BreadcrumbIcon from '../icons/BreadcrumbIcon';

interface NavigationProps {
  categories: string[];
  onClick: (c: number) => void;
  category: number;
}

const StyledList = withStyles(theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.up('sm')]: {
      background: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      background: theme.palette.primary.main,
      borderRadius: '10px',
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.grey[100]}`,
    },
  },
}))(List);

const StyledListItem = withStyles(theme => ({
  root: {
    fontSize: theme.spacing(3.5),
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    [theme.breakpoints.up('sm')]: {
      borderLeft: '6px solid transparent',
      paddingLeft: theme.spacing(4.75),
      paddingRight: theme.spacing(4.75),
      lineHeight: theme.spacing(13.75),
      '&.Mui-selected': {
        borderRadius: '3px',
        borderLeft: `6px solid ${theme.palette.secondary.dark}`,
        backgroundColor: theme.palette.info.light,
        color: theme.palette.grey[500],
      },
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: theme.spacing(17.5),
      paddingLeft: theme.spacing(7),
      paddingRight: theme.spacing(5),
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
      },
    },
  },
}))(ListItem);

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(3.5),
      width: theme.spacing(5.75),
    },
  },
}));

const Navigation = ({ categories, onClick, category }: NavigationProps): JSX.Element => {
  const classes = useStyles();

  return (
    <StyledList>
      {categories.map((name, i) => (
        <StyledListItem
          key={i}
          button
          selected={category === i}
          onClick={() => {
            onClick(i);
          }}
        >
          {name}
          <Box display={{ xs: 'block', sm: 'none' }}>
            <ListItemSecondaryAction>
              <BreadcrumbIcon className={classes.icon} direction="next" />
            </ListItemSecondaryAction>
          </Box>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default Navigation;
