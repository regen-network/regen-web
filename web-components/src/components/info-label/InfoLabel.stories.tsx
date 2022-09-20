import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArrowDownIcon from '../icons/ArrowDownIcon';
import { InfoLabel } from './InfoLabel';
import { InfoLabelVariant } from './InfoLabel.types';

export default {
  title: 'InfoLabel',
  component: InfoLabel,
} as ComponentMeta<typeof InfoLabel>;

const Template: ComponentStory<typeof InfoLabel> = args => (
  <InfoLabel {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'Retired',
  icon: (
    <ArrowDownIcon
      color="#8F8F8F"
      sx={{ display: 'flex', alignItems: 'center' }}
    />
  ),
};

Default.argTypes = {
  variant: {
    control: 'radio',
    options: ['default', 'success'] as InfoLabelVariant[],
    defaultValue: 'default',
  },
};
