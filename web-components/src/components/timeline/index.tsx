import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TimelineItem from './TimelineItem';

export interface Event {
  date: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  events: [Event];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    alignSelf: 'flex-end'
  },
  greenBar: {
    backgroundColor: theme.palette.secondary.main,
    width: '0.375rem',
    left: '55%',
    height: '55%', // XXX placeholder for now
    position: 'absolute',
  },
  greyBar: {
    backgroundColor: '#8F8F8F', // TODO add to theme palette
    width: '0.375rem',
    left: '55%',
    height: '100%',
    position: 'absolute',
  }
}));

export default function Timeline({ events }: TimelineProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
    {events.map((event, index) => (
      <div className={classes.item}>
        <TimelineItem
          date={event.date}
          title={event.title}
          description={event.description}
          color={theme.palette.secondary.main}
        />
      </div>
    ))}
      <div className={classes.greyBar} />
      <div className={classes.greenBar} />
    </div>
  )
}
