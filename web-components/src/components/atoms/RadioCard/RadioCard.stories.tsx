import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RadioCard } from './RadioCard';
import { radioCardItemsMock } from './RadioCard.mock';

export default {
  title: 'atoms/RadioCard',
  component: RadioCard,
} as ComponentMeta<typeof RadioCard>;

const Template: ComponentStory<typeof RadioCard> = args => (
  <Box sx={{ width: 560, p: 10 }}>
    <RadioCard {...args} />
  </Box>
);

export const Default = Template.bind({});

Default.args = {
  label: 'Profile type',
  name: 'profile-type',
  items: radioCardItemsMock,
  selectedValue: radioCardItemsMock[0].value,
};

Default.argTypes = {
  selectedValue: {
    control: { type: 'radio' },
    options: radioCardItemsMock.map(item => item.value),
  },
};
