import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import { User } from 'web-components/src/components/user/UserInfo';

import { AccountByIdQuery } from 'generated/graphql';
import { getHashUrl } from 'lib/block-explorer';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { LinkWithArrow } from 'components/atoms';

import { ADMIN, SEE_BLOCKCHAIN_RECORD, TIMELINE } from './Post.constants';

type Props = {
  createdAt: string;
  creatorAccount: AccountByIdQuery['accountById'];
  creatorIsAdmin: boolean;
};
type Event = {
  icon: string;
  label: string;
  user: User;
  timestamp: string;
  hash?: string;
};

export const PostTimeline = ({
  createdAt,
  creatorAccount,
  creatorIsAdmin,
}: Props) => {
  const events: Array<Event> = [];
  if (creatorAccount) {
    events.push({
      icon: '/svg/post-created.svg',
      label: `Created ${'and signed'} by`,
      user: {
        name: creatorAccount.name || DEFAULT_NAME,
        link: `/profiles/${creatorAccount.id}`,
        type: creatorAccount.type,
        image: creatorAccount.image,
        tag: creatorIsAdmin ? ADMIN : undefined,
      },
      timestamp: createdAt,
      hash: 'kjejzoejosoqo12233',
    });
  }

  return (
    <div className="max-w-[750px] m-auto">
      <Title variant="h6">{TIMELINE}</Title>
      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {events.map((event, index) => {
          return (
            <TimelineItem key={event.timestamp}>
              <TimelineSeparator>
                <img src={event.icon} alt={event.label} />
              </TimelineSeparator>
              {index < events.length - 1 && (
                <TimelineConnector className="bg-grey-300 w-1" />
              )}
              <TimelineContent>
                <div className="inline-flex">
                  <Subtitle>{event.label}</Subtitle>
                </div>
                <Body className="text-grey-400 pt-5 pb-10" size="xs">
                  {event.timestamp}
                </Body>
                {event.hash && (
                  <Body size="sm">
                    {SEE_BLOCKCHAIN_RECORD}:{' '}
                    <LinkWithArrow
                      href={getHashUrl(event.hash)}
                      label={event.hash}
                    />
                  </Body>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};
