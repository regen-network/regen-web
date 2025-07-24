import { Trans } from '@lingui/react/macro';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Image from 'next/image';

import { Body } from 'web-components/src/components/typography';

import {
  ClassPrefinanceTimelineItem,
  ProjectPrefinanceTimelineItem,
} from 'generated/sanity-graphql';

import { formatTimelineDates } from './ProjectDetails.utils';

type Props = {
  item: ProjectPrefinanceTimelineItem | ClassPrefinanceTimelineItem | null;
  isLast: boolean;
};

export const PrefinanceTimelineItem = ({ item, isLast }: Props) => {
  const projected = item?.prefinanceTimelineItem?.currentStatus === 'projected';
  const iconSrc =
    item?.status?.icon?.image?.asset?.url ?? item?.status?.icon?.imageHref;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <div className="rounded-[50%] h-[28px] w-[28px] bg-grey-200 flex items-center justify-center">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={18}
              height={18}
              className={projected ? '' : 'saturate-[1.0] brightness-0'}
              alt={item?.status?.icon?.imageAlt || ''}
            />
          )}
        </div>
        {!isLast && <TimelineConnector className="bg-grey-300 w-1" />}
      </TimelineSeparator>
      <TimelineContent className="p-0 pl-15">
        <div className="flex justify-between">
          <Body
            size="md"
            className={projected ? '' : 'text-grey-700 font-bold'}
          >
            {item?.status?.description}
          </Body>
          <div className={projected ? 'text-grey-400 -mt-5' : 'text-grey-500'}>
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
};
