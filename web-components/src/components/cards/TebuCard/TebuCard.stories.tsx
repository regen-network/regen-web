import React from 'react';
import { Meta, Story } from '@storybook/react';

import { IucnType } from '../../icons/terrasos/IucnRedCodeIcon';
import { Level } from '../../icons/terrasos/EcologicalConnectivityLevelIcon';
import TebuCard, { TebuCardProps } from './TebuCard';
import ConnectivityBody from './TebuCard.ConnectivityBody';
import ThreatBody from './TebuCard.ThreatBody';

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;

const Template: Story<TebuCardProps> = args => <TebuCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: 'Threat Category of Ecosystem',
  headerTooltip: 'Header Tooltip',
  children: <div>Children</div>,
  footerLabels: [
    {
      label: 'Factor 1:',
      value: '0.20',
    },
    {
      label: 'Label 2:',
      value: 'Value 2',
    },
  ],
};

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
      iucnType={IucnType.IucnCriticallyEndangered}
    />
  ),
  footerLabels: [
    {
      label: 'Factor 1:',
      value: '0.20',
    },
    {
      label: 'Label 2:',
      value: 'Value 2',
    },
  ],
};

// ConnectivityBody
export const ConnectivityBodyStory = Template.bind({});
ConnectivityBodyStory.args = {
  header: 'Ecological Connectivity Level',
  headerTooltip: 'Header Tooltip',
  children: (
    <ConnectivityBody
      title="High Connectivity"
      description={
        <span>
          Ecosystem with high connectivity, supporting the movement of species
          and genetic flow.
        </span>
      }
      level={Level.HighlySignificant}
    />
  ),
  footerLabels: [
    {
      label: 'Factor 1:',
      value: '0.20',
    },
    {
      label: 'Label 2:',
      value: 'Value 2',
    },
  ],
};