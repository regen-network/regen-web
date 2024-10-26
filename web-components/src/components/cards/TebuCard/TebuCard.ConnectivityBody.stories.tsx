import { Meta, StoryFn } from '@storybook/react';
import startCase from 'lodash/startCase';

import { Level } from '../../icons/terrasos/EcologicalConnectivityLevelIcon';
import TebuCard, { TebuCardProps } from './TebuCard';
import ConnectivityBody, {
  ConnectivityBodyProps,
} from './TebuCard.ConnectivityBody';

const Template: StoryFn<TebuCardProps> = args => <TebuCard {...args} />;

export default {
  title: 'Terrasos/Cards/TebuCard',
  component: TebuCard,
} as Meta;

// ConnectivityBody
export const ConnectivityBodyStory = Template.bind({});
ConnectivityBodyStory.args = {
  header: 'Ecological Connectivity Level',
  headerTooltip: 'Header Tooltip',
  children: (
    <ConnectivityBody
      title="Highly Significant"
      description={
        <span>
          The project shows a <strong>highly significant contribution</strong>{' '}
          to the maintenance or restoration of landscape connectivity at a
          regional scale.
        </span>
      }
      type={Level.HighlySignificant}
    />
  ),
  footerLabels: [
    {
      label: 'Factor:',
      value: '0.20',
    },
  ],
};

ConnectivityBodyStory.decorators = [
  () => {
    return (
      <div className="flex flex-wrap gap-20">
        {Object.keys(Level).map(key => (
          <TebuCard
            {...(ConnectivityBodyStory.args as TebuCardProps)}
            children={
              <ConnectivityBody
                {...(ConnectivityBodyStory.args?.children
                  ?.props as ConnectivityBodyProps)}
                title={startCase(key)}
                type={Level[key as keyof typeof Level]}
              />
            }
          />
        ))}
      </div>
    );
  },
];
