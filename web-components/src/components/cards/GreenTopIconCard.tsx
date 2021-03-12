import React from 'react';
import { SvgIcon, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import Card from './Card';
type SvgProps = typeof SvgIcon;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(9, 0, 12),
      padding: theme.spacing(13.5, 10, 12.5),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(6.5, 0, 10),
      padding: theme.spacing(8.5, 2.5, 10),
    },
  },
}));

type Props = {
  className?: string;
  svg: SvgProps;
};

const GreenTopIconCard: React.FC<Props> = p => {
  const classes = useStyles();
  const { svg: Svg } = p;
  return (
    <Card className={clsx(classes.root, p.className)}>
      <div>{/* <Svg /> */}</div>
      {p.children}
    </Card>
  );
};

export default GreenTopIconCard;
