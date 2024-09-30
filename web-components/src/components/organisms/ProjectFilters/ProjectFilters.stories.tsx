import { Meta, StoryFn } from '@storybook/react';

import ProjectFilters from './ProjectFilters';

export default {
  title: 'Organisms/ProjectFilters',
  component: ProjectFilters,
} as Meta;

const Template: StoryFn = args => <ProjectFilters {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithCustomProps = Template.bind({});
WithCustomProps.args = {};
