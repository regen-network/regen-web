import * as React from 'react';
import TimelineItem from 'web-components/lib/components/timeline/TimelineItem';
import Timeline, { Event } from 'web-components/lib/components/timeline';
import theme from '../../theme/muiTheme';

export default {
  title: 'Components|Timeline',
  component: Timeline,
};

const events: [Event] = [
  {
    date: 'September 2019',
    title: 'Project starts',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'October 2019',
    title: 'Approval complete',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'February 2020',
    title: 'Credits issued',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'February 2030',
    title: 'Project completion',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const date: string = 'September 2019';
const title: string = 'Project starts';
const description: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const timeline = (): JSX.Element => <Timeline events={events} />;
export const timelineItem = (): JSX.Element => (
  <TimelineItem date={date} title={title} description={description} color={theme.palette.secondary.main} />
);
