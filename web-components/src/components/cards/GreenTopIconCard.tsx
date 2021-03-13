import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';

import Card from './Card';
import OutlinedButton from '../buttons/OutlinedButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    border: 'none',
    borderRadius: '9px',
    flexDirection: 'column',
    margin: theme.spacing(4),
    maxWidth: theme.spacing(90),
  },
  main: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    padding: theme.spacing(4, 4, 8),
  },
  title: {
    marginTop: theme.spacing(4),
    fontSize: theme.spacing(7),
  },
  description: {
    fontSize: theme.spacing(3),
    margin: theme.spacing(4, 0),
    color: theme.palette.info.dark,
  },
  imgWrap: {
    backgroundColor: theme.palette.secondary.contrastText,
    padding: theme.spacing(5, 0),
  },
  img: {
    width: '100%',
    height: theme.spacing(20),
    margin: '0 auto',
  },
  btnWrap: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  btn: {
    fontSize: theme.spacing(3.5),
  },
}));

type Props = {
  className?: string;
  title: string;
  description: string;
  linkURL: string;
  imgSrc: string;
};

const GreenTopIconCard: React.FC<Props> = p => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, p.className)}>
      <div className={classes.imgWrap}>
        <img className={classes.img} src={p.imgSrc} alt={p.description} />
      </div>

      <div className={classes.main}>
        <Typography variant="h1" className={classes.title}>
          {p.title}
        </Typography>
        <Typography className={classes.description}>{p.description}</Typography>
        <div className={classes.btnWrap}>
          <OutlinedButton className={classes.btn} href={p.linkURL} target="_blank" rel="noopener noreferrer">
            View on Github
          </OutlinedButton>
        </div>
      </div>
    </Card>
  );
};

export default GreenTopIconCard;
