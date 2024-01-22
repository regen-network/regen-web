import Section from 'web-components/src/components/section';
import Timeline from 'web-components/src/components/timeline';
import { Body } from 'web-components/src/components/typography';

import { useTimelineStyles } from './TimelineSection.styles';

import { PressKitTimelineSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  timelineSectionData?: PressKitTimelineSectionFieldsFragment['timelineSection'];
};

const TimelineSection = ({ timelineSectionData }: Props): JSX.Element => {
  const { classes: styles } = useTimelineStyles();

  return (
    <Section
      classes={{ root: styles.root, title: styles.title }}
      title={timelineSectionData?.header || ''}
    >
      <Body
        size="lg"
        sx={{
          textAlign: ['left', 'center'],
          pb: [9.5, 13.25],
          pt: [5, 7.5],
          m: { sm: '0 auto' },
          maxWidth: { sm: 754 },
        }}
      >
        {timelineSectionData?.description}
      </Body>
      <Timeline
        onViewOnLedger={() => null}
        events={timelineSectionData?.items as any[]}
        completedItemIndex={timelineSectionData?.completedItemIndex || 0}
      />
    </Section>
  );
};

export default TimelineSection;
