import { Box } from '@mui/system';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EcologicalCreditCard } from './EcologicalCreditCard';
import { EcologicalCreditCardMock } from './EcologicalCreditCard.mock';

export default {
  title: 'molecules/EcologicalCreditCard',
  component: EcologicalCreditCard,
} as ComponentMeta<typeof EcologicalCreditCard>;

const Template: ComponentStory<typeof EcologicalCreditCard> = args => (
  <Box sx={{ maxWidth: 1140 }}>
    <EcologicalCreditCard {...args} />
  </Box>
);

export const Default = Template.bind({});

Default.args = EcologicalCreditCardMock;

Default.argTypes = {};
