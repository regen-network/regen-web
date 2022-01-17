import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import clsx from 'clsx';

import Card from './Card';
import OutlinedButton from '../buttons/OutlinedButton';
import { BlockContent, SanityBlockOr } from '../block-content';

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
    flex: 1,
    padding: theme.spacing(4, 4, 8),
  },
  title: {
    marginTop: theme.spacing(4),
    fontSize: theme.spacing(7),
    fontWeight: 900,
  },
  description: {
    fontSize: theme.spacing(4),
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

const GreenTopIconCard: React.FC<{
  className?: string;
  title: string;
  description: SanityBlockOr<string>;
  linkUrl: string;
  linkText: string;
  imgSrc: string;
}> = props => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, props.className)}>
      <div className={classes.imgWrap}>
        <img
          className={classes.img}
          src={props.imgSrc}
          alt={
            typeof props.description === 'string'
              ? props.description
              : props.title
          }
        />
      </div>

      <Grid container direction="column" className={classes.main}>
        <Typography variant="h1" className={classes.title}>
          {props.title}
        </Typography>
        <Typography className={classes.description}>
          {typeof props.description === 'string' ? (
            props.description
          ) : (
            <BlockContent content={props.description} />
          )}
        </Typography>
        <div className={classes.btnWrap}>
          <OutlinedButton
            className={classes.btn}
            href={props.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.linkText}
          </OutlinedButton>
        </div>
      </Grid>
    </Card>
  );
};

export default GreenTopIconCard;
