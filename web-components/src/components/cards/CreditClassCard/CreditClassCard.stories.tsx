import { Box } from '@mui/system';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CreditClassCard } from './CreditClassCard';
import { creditClassCardMock } from './CreditClassCard.mock';

export default {
  title: 'Cards/CreditClassCard',
  component: CreditClassCard,
} as ComponentMeta<typeof CreditClassCard>;

const Template: ComponentStory<typeof CreditClassCard> = args => (
  <Box>
    <CreditClassCard {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  ...creditClassCardMock,
};

export const TextItem = Template.bind({});
TextItem.args = {
  ...creditClassCardMock,
  methodology: {
    text: creditClassCardMock.methodology?.text,
  },
};
