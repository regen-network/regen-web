import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CarouselSection } from './CarouselSection';
import { carouselItemsMock } from './CarouselSection.mock';

export default {
  title: 'organisms/CarouselSection',
  component: CarouselSection,
} as ComponentMeta<typeof CarouselSection>;

const Template: ComponentStory<typeof CarouselSection> = args => (
  <CarouselSection {...args}>
    {carouselItemsMock.map(item => (
      <Box key={item.name}>
        <img src={item.url} alt={item.name} />
      </Box>
    ))}
  </CarouselSection>
);

export const Default = Template.bind({});

Default.args = {
  title: 'Partnering with leading brands around the world',
};
