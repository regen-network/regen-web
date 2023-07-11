import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ImpactTags } from './ImpactTags';

export default {
  title: 'organisms/ImpactTags',
  component: ImpactTags,
} as ComponentMeta<typeof ImpactTags>;

const Template: ComponentStory<typeof ImpactTags> = args => (
  <ImpactTags {...args} />
);

export const Default = Template.bind({});

Default.args = {
  impact: [
    {
      name: 'Reforestation',
      imgSrc: '/illustrations/reforestation.png',
      sdgs: [
        { src: '/sdgs/sdg3.svg', alt: 'sdg3' },
        { src: '/sdgs/sdg4.svg', alt: 'sdg4' },
        { src: '/sdgs/sdg8.svg', alt: 'sdg8' },
      ],
      standard:
        'https://regen-registry.s3.amazonaws.com/projects/kasigau/VCS.png',
      monitored: true,
    },
  ],
  ecosystems: [
    {
      name: 'Urban Forest',
      icon: { src: '/icons/urban-forest.svg' },
    },
  ],
  activities: [
    {
      name: 'Tree Preservation',
      icon: { src: '/icons/tree-preservation.svg' },
    },
  ],
};
