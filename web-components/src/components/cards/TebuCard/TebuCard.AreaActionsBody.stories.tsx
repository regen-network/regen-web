import { Meta, StoryFn } from '@storybook/react';

import TebuCard, { TebuCardProps } from './TebuCard';
import AreaActionsBody, { AreaActionsProps } from './TebuCard.AreaActionsBody';

const Template: StoryFn<TebuCardProps> = args => <TebuCard {...args} />;

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;
export const AreaActionsBodyStory = Template.bind({});
AreaActionsBodyStory.args = {
  header: 'Project Area Actions',
  headerTooltip: 'Header Tooltip',
  children: (
    <AreaActionsBody
      preservationArea={100}
      restorationArea={200}
      preservationLabel="Preservation"
      restorationLabel="Restoration"
    />
  ),
  footerLabels: [
    {
      label: 'Resoration factor:',
      value: '0.20',
    },
    {
      label: 'Preservation factor:',
      value: '0.16',
    },
  ],
};

const areaActionsValues = [
  {
    preservationArea: 120,
    restorationArea: 220.11,
  },
  {
    preservationArea: 120,
    restorationArea: 120,
  },
  {
    preservationArea: 120,
    restorationArea: 80,
  },
];
AreaActionsBodyStory.decorators = [
  () => {
    return (
      <div className="flex flex-wrap gap-20">
        {areaActionsValues.map((values, index) => (
          <TebuCard
            key={index}
            {...(AreaActionsBodyStory.args as TebuCardProps)}
            children={
              <AreaActionsBody
                {...(AreaActionsBodyStory.args?.children
                  ?.props as AreaActionsProps)}
                preservationArea={values.preservationArea}
                restorationArea={values.restorationArea}
              />
            }
          />
        ))}
      </div>
    );
  },
];
