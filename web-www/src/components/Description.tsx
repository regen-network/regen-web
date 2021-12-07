import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Description, { DescriptionProps } from 'web-components/lib/components/description';

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

export const MarketingDescription = ({ children, className }: DescriptionProps): JSX.Element => {
  const styles = useStyles();

  return <Description className={clsx(className, styles.root)}>{children}</Description>;
};
