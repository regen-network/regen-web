import theme from '../../theme/muiTheme';
import Timeline, { Event } from '.';
import NewTimeline, { Item } from './NewTimeline';
import TimelineItem from './TimelineItem';

export default {
  title: 'Timeline',
  component: Timeline,
};

const events: Event[] = [
  {
    date: 'September 2, 2019',
    summary: 'Project starts',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'October 21, 2019',
    summary: 'Approval complete',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'February 20, 2020',
    summary: 'Credits issued',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'September 2022',
    summary: 'Site visit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    date: 'February 2029',
    summary: 'Project completion',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const voidFunc = (): void => void null;

export const timeline = (): JSX.Element => (
  <Timeline
    onViewOnLedger={voidFunc}
    events={events}
    completedItemIndex={1}
    viewLedgerText="View on ledger"
  />
);
export const timelineItem = (): JSX.Element => (
  <TimelineItem
    date={events[0].date as string}
    summary={events[0].summary}
    onViewOnLedger={voidFunc}
    // modalData={{ creditClass: 1, numberOfCredits: 1 }}
    description={events[0].description}
    circleColor={theme.palette.secondary.main}
    barColor={theme.palette.secondary.main}
    odd={false}
    last={false}
    viewLedgerText="View on ledger"
  />
);

const items: Item[] = [
  {
    title: 'Register project',
    url: 'https://airtable.com',
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
