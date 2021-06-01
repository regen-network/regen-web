import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import Description, { DescriptionProps } from 'web-components/src/components/description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    color: theme.palette.info.dark,
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
}));

export const TokenDescription = ({ children, className }: DescriptionProps): JSX.Element => {
  const styles = useStyles();

  return <Description className={clsx(className, styles.root)}>{ReactHtmlParser(children)}</Description>;
};
