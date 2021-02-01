import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import TimelineItem from './TimelineItem';
import { IssuanceModalData } from '../modal/IssuanceModal';

export interface Event {
  date: Date | string;
  summary: string;
  description?: string;
  modalData?: IssuanceModalData; // | MonitoringModalProps use type guard to check modalData type;
}

interface TimelineProps {
  events: Event[];
  txClient?: ServiceClientImpl;
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

export default function Timeline({ events, txClient }: TimelineProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
      {events.map((event, index) => {
        const eventDate: Date = new Date(event.date);
        const color = eventDate <= new Date() ? theme.palette.secondary.main : theme.palette.info.main;
        let barColor = color;
        if (index + 1 < events.length && new Date() < new Date(events[index + 1].date)) {
          barColor = theme.palette.info.main;
        }
        return (
          <div className={classes.item} key={`${index}-${event.summary}`}>
            <TimelineItem
              date={eventDate}
              summary={event.summary}
              description={event.description}
              modalData={event.modalData}
              circleColor={color}
              barColor={barColor}
              odd={index % 2 !== 0}
              last={index === events.length - 1}
              txClient={txClient}
            />
          </div>
        );
      })}
    </div>
  );
}
