import React from 'react';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import Grid, { GridProps } from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

interface FixedFooterProps {
  children?: any;
  justifyContent?: GridProps['justifyContent'];
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    zIndex: 1000,
    backgroundColor: theme.palette.primary.main,
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(24),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(19),
    },
    boxShadow: theme.shadows[7],
  },
  root: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(19),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
}));

export default function FixedFooter({
  children,
  justifyContent,
}: FixedFooterProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.background}>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        justifyContent={
          justifyContent
            ? justifyContent
            : matches
            ? 'flex-end'
            : 'space-between'
        }
        className={classes.root}
      >
        {children}
      </Grid>
    </div>
  );
}
