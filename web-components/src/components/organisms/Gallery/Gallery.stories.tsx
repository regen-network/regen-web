import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Gallery } from './Gallery';

export default {
  title: 'atoms/Gallery',
  component: Gallery,
} as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = args => <Gallery {...args} />;

export const Default = Template.bind({});

Default.args = {};
