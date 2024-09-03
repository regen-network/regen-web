import { useMemo, useState } from 'react';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import { Body } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  ClassPrefinanceTimelineItem,
  Maybe,
  ProjectPrefinanceTimelineItem,
} from 'generated/sanity-graphql';

import { VIEW_TIMELINE } from './ProjectDetails.constant';
import { PrefinanceTimeline } from './ProjectDetails.PrefinanceTimeline';
import { formatTimelineDates } from './ProjectDetails.utils';

type Props = {
  title: string;
  timeline:
    | Maybe<ProjectPrefinanceTimelineItem>[]
    | Maybe<ClassPrefinanceTimelineItem>[];
};

export const PrefinanceStatus = ({ title, timeline }: Props) => {
  const orderedDoneTimeline = useMemo(
    () =>
      timeline
        .filter(item => item?.prefinanceTimelineItem?.currentStatus === 'done')
        ?.sort(
          (a, b) =>
            new Date(a?.prefinanceTimelineItem?.date).getTime() -
            new Date(b?.prefinanceTimelineItem?.date).getTime(),
        ),
    [timeline],
  );
  const lastDoneItem = orderedDoneTimeline[orderedDoneTimeline.length - 1];
  const inProgress = timeline.some(
    item => item?.prefinanceTimelineItem?.currentStatus === 'projected',
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      {lastDoneItem ? (
        <div className="flex pt-15">
          <div
            className={cn(
              'w-[14px] h-[14px] rounded-[50%] mr-10 sm:mr-5 mt-[2px] sm:mt-[4px]',
              inProgress ? 'bg-warning-400' : 'bg-brand-400',
            )}
          />
          <div>
            <Body size="md" className="text-grey-500 font-bold pb-5">
              {lastDoneItem.status?.description}
            </Body>
            <Body size="sm" className="">
              {lastDoneItem?.prefinanceTimelineItem &&
                formatTimelineDates(lastDoneItem.prefinanceTimelineItem)}
            </Body>
            <TextButton
              onClick={() => setOpen(true)}
              className="mt-15 text-[11px]"
            >
              {VIEW_TIMELINE}
            </TextButton>
          </div>
        </div>
      ) : (
        '-'
      )}
      <PrefinanceTimeline
        timeline={timeline}
        open={open}
        onClose={() => setOpen(false)}
        title={title}
      />
    </>
  );
};
