import React from 'react';
import NextLink from 'next/link';
import { makeStyles } from 'tss-react/mui';

import RegenIcon from '../../icons/RegenIcon';

const useStyles = makeStyles()(theme => {
  const { pxToRem } = theme.typography;

  return {
    icon: {
      display: 'block',
      height: 'auto',
      width: pxToRem(186),
      [theme.breakpoints.down('md')]: {
        width: pxToRem(111),
      },
      [theme.breakpoints.down('sm')]: {
        width: pxToRem(104),
      },
    },
  };
});

export const HeaderLogoLink: React.FC<
  React.PropsWithChildren<{ color: string }>
> = ({ color }) => {
  const { classes: styles } = useStyles();

  return (
    <NextLink href="/">
      <RegenIcon className={styles.icon} color={color} />
    </NextLink>
  );
};
