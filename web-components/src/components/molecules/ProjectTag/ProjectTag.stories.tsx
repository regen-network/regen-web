import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProjectTag } from './ProjectTag';

export default {
  title: 'molecules/ProjectTag',
  component: ProjectTag,
} as ComponentMeta<typeof ProjectTag>;

const Template: ComponentStory<typeof ProjectTag> = args => (
  <ProjectTag {...args} />
);

export const Default = Template.bind({});

Default.args = {
  tag: {
    name: 'Planned holistic sheep grazing',
    icon: { src: '/tag/forest.svg' },
  },
};
