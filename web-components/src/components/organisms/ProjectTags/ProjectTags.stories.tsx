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
export const OneAndThree = Template.bind({});
export const OneAndOne = Template.bind({});

Default.args = {
  activities: [
    {
      name: 'Planned holistic sheep grazing 1',
      icon: { src: '/tag/forest.svg' },
    },
    {
      name: 'Planned holistic sheep grazing 2',
      icon: { src: '/tag/forest.svg' },
    },
  ],
  ecosystems: [
    {
      name: 'Grasslands 1',
      icon: { src: '/tag/forest.svg' },
    },
    {
      name: 'Grasslands 2',
      icon: { src: '/tag/forest.svg' },
    },
    {
      name: 'Grasslands 3',
      icon: { src: '/tag/forest.svg' },
    },
  ],
  activitiesLabel: 'Project Activity',
  ecosystemLabel: 'Ecosystem',
};

OneAndThree.args = {
  activities: [
    {
      name: 'Planned holistic sheep grazing 1',
      icon: { src: '/tag/forest.svg' },
    },
  ],
  ecosystems: [
    {
      name: 'Grasslands 1',
      icon: { src: '/tag/forest.svg' },
    },
    {
      name: 'Grasslands 2',
      icon: { src: '/tag/forest.svg' },
    },
    {
      name: 'Grasslands 3',
      icon: { src: '/tag/forest.svg' },
    },
  ],
  activitiesLabel: 'Project Activity',
  ecosystemLabel: 'Ecosystem',
};

OneAndOne.args = {
  activities: [
    {
      name: 'Planned holistic sheep grazing 1',
      icon: { src: '/tag/forest.svg' },
    },
  ],
  ecosystems: [
    {
      name: 'Grasslands 1',
      icon: { src: '/tag/forest.svg' },
    },
  ],
  activitiesLabel: 'Project Activity',
  ecosystemLabel: 'Ecosystem',
};
