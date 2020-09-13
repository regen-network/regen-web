import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import Title from '../title';
import Description from '../description';

interface TitleDescriptionProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(28),
      marginRight: theme.spacing(28),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(9.5),
      paddingBottom: theme.spacing(10),
      fontSize: theme.spacing(5.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.75),
      fontSize: theme.spacing(4),
    },
  },
}));

export default function TitleDescription({
  title,
  description,
  className,
  children,
}: TitleDescriptionProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.root)}>
      <Title align="center" variant="h2">
        {title}
      </Title>
      <Description className={classes.description}>{ReactHtmlParser(description)}</Description>
      {children && <div>{children}</div>}
    </div>
  );
}
