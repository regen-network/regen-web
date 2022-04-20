import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import { BodyText, Title } from '../typography';
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
      <BodyText size="xl">
        {typeof description === 'string' ? (
          ReactHtmlParser(description)
        ) : (
          <BlockContent content={description} />
        )}
      </BodyText>
      {children && <div>{children}</div>}
    </div>
  );
}
