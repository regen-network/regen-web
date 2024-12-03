import { Meta, StoryFn } from '@storybook/react';

import TebuCard, { TebuCardProps } from './TebuCard';
import Duration from './TebuCard.Duration';

const Template: StoryFn<TebuCardProps> = args => <TebuCard {...args} />;

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;

export const DurationStory = Template.bind({});
DurationStory.args = {
  header: 'Project Duration',
  headerTooltip: 'Header Tooltip',
  children: (
    <Duration
      title="20 year project duration"
      minimumValue={20}
      maximumValue={30}
      minDurationLabel="20 years minimum"
      maxDurationLabel="30 years"
      duration={20}
      tooltip="Duration Tooltip"
    />
  ),
  footerLabels: [
    {
      label: 'Factor 1:',
      value: '0.20',
    },
  ],
};

const durationValues = [
  {
    duration: 20,
    title: '20 year project duration',
    maximumValue: 30,
    minDurationLabel: '20 years minimum',
    maxDurationLabel: '30 years',
  },
  {
    duration: 25,
    title: '25 year project duration',
    maximumValue: 30,
    minDurationLabel: '20 years minimum',
    maxDurationLabel: '30 years',
  },
  {
    duration: 50,
    title: '50 year project duration',
    maximumValue: 30,
    minDurationLabel: '20 years minimum',
    maxDurationLabel: '30 years',
  },
  {
    duration: 50,
    title: '50 year project duration',
    maximumValue: 50,
    minDurationLabel: '20 years minimum',
    maxDurationLabel: '>50 years',
  },
];

DurationStory.decorators = [
  () => {
    return (
      <div className="flex flex-wrap gap-20">
        {durationValues.map((values, index) => (
          <TebuCard
            key={index}
            {...(DurationStory.args as TebuCardProps)}
            children={
              <Duration
                {...(DurationStory.args?.children?.props as any)}
                {...values}
              />
            }
          />
        ))}
      </div>
    );
  },
];
