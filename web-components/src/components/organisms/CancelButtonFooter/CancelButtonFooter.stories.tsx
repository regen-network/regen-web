import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CancelButtonFooter } from './CancelButtonFooter';

export default {
  title: 'organisms/CancelButtonFooter',
  component: CancelButtonFooter,
} as ComponentMeta<typeof CancelButtonFooter>;

const Template: ComponentStory<typeof CancelButtonFooter> = args => (
  <CancelButtonFooter {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onCancel: () => alert('cancel'),
  label: 'save',
  onClick: () => alert('save'),
};
