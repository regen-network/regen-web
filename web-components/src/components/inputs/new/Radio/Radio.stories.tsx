import { ComponentMeta, ComponentStory } from '@storybook/react';

import { VideoInput } from '../VideoInput/VideoInput';
import { Radio } from './Radio';
import { RADIO_PREFERABLE } from './Radio.mock';

export default {
  title: 'atoms/inputs/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = args => (
  <Radio {...args}>
    <VideoInput
      setError={() => {}}
      urlNotValidText="Invalid URL"
      loadingText="Loading"
      addPlaceholder="Add a video"
    />
  </Radio>
);

export const Default = Template.bind({});

Default.args = {
  name: 'radio',
  label: 'Add a video',
  optional: RADIO_PREFERABLE,
  value: 'video',
  helperText: 'Copy and paste an embeddable video url.',
  selectedValue: 'video',
};
