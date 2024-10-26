import { Meta, Story } from '@storybook/react';

import TebuCard, { TebuCardProps } from './TebuCard';

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;

const Template: Story<TebuCardProps> = args => <TebuCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: 'Threat Category of Ecosystem',
  headerTooltip: 'Header Tooltip',
  children: <div>Children</div>,
  footerLabels: [
    {
      label: 'Factor 1:',
      value: '0.20',
    },
    {
      label: 'Label 2:',
      value: 'Value 2',
    },
  ],
};
