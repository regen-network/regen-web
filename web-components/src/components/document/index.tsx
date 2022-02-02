import * as React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

export interface DocumentInfo {
  name: string;
  info: string;
  link: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
  },
}));

export default function Document({
  name,
  info,
  link,
}: DocumentInfo): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span>{name} </span>
      <a
        className={classes.link}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        View {info} »
      </a>
    </div>
  );
}
