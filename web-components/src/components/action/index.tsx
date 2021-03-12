import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';

import ArrowDownIcon from '../icons/ArrowDownIcon';
import { truncate, Texts } from '../read-more/truncate';

export interface ActionProps {
  name: string;
  description: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    borderRadius: '5px',
  },
  name: {
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      paddingTop: theme.spacing(2.8),
      paddingBottom: theme.spacing(1.2),
    },
  },
  description: {
    fontSize: theme.spacing(3.5),
    color: theme.palette.info.dark,
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  readMore: {
    fontSize: theme.spacing(3),
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: theme.spacing(0.75),
    height: theme.spacing(2.5),
    width: theme.spacing(2.5),
    marginLeft: theme.spacing(0.5),
  },
}));

export default function Action({ name, description, imgSrc }: ActionProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);
  const texts: Texts = truncate(description, 310, 100);
  const desc: string = expanded ? texts.truncated + ' ' + texts.rest : texts.truncated;

  const handleChange = (): void => {
    setExpanded(prev => !prev);
  };

  return (
    <Grid container direction="column">
      <img className={classes.image} src={imgSrc} alt={name} />
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.description}>
        {ReactHtmlParser(desc)}
        {texts.rest.length !== 0 && (
          <span className={classes.readMore} onClick={handleChange}>
            {' '}
            read {expanded ? 'less' : 'more'}
            {expanded ? (
              <ArrowDownIcon className={classes.icon} direction="up" color={theme.palette.secondary.main} />
            ) : (
              <ArrowDownIcon className={classes.icon} direction="down" color={theme.palette.secondary.main} />
            )}
          </span>
        )}
      </Typography>
    </Grid>
  );
}
