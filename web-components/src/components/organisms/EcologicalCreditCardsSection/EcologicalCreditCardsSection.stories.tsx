import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EcologicalCreditCardMock } from '../../molecules/EcologicalCreditCard/EcologicalCreditCard.mock';
import { EcologicalCreditCardsSection } from './EcologicalCreditCardsSection';

export default {
  title: 'EcologicalCreditCardsSection',
  component: EcologicalCreditCardsSection,
} as ComponentMeta<typeof EcologicalCreditCardsSection>;

const Template: ComponentStory<typeof EcologicalCreditCardsSection> = args => (
  <EcologicalCreditCardsSection {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Purchase ecological credits via our concierge sales',
  description:
    'Explore our pipeline of 2+ million credits spanning carbon removal, emissions reductions, and biodiversity.  Check out our 2023 credits look book→',
  cards: [
    { ...EcologicalCreditCardMock },
    { ...EcologicalCreditCardMock, title: 'Kulshan Carbon Trust' },
    { ...EcologicalCreditCardMock, title: 'ERA Brazil' },
  ],
};
