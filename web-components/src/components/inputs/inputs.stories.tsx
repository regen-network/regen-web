import React, { useState } from 'react';
import TextField from 'web-components/lib/components/inputs/TextField';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
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

const currencies: Option[] = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function EditableSelectTextField(): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <SelectTextField
      options={currencies}
      required={boolean('Required', true)}
      value={value}
      onChange={e => setValue(e.target.value)}
      label={text('Label', 'Currency')}
    />
  );
}

export const textField = (): JSX.Element => <EditableTextField />;
export const selectTextField = (): JSX.Element => <EditableSelectTextField />;
