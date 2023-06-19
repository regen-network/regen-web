import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProjectTags } from './ProjectTags';

export default {
  title: 'organisms/ProjectTags',
  component: ProjectTags,
} as ComponentMeta<typeof ProjectTags>;

const Template: ComponentStory<typeof ProjectTags> = args => (
  <ProjectTags {...args} />
);

export const Default = Template.bind({});

Default.args = {
  activity: {
    name: 'Planned holistic sheep grazing',
    icon: { src: '/tag/forest.svg' },
  },
  ecosystem: {
    name: 'Grasslands',
    icon: { src: '/tag/forest.svg' },
  },
};
