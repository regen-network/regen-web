import React, { useState } from 'react';
import TextField from 'web-components/lib/components/inputs/TextField';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components|TextField',
  component: TextField,
  decorators: [withKnobs],
};

function EditableTextField(): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <TextField
      required={boolean('Required', true)}
      type={text('Type', 'text')}
      value={value}
      onChange={e => setValue(e.target.value)}
      label={text('Label', 'Label')}
    />
  );
}

export const textField = (): JSX.Element => <EditableTextField />;
