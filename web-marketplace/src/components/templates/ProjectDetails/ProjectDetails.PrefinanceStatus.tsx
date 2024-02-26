import { useMemo } from 'react';

import { Body } from 'web-components/src/components/typography';
import { formatDate } from 'web-components/src/utils/format';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  ClassPrefinanceTimelineItem,
  Maybe,
  ProjectPrefinanceTimelineItem,
} from 'generated/sanity-graphql';

type Props = {
  timeline:
    | Maybe<ProjectPrefinanceTimelineItem>[]
    | Maybe<ClassPrefinanceTimelineItem>[];
};

export const PrefinanceStatus = ({ timeline }: Props) => {
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
              {formatDate(
                lastDoneItem.prefinanceTimelineItem?.date,
                'MMM YYYY',
              )}
            </Body>
          </div>
        </div>
      ) : (
        '-'
      )}
    </>
  );
};
