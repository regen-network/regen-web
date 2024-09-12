import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio } from '../Radio/Radio';
import { RADIO_PREFERABLE } from '../Radio/Radio.mock';
import { VideoInput } from '../VideoInput/VideoInput';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'atoms/inputs/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = args => {
  const selectedValue = 'video';

  return (
    <RadioGroup sx={{ maxWidth: 500 }} {...args}>
      <>
        <Radio
          name={'radio-story'}
          label={'Add a video'}
          optional={RADIO_PREFERABLE}
          value={'video'}
          helperText={'Copy and paste an embeddable video url.'}
          selectedValue={selectedValue}
          sx={{ mt: 5.25 }}
        >
          <VideoInput
            setError={() => {}}
            urlNotValidText="Invalid URL"
            loadingText="Loading"
            addPlaceholder="Add a video"
          />
        </Radio>
        <Radio
          name={'radio-story'}
          label={'Add a photo'}
          value={'photo'}
          selectedValue={selectedValue}
          helperText={
            'If you don’t have a video for this project, you can add a photo to enhance the story section of your project page.'
          }
          sx={{ mt: 2.5 }}
        />
      </>
    </RadioGroup>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Story video or photo',
  optional: true,
};
