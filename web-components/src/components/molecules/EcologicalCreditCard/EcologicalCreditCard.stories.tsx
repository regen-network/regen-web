import { CardMedia } from '@mui/material';
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
    <EcologicalCreditCard {...args}>
      {args.image.src && (
        <CardMedia
          src={args.image.src}
          component="img"
          alt={args.image.alt}
          sx={{
            height: { xs: 216, md: '100%' },
            width: { xs: '100%', md: 400 },
          }}
        />
      )}
    </EcologicalCreditCard>
  </Box>
);

export const Default = Template.bind({});

Default.args = EcologicalCreditCardMock;

Default.argTypes = {};
