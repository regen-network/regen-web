import { ComponentMeta, ComponentStory } from '@storybook/react';

import { QuoteSection } from './QuoteSection';
import { quoteSectionMockData } from './QuoteSection.mock';

export default {
  title: 'organisms/QuoteSection',
  component: QuoteSection,
} as ComponentMeta<typeof QuoteSection>;

const Template: ComponentStory<typeof QuoteSection> = args => (
  <QuoteSection {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...quoteSectionMockData,
};
