import { Meta, StoryFn } from '@storybook/react';
import startCase from 'lodash/startCase';

import { SocialCulturalValueType } from '../../icons/terrasos/SocialCulturalValueIcon';
import TebuCard, { TebuCardProps } from './TebuCard';
import SocialCulturalBody, {
  SocialCulturalBodyProps,
} from './TebuCard.SocialCulturalBody';

const Template: StoryFn<TebuCardProps> = args => <TebuCard {...args} />;

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;

// SocialCulturalBody
export const SocialCulturalBodyStory = Template.bind({});
SocialCulturalBodyStory.args = {
  header: 'Ecological Connectivity Level',
  headerTooltip: 'Header Tooltip',
  children: (
    <SocialCulturalBody
      title="Highly Significant"
      description={
        <span>
          The project shows a <strong>highly significant contribution</strong>{' '}
          to the maintenance or restoration of landscape connectivity at a
          regional scale.
        </span>
      }
      type={SocialCulturalValueType.High}
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

SocialCulturalBodyStory.decorators = [
  () => {
    return (
      <div className="flex flex-wrap gap-20">
        {Object.keys(SocialCulturalValueType).map(key => (
          <TebuCard
            {...(SocialCulturalBodyStory.args as TebuCardProps)}
            children={
              <SocialCulturalBody
                {...(SocialCulturalBodyStory.args?.children
                  ?.props as SocialCulturalBodyProps)}
                title={startCase(key)}
                type={
                  SocialCulturalValueType[
                    key as keyof typeof SocialCulturalValueType
                  ]
                }
              />
            }
          />
        ))}
      </div>
    );
  },
];
