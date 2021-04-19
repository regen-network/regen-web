// TODO Update to use formik Field

import React, { useState } from 'react';
import TextField from 'web-components/lib/components/inputs/TextField';
import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components|Inputs',
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

function EditableCheckboxLabel(): JSX.Element {
  const [value, setValue] = useState(true);
  return (
    <CheckboxLabel
      checked={value}
      onChange={e => setValue(e.target.checked)}
      label={text('Label', 'This is a label')}
    />
  );
}

function ToggleTest(): JSX.Element {
  const [value, setValue] = useState(false);
  return (
    <Toggle
      // checked={value}
      onChange={e => setValue(e.target.checked)}
      checkBox
      label={text('Label', 'This is a label')}
      isActive={value}
      activeContent="a bunch of explanation text"
    />
  );
}

export const textField = (): JSX.Element => <EditableTextField />;
export const selectTextField = (): JSX.Element => <EditableSelectTextField />;
export const checkboxLabel = (): JSX.Element => <EditableCheckboxLabel />;
export const toggle = (): JSX.Element => <ToggleTest />;
