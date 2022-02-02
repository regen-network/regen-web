import React from 'react';
import {
  withStyles,
  makeStyles,
  DefaultTheme as Theme,
  useTheme,
} from '@mui/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Box from '@mui/material/Box';
import cx from 'clsx';

import BreadcrumbIcon from '../icons/BreadcrumbIcon';

interface NavigationProps {
  className?: string;
  classes?: {
    root?: string;
    listItem?: string;
  };
  categories: string[];
  onClick: (c: string) => void;
  category?: string;
  showIcon?: boolean;
}

const StyledList = withStyles(theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.up('sm')]: {
      background: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      background: theme.palette.primary.main,
      borderRadius: '10px',
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.grey[100]}`,
    },
  },
}))(List);

const StyledListItemButton = withStyles(theme => ({
  root: {
    fontSize: theme.spacing(3.5),
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    '&:first-child': {
      borderRadius: '10px 10px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 10px 10px ',
    },
    [theme.breakpoints.up('sm')]: {
      borderLeft: '6px solid transparent',
      paddingLeft: theme.spacing(4.75),
      paddingRight: theme.spacing(4.75),
      lineHeight: theme.spacing(13.75),
      '&.Mui-selected': {
        borderLeft: `6px solid ${theme.palette.secondary.dark}`,
        backgroundColor: theme.palette.info.light,
        color: theme.palette.grey[500],
      },
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: theme.spacing(17.5),
      paddingLeft: theme.spacing(7),
      paddingRight: theme.spacing(5),
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
      },
    },
  },
}))(ListItemButton);

const useStyles = makeStyles((theme: Theme) => ({
  action: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(3.5),
      width: theme.spacing(5.75),
    },
  },
  selectedIcon: {
    color: theme.palette.grey[100],
  },
}));

const Navigation = ({
  className,
  classes,
  categories,
  onClick,
  category,
  showIcon,
}: NavigationProps): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <StyledList className={cx(className, classes?.root)}>
      {categories.map((name, i) => {
        const selected = !!category && category === name;
        return (
          <StyledListItemButton
            key={i}
            className={classes?.listItem}
            selected={selected}
            onClick={() => {
              onClick(name);
            }}
          >
            {name}
            <Box
              display={{
                xs: 'block',
                sm: showIcon ? 'block' : 'none',
              }}
            >
              <ListItemSecondaryAction className={styles.action}>
                <BreadcrumbIcon
                  className={styles.icon}
                  direction="next"
                  color={
                    selected
                      ? theme.palette.info.main
                      : theme.palette.secondary.main
                  }
                />
              </ListItemSecondaryAction>
            </Box>
          </StyledListItemButton>
        );
      })}
    </StyledList>
  );
};

export default Navigation;
