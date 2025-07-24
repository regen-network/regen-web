import { useParams } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Grid } from '@mui/material';
import Image from 'next/image';

import Section from 'web-components/src/components/section';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import UserInfo from 'web-components/src/components/user/UserInfo';
import { defaultFontFamily } from 'web-components/src/theme/muiTheme';
import { truncate } from 'web-components/src/utils/truncate';

import { AccountByIdQuery } from 'generated/graphql';
import { getHashUrl } from 'lib/block-explorer';

import { LinkWithArrow } from 'components/atoms';

import { useAttestEvents } from './hooks/useAttestEvents';
import { SEE_BLOCKCHAIN_RECORD, TIMELINE } from './Post.constants';

type Props = {
  createdAt: string;
  creatorAccount: AccountByIdQuery['accountById'];
  creatorIsAdmin: boolean;
  registryAddr?: string | null;
  adminAddr?: string | null;
};

export const PostTimeline = ({
  createdAt,
  creatorAccount,
  creatorIsAdmin,
  registryAddr,
  adminAddr,
}: Props) => {
  const { _ } = useLingui();
  const { iri } = useParams();
  const { events } = useAttestEvents({
    iri,
    createdAt,
    creatorAccount,
    creatorIsAdmin,
    registryAddr,
    adminAddr,
  });

  return (
    <Section className="max-w-[750px] m-auto sm:p-0 py-0">
      <Title variant="h6">{_(TIMELINE)}</Title>
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
                <Image src={event.icon} alt={event.label} />
                {index < events.length - 1 && (
                  <TimelineConnector className="bg-grey-300 w-1 mr-[2px]" />
                )}
              </TimelineSeparator>

              <TimelineContent className="p-20 pt-0">
                <Grid container alignItems="center">
                  <Grid item>
                    <Subtitle component="div" className="mr-5">
                      {event.label}
                    </Subtitle>
                  </Grid>
                  <Grid item>
                    <UserInfo
                      size="sm"
                      user={event.user}
                      fontFamily={defaultFontFamily}
                      classNames={{
                        info: 'ml-3',
                      }}
                      nameHasPadding={false}
                    />
                  </Grid>
                </Grid>
                <Body className="text-grey-400 pt-5 pb-10" size="xs">
                  {event.timestamp}
                </Body>
                {event.txhash && (
                  <Body size="sm">
                    {_(SEE_BLOCKCHAIN_RECORD)}:{' '}
                    <LinkWithArrow
                      href={getHashUrl(event.txhash)}
                      label={truncate(event.txhash)}
                    />
                  </Body>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
};
