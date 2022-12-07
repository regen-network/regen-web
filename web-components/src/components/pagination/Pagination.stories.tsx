import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Pagination } from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = args => (
  <Pagination {...args} />
);

export const Default = Template.bind({});

Default.args = {
  count: 10,
};
