import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CardsGridContainer } from './CardsGridContainer';

export default {
  title: 'organisms/CardsGridContainer',
  component: CardsGridContainer,
} as ComponentMeta<typeof CardsGridContainer>;

const cardsMock = [1, 2, 3];

const Template: ComponentStory<typeof CardsGridContainer> = args => (
  <CardsGridContainer {...args}>
    {cardsMock.map(card => (
      <Box
        key={card}
        sx={{
          width: 400,
          height: 400,
          backgroundColor: 'grey.100',
        }}
      />
    ))}
  </CardsGridContainer>
);

export const Default = Template.bind({});

Default.args = {
  cardsCount: 3,
};
