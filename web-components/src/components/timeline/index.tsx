import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import TimelineItem from './TimelineItem';

export interface Event {
  date?: Date | string;
  title: string;
  description?: string;
}

interface TimelineProps {
  events: Event[];
  completedItemIndex: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(7.5),
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      alignSelf: 'flex-end',
    },
    '&:nth-child(odd)': {
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
      },
    },
  },
}));

export default function Timeline({ events, completedItemIndex }: TimelineProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
      {events.map((event, index) => {
        // const currentEventDate: Date = new Date(event.date);
        // let nextEventDate: Date = currentEventDate;
        // if (index + 1 < events.length) {
        //   nextEventDate = new Date(events[index + 1].date);
        // }
        return (
          <div className={classes.item} key={`${index}-${event.title}`}>
            <TimelineItem
              date={event.date}
              title={event.title}
              description={event.description}
              circleColor={
                index <= completedItemIndex ? theme.palette.secondary.main : theme.palette.info.main
              }
              barColor={index < completedItemIndex ? theme.palette.secondary.main : theme.palette.info.main}
              odd={index % 2 !== 0}
              last={index === events.length - 1}
            />
          </div>
        );
      })}
    </div>
  );
}
