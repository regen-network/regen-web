import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import Title from '../title';

interface GlanceCardProps {
  title?: string;
  text: string[];
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: theme.spacing(2.75),
    },
    marginBottom: theme.spacing(2.75),
  },
  container: {
    paddingTop: theme.spacing(4.5),
    paddingBottom: theme.spacing(4.5),
    paddingRight: theme.spacing(4.5),
    paddingLeft: theme.spacing(4.5),
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  texts: {
    color: theme.palette.info.dark,
    margin: 0,
    paddingInlineStart: theme.spacing(2),
    listStyle: 'none',
    // marginTop: theme.spacing(4.5),
  },
  text: {
    fontSize: '0.875rem',
    paddingBottom: theme.spacing(1.5),
    '& li::before': {
      content: "'\\2022'",
      fontSize: '0.5rem',
      color: theme.palette.secondary.main,
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
    },
  },
  textContainer: {
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  image: {
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: '5px',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
}));

export default function GlanceCard({ title = 'At a glance', text, imgSrc }: GlanceCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card>
      <Grid className={classes.container} container>
        <Grid xs={12} md={7} item className={classes.textContainer}>
          <Title variant="body2" className={classes.title}>
            {title}
          </Title>
          <ul className={classes.texts}>
            {text.map((p, i) => (
              <Typography key={i} className={classes.text}>
                <li>{p}</li>
              </Typography>
            ))}
          </ul>
        </Grid>
        <Grid xs={12} md={5} item>
          <img className={classes.image} src={imgSrc} alt={imgSrc} />
        </Grid>
      </Grid>
    </Card>
  );
}
