import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ShareSection } from './ShareSection';
import { ShareSectionItemsMock } from './ShareSection.mock';

export default {
  title: 'ShareSection',
  component: ShareSection,
} as ComponentMeta<typeof ShareSection>;

const Template: ComponentStory<typeof ShareSection> = args => (
  <ShareSection sx={{ maxWidth: 300 }} {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Share',
  items: ShareSectionItemsMock,
};

Default.argTypes = {};
