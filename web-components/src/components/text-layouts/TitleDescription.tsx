import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import { Title } from '../typography';
import Description from '../description';
import { BlockContent, SanityBlockOr } from '../block-content';

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
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(10),
      fontSize: theme.spacing(5.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.75),
      fontSize: theme.spacing(4),
    },
  },
}));

export function TitleDescription({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: SanityBlockOr<string>; // accepts an HTML string or an array of sanity BlockContent
  className?: string;
  children?: React.ReactNode;
}): JSX.Element {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.root)}>
      <Title align="center" variant="h2">
        {title}
      </Title>
      <Description className={classes.description}>
        {/* gets passed a string for HTML, array of blocks for sanity */}
        {typeof description === 'string' ? (
          ReactHtmlParser(description)
        ) : (
          <BlockContent content={description} />
        )}
      </Description>
      {children && <div>{children}</div>}
    </div>
  );
}
