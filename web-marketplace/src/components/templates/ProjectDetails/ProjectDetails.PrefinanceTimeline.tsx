import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import {
  ClassPrefinanceTimelineItem,
  Maybe,
  ProjectPrefinanceTimelineItem,
} from 'generated/sanity-graphql';

import { PrefinanceTimelineItem } from './ProjectDetails.PrefinanceTimelineItem';

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
      {timeline.map((item, index) => (
        <PrefinanceTimelineItem
          key={item?.status?.description}
          item={item}
          isLast={index === timeline.length - 1}
        />
      ))}
    </Timeline>
  </Modal>
);
