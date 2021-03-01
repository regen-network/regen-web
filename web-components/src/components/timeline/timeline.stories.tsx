import * as React from 'react';
import TimelineItem from 'web-components/lib/components/timeline/TimelineItem';
import Timeline, { Event } from 'web-components/lib/components/timeline';
import NewTimeline, { Item } from 'web-components/lib/components/timeline/NewTimeline';
import theme from '../../theme/muiTheme';
import { withKnobs, object, boolean, text, number } from '@storybook/addon-knobs';

export default {
  title: 'Components|Timeline',
  component: Timeline,
  decorators: [withKnobs],
};

const events: Event[] = [
  {
    date: 'September 2, 2019',
    title: 'Project starts',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'October 21, 2019',
    title: 'Approval complete',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'February 20, 2020',
    title: 'Credits issued',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'September 2022',
    title: 'Site visit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'February 2029',
    title: 'Project completion',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

export const timeline = (): JSX.Element => (
  <Timeline events={object('Events', events)} completedItemIndex={number('completedItemIndex', 1)} />
);
export const timelineItem = (): JSX.Element => (
  <TimelineItem
    date={text('Date', events[0].date)}
    title={text('Title', events[0].title)}
    description={text('Description', events[0].description)}
    circleColor={theme.palette.secondary.main}
    barColor={theme.palette.secondary.main}
    odd={boolean('Odd', false)}
    last={boolean('Last element', false)}
  />
);

const items: Item[] = [
  {
    title: 'Register project',
    link: 'https://airtable.com',
    tags: [
      {
        name: 'farmer',
        color: '#7BC796',
      },
    ],
    imgSrc: 'verified.png',
  },
  {
    title: 'Establish timeline',
    tags: [
      {
        name: 'monitor',
        color: '#6D9BDB',
      },
      {
        name: 'farmer',
        color: '#7BC796',
      },
    ],
    imgSrc: 'verified.png',
  },
  {
    title: 'Lorem ipsum 1',
    tags: [
      {
        name: 'monitor',
        color: '#6D9BDB',
      },
      {
        name: 'farmer',
        color: '#7BC796',
      },
    ],
    imgSrc: 'verified.png',
  },
  {
    title: 'Lorem ipsum 2',
    tags: [
      {
        name: 'monitor',
        color: '#6D9BDB',
      },
    ],
    imgSrc: 'verified.png',
  },
];

export const newTimeline = (): JSX.Element => <NewTimeline items={items} />;
