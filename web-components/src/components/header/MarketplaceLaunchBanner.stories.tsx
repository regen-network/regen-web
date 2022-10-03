import { ComponentMeta, ComponentStory } from '@storybook/react';

import MarketplaceLaunchBanner from './MarketplaceLaunchBanner';

export default {
  title: 'MarketplaceLaunchBanner',
  component: MarketplaceLaunchBanner,
} as ComponentMeta<typeof MarketplaceLaunchBanner>;

const Template: ComponentStory<typeof MarketplaceLaunchBanner> = args => <MarketplaceLaunchBanner {...args}/>;

export const Default = Template.bind({});

Default.args = {};
Default.argTypes = {};
