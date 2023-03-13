import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CancelButtonFooter } from './CancelButtonFooter';

export default {
  title: 'organisms/CancelButtonFooter',
  component: CancelButtonFooter,
  argTypes: {
    onClick: { action: 'clicked' },
    onCancel: { action: 'cancelled' },
  },
} as ComponentMeta<typeof CancelButtonFooter>;

const Template: ComponentStory<typeof CancelButtonFooter> = args => (
  <CancelButtonFooter {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'save',
};
