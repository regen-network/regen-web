import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
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
    height: '100%',
    padding: theme.spacing(4, 4, 8),
  },
  title: {
    marginTop: theme.spacing(4),
    fontSize: theme.spacing(7),
    fontWeight: 900,
  },
  description: {
    fontSize: theme.spacing(4),
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

const GreenTopIconCard: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, props.className)}>
      <div className={classes.imgWrap}>
        <img
          className={classes.img}
          src={props.imgSrc}
          alt={props.description}
        />
      </div>

      <Grid container direction="column" className={classes.main}>
        <Typography variant="h1" className={classes.title}>
          {props.title}
        </Typography>
        <Typography className={classes.description}>
          {props.description}
        </Typography>
        <div className={classes.btnWrap}>
          <OutlinedButton
            className={classes.btn}
            href={props.linkURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Github
          </OutlinedButton>
        </div>
      </Grid>
    </Card>
  );
};

export default GreenTopIconCard;
