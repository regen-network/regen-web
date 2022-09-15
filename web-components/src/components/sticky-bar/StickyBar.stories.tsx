import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ContainedButton from '../buttons/ContainedButton';
import OutlinedButton from '../buttons/OutlinedButton';
import { StickyBar } from './StickyBar';

export default {
  title: 'StickyBar',
  component: StickyBar,
} as ComponentMeta<typeof StickyBar>;

const Template: ComponentStory<typeof StickyBar> = args => (
  <Box sx={{ height: '2000px' }}>
    <StickyBar {...args}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <OutlinedButton sx={{ mr: 5 }}>{'SELL'}</OutlinedButton>
        <ContainedButton>{'BUY CREDITS'}</ContainedButton>
      </Box>
    </StickyBar>
  </Box>
);

export const Default = Template.bind({});

Default.args = {};

Default.argTypes = {};
