import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export interface DocumentInfo {
  name: string;
  link: string;
  linkText: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
  link,
  linkText,
}: DocumentInfo): JSX.Element {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <span>{name} </span>
      <a
        className={classes.link}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    </div>
  );
}
