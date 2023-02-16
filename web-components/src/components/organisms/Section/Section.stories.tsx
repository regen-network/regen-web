import { ComponentMeta, ComponentStory } from '@storybook/react';

import EcologicalCreditCard from '../../../components/molecules/EcologicalCreditCard';
import { Section } from './Section';
import { sectionCardsMock } from './Section.mock';

export default {
  title: 'Section',
  component: Section,
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = args => (
  <Section {...args}>
    {sectionCardsMock.map(card => (
      <EcologicalCreditCard
        key={card.title}
        {...card}
        sx={{ mb: { xs: 5, sm: 7.5 } }}
      />
    ))}
  </Section>
);

export const Default = Template.bind({});

Default.args = {
  title: 'Purchase ecological credits via our concierge sales',
  description:
    'Explore our pipeline of 2+ million credits spanning carbon removal, emissions reductions, and biodiversity.  Check out our 2023 credits look book→',
};
