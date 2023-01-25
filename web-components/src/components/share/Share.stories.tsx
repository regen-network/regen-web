import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Share } from './Share';

export default {
  title: 'Share',
  component: Share,
} as ComponentMeta<typeof Share>;

const Template: ComponentStory<typeof Share> = args => <Share {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Share',
};

Default.argTypes = {};
