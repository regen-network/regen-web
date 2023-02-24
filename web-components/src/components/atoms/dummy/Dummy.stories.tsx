import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dummy } from './Dummy';

export default {
  title: 'atoms/Dummy',
  component: Dummy,
} as ComponentMeta<typeof Dummy>;

const Template: ComponentStory<typeof Dummy> = args => <Dummy {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Dummy',
};

Default.argTypes = {
  variant: {
    control: 'radio',
    options: ['small', 'big'],
    defaultValue: 'small',
  },
};
