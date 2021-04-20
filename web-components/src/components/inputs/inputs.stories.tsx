// TODO Update to use formik Field

import React, { useState } from 'react';
import TextField from 'web-components/lib/components/inputs/TextField';
// import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
// import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import Toggle from './Toggle';
import { withKnobs, text } from '@storybook/addon-knobs';
import OnBoardingSection from '../section/OnBoardingSection';
import OnBoardingCard from '../cards/OnBoardingCard';
import { RadioGroup, FormLabel } from '@material-ui/core';

export default {
  title: 'Components|Inputs',
  component: TextField,
  decorators: [withKnobs],
};

// function EditableTextField(): JSX.Element {
//   const [value, setValue] = useState('');
//   return (
//     <TextField
//       required={boolean('Required', true)}
//       type={text('Type', 'text')}
//       value={value}
//       onChange={e => setValue(e.target.value)}
//       label={text('Label', 'Label')}
//     />
//   );
// }

// const currencies: Option[] = [
//   {
//     value: 'USD',
//     label: '$',
//   },
//   {
//     value: 'EUR',
//     label: '€',
//   },
//   {
//     value: 'BTC',
//     label: '฿',
//   },
//   {
//     value: 'JPY',
//     label: '¥',
//   },
// ];

// function EditableSelectTextField(): JSX.Element {
//   const [value, setValue] = useState('');
//   return (
//     <SelectTextField
//       options={currencies}
//       required={boolean('Required', true)}
//       value={value}
//       onChange={e => setValue(e.target.value)}
//       label={text('Label', 'Currency')}
//     />
//   );
// }

// function EditableCheckboxLabel(): JSX.Element {
//   const [value, setValue] = useState(true);
//   return (
//     <CheckboxLabel
//       checked={value}
//       onChange={e => setValue(e.target.checked)}
//       label={text('Label', 'This is a label')}
//     />
//   );
// }

function ToggleVariants(): JSX.Element {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);
  const [radioValue, setValueRadio] = useState('');
  return (
    <OnBoardingSection title="Toggle Variants" formContainer>
      <OnBoardingCard>
        <Toggle
          onChange={e => setValue(e.target.checked)}
          checkBox
          name="1"
          label="No-till"
          isActive={value}
          description="Growing crops or pasture without disturbing the soil through tillage."
        />
        <Toggle
          onChange={e => setValue2(e.target.checked)}
          checkBox
          name="2"
          label="Toggle with active content"
          isActive={value2}
          activeContent={
            <div
              style={{
                height: 99,
                background: 'orange',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              SO NARANJA!!!
            </div>
          }
        />
        <Toggle
          onChange={e => setValue3(e.target.checked)}
          checkBox
          name="3"
          label="Toggle with description and active content"
          isActive={value3}
          activeContent={
            <div
              style={{
                height: 99,
                background: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              SO ROJO!!!
            </div>
          }
          description="select to see red"
        />
        <Toggle
          onChange={e => setValue4(e.target.checked)}
          checkBox
          name="4"
          label="Toggle with description, content, and active content"
          isActive={value4}
          tooltip="and also a tooltip"
          content={
            <div
              style={{
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'lightgrey',
              }}
            >
              content content content content content
            </div>
          }
          activeContent={
            <div
              style={{
                height: 199,
                background: 'grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
              }}
            >
              active content active content active content active content active content active content active
              content active content active content
            </div>
          }
          description="description lorem ipsum"
        />
        <Toggle
          onChange={e => setValue4(e.target.checked)}
          checkBox
          name="4"
          label="Disabled Toggle"
          isActive={value4}
          disabled
          tooltip="with a tooltip"
          description="description disabled lorem ipsum"
        />
      </OnBoardingCard>
      <OnBoardingCard>
        <FormLabel component="legend">Blue or Green?</FormLabel>
        <Toggle
          onChange={e => setValueRadio(e.target.name)}
          name="green"
          label="Green"
          isActive={radioValue === 'green'}
          activeContent={
            <div
              style={{
                height: 79,
                background: 'green',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              SO VERDE!!!
            </div>
          }
        />
        <Toggle
          onChange={e => setValueRadio(e.target.name)}
          name="blue"
          label="Blue"
          description="description lorem ipsum"
          tooltip="with optional info tooltip"
          isActive={radioValue === 'blue'}
          activeContent={
            <div
              style={{
                height: 79,
                background: 'blue',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              SO AZUL!!!
            </div>
          }
        />
      </OnBoardingCard>
    </OnBoardingSection>
  );
}

// export const textField = (): JSX.Element => <EditableTextField />;
// export const selectTextField = (): JSX.Element => <EditableSelectTextField />;
// export const checkboxLabel = (): JSX.Element => <EditableCheckboxLabel />;
export const toggle = (): JSX.Element => <ToggleVariants />;
