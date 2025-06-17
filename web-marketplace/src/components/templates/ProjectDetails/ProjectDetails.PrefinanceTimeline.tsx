import { Trans } from '@lingui/react/macro';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import {
  ClassPrefinanceTimelineItem,
  Maybe,
  ProjectPrefinanceTimelineItem,
} from 'generated/sanity-graphql';

import { formatTimelineDates } from './ProjectDetails.utils';

type Props = {
  title: string;
  timeline:
    | Maybe<ProjectPrefinanceTimelineItem>[]
    | Maybe<ClassPrefinanceTimelineItem>[];
} & RegenModalProps;

export const PrefinanceTimeline = ({
  title,
  timeline,
  open,
  onClose,
}: Props) => (
  <Modal open={open} onClose={onClose} className="py-50 sm:p-50">
    <Title className="pb-40 sm:pb-50 text-center" variant="h4">
      {title}
    </Title>
    <Timeline
      sx={{
        padding: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {timeline.map((item, index) => {
        const projected =
          item?.prefinanceTimelineItem?.currentStatus === 'projected';
        return (
          <TimelineItem key={item?.status?.description}>
            <TimelineSeparator>
              <div className="rounded-[50%] h-[28px] w-[28px] bg-grey-200 flex items-center justify-center">
                <img
                  className={projected ? '' : 'saturate-[1.0] brightness-0'}
                  src={
                    item?.status?.icon?.image?.asset?.url ??
                    item?.status?.icon?.imageHref ??
                    ''
                  }
                  alt={item?.status?.icon?.imageAlt || ''}
                />
              </div>
              {index < timeline.length - 1 && (
                <TimelineConnector className="bg-grey-300 w-1" />
              )}
            </TimelineSeparator>
            <TimelineContent className="p-0 pl-15">
              <div className="flex justify-between">
                <Body
                  size="md"
                  className={projected ? '' : 'text-grey-700 font-bold'}
                >
                  {item?.status?.description}
                </Body>
                <div
                  className={
                    projected ? 'text-grey-400 -mt-5' : 'text-grey-500'
                  }
                >
                  {projected && item?.prefinanceTimelineItem?.date && (
                    <div className="uppercase font-bold text-[11px]">
                      <Trans>PROJECTED:</Trans>
                    </div>
                  )}
                  <Body size="md">
                    {item?.prefinanceTimelineItem &&
                      formatTimelineDates(item.prefinanceTimelineItem)}
                  </Body>
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  </Modal>
);
