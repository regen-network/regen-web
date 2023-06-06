import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GradientQuoteSection } from './GradientQuoteSection';
import { quoteSectionMockData } from './GradientQuoteSection.mock';

export default {
  title: 'organisms/GradientQuoteSection',
  component: GradientQuoteSection,
} as ComponentMeta<typeof GradientQuoteSection>;

const Template: ComponentStory<typeof GradientQuoteSection> = args => (
  <GradientQuoteSection {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...quoteSectionMockData,
};
