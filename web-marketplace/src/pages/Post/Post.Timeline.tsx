import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { useQuery } from '@tanstack/react-query';

import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import UserInfo, { User } from 'web-components/src/components/user/UserInfo';
import { defaultFontFamily } from 'web-components/src/theme/muiTheme';

import { AccountByIdQuery } from 'generated/graphql';
import { useLedger } from 'ledger';
import { getHashUrl } from 'lib/block-explorer';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';

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

  const { txClient } = useLedger();
  const { data: txsEventData, isLoading } = useQuery(
    getGetTxsEventQuery({
      client: txClient,
      enabled: !!txClient,
      request: {
        events: [
          `${messageActionEquals}'/${MsgBridge.$type}'`,
          `message.sender='${address}'`,
        ],
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

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

    events.unshift({
      icon: '/svg/post-signed.svg',
      label: `Signed by`,
      user: {
        name: creatorAccount.name || 'test',
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
                {index < events.length - 1 && (
                  <TimelineConnector className="bg-grey-300 w-1" />
                )}
              </TimelineSeparator>

              <TimelineContent className="p-20 pt-0">
                <div className="inline-flex">
                  <Subtitle component="div" className="w-[100%] mr-5">
                    {event.label}
                  </Subtitle>
                  <UserInfo
                    size="sm"
                    user={event.user}
                    fontFamily={defaultFontFamily}
                    classNames={{
                      info: 'ml-3',
                    }}
                    nameHasPadding={false}
                  />
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
