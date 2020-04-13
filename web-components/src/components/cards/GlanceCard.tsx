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
    marginTop: theme.spacing(5.25),
    marginBottom: theme.spacing(2.75),
  },
  container: {
    paddingTop: theme.spacing(3.75),
    paddingBottom: theme.spacing(4.25),
    paddingRight: theme.spacing(3.75),
    paddingLeft: theme.spacing(5),
    flexWrap: 'nowrap',
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
  },
}));

export default function GlanceCard({ title = 'At a glance', text, imgSrc }: GlanceCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card>
      <Grid className={classes.container} container>
        <Grid xs={7} item className={classes.textContainer}>
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
        <Grid xs={5} item>
          <img src={imgSrc} alt={imgSrc} />
        </Grid>
      </Grid>
    </Card>
  );
}
