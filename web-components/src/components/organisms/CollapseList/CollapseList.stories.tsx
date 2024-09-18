import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CollapseList } from './CollapseList';

export default {
  title: 'organisms/CollapseList',
  component: CollapseList,
} as ComponentMeta<typeof CollapseList>;

const Template: ComponentStory<typeof CollapseList> = args => (
  <Box pl={5}>
    <CollapseList {...args} />
  </Box>
);

export const Default = Template.bind({});

Default.args = {
  items: [...Array(10).keys()].map(k => <div key={k}>{k} </div>),
  seeMoreText: '+ see more',
  seeLessText: '- see less',
};
