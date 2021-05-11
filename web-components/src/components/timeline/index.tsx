import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import LazyLoad from 'react-lazyload';

import TimelineItem from './TimelineItem';

export interface Event {
  date: Date | string;
  summary: string;
  description?: string;
  ledgerData?: any; // must be converted to IssuanceModalData to open IssuanceModal
}

interface TimelineProps {
  events: Event[];
  txClient?: ServiceClientImpl;
  completedItemIndex?: number;
  onViewOnLedger: (ledgerData: any) => void;
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

export default function Timeline({
  events,
  completedItemIndex,
  txClient,
  onViewOnLedger,
}: TimelineProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <LazyLoad offset={300}>
      <div className={classes.root}>
        {events.map((event, index) => {
          let circleColor: string;
          let barColor: string;
          // Use completedItemIndex if available to color past timeline items
          if (completedItemIndex || completedItemIndex === 0) {
            circleColor =
              index <= completedItemIndex ? theme.palette.secondary.main : theme.palette.info.main;
            barColor = index < completedItemIndex ? theme.palette.secondary.main : theme.palette.info.main;
          } else {
            // else we should provide valid dates for events so we can compare them with present date
            const eventDate = new Date(event.date);
            circleColor = eventDate <= new Date() ? theme.palette.secondary.main : theme.palette.info.main;
            if (index + 1 < events.length && new Date() < new Date(events[index + 1].date)) {
              barColor = theme.palette.info.main;
            } else {
              barColor = circleColor;
            }
          }

          return (
            <div className={classes.item} key={`${index}-${event.summary}`}>
              <TimelineItem
                date={event.date}
                summary={event.summary}
                description={event.description}
                ledgerData={event.ledgerData}
                circleColor={circleColor}
                barColor={barColor}
                odd={index % 2 !== 0}
                last={index === events.length - 1}
                txClient={txClient}
                onViewOnLedger={onViewOnLedger}
              />
            </div>
          );
        })}
      </div>
    </LazyLoad>
  );
}
