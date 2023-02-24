import { ComponentMeta, ComponentStory } from '@storybook/react';

import EcologicalCreditCard from '../../../components/molecules/EcologicalCreditCard';
import { Section } from './Section';
import { sectionCardsMock } from './Section.mock';

export default {
  title: 'organisms/Section',
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
  backgroundImage:
    'https://cdn.sanity.io/images/jm12rn9t/staging/6d6768b1e969a266bada5905ab4be282a069855a-589x589.svg?w=2000&fit=max&auto=format',
};
