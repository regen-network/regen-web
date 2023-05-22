import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CredibilityCard } from './CredibilityCard';

export default {
  title: 'Cards/CredibilityCard',
  component: CredibilityCard,
} as ComponentMeta<typeof CredibilityCard>;

const Template: ComponentStory<typeof CredibilityCard> = args => {
  return <CredibilityCard {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: 'Monitored & verified',
  descriptionRaw:
    'The results are quantified via monitoring rounds and the results verified by a third party.',
  icon: '/Monitoring Ecological Impact.svg',
  claims: [
    { description: 'Monitored by stratified random sampling' },
    { description: 'Monitored every 2 years' },
    { description: 'Accredited laboratory for soil samples analysis' },
    { description: 'Independently verified by a third party' },
  ],
};
