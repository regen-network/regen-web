import { Meta, StoryFn } from '@storybook/react';
import startCase from 'lodash/startCase';

import { IucnType } from '../../icons/terrasos/IucnRedCodeIcon';
import TebuCard, { TebuCardProps } from './TebuCard';
import ThreatBody, { ThreatBodyProps } from './TebuCard.ThreatBody';

const Template: StoryFn<TebuCardProps> = args => <TebuCard {...args} />;

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;

export const IucnThreatCategory = Template.bind({});
IucnThreatCategory.args = {
  header: 'Threat Category of Ecosystem',
  headerTooltip: 'Header Tooltip',
  children: (
    <ThreatBody
      title="Critically Endangered"
      description={
        <span>
          Ecosystem with declining areas, severe degradation, and disrupted
          processes facing a <strong>very high collapse risk.</strong>
        </span>
      }
      type={IucnType.IucnCriticallyEndangered}
    />
  ),
  footerLabels: [
    {
      label: 'Factor 1:',
      value: '0.20',
    },
  ],
};

IucnThreatCategory.decorators = [
  Story => (
    <div className="flex flex-wrap gap-20">
      {Object.keys(IucnType).map(key => (
        <TebuCard
          key={key}
          {...(IucnThreatCategory.args as TebuCardProps)}
          children={
            <ThreatBody
              {...(IucnThreatCategory.args?.children?.props as ThreatBodyProps)}
              title={startCase(key.replace('Iucn', ''))}
              type={IucnType[key as keyof typeof IucnType]}
            />
          }
        />
      ))}
    </div>
  ),
];
