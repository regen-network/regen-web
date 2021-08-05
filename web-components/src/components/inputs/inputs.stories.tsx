import React from 'react';
import { FormLabel, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import { withKnobs } from '@storybook/addon-knobs';

import Toggle from './Toggle';
import TextField from './TextField';
import { RoleField } from './RoleField';
import OnBoardingCard from '../cards/OnBoardingCard';
import OnBoardingSection from '../section/OnBoardingSection';
// import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
// import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
// import { withKnobs, text, boolean } from '@storybook/addon-knobs';

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
//
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
//
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
//
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
//
// export const textField = (): JSX.Element => <EditableTextField />;
// export const selectTextField = (): JSX.Element => <EditableSelectTextField />;
// export const checkboxLabel = (): JSX.Element => <EditableCheckboxLabel />;

function ToggleVariants(): JSX.Element {
  return (
    <OnBoardingSection title="Toggle Variants" formContainer>
      <Formik
        initialValues={{
          value: false,
          value2: false,
          value3: false,
          radioValue: '',
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.resetForm();
        }}
      >
        {({ handleChange, values }) => {
          return (
            <Form>
              <OnBoardingCard>
                <Field
                  label="No-till"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="value"
                  checked={values['value']}
                  description="Growing crops or pasture without disturbing the soil through tillage."
                />
                <Field
                  label="Toggle with active content, and a long label. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="value2"
                  checked={values['value2']}
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
                <Field
                  component={Toggle}
                  type="checkbox"
                  label="Toggle with description, content, and active content"
                  onChange={handleChange}
                  name="value3"
                  checked={values['value3']}
                  tooltip="And also a tooltip. Lorem ipsum dolor sit amet, consectetur."
                  content={
                    <div
                      style={{
                        height: 30,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'lightgrey',
                        padding: 16,
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
                      active content active content active content active content active content active
                      content active content active content active content
                    </div>
                  }
                  description="description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  "
                />
                <Field
                  component={Toggle}
                  type="checkbox"
                  name="disabled"
                  label="Disabled Toggle"
                  onChange={handleChange}
                  checked={false}
                  disabled
                  tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  description="description disabled lorem ipsum"
                />
              </OnBoardingCard>
              <OnBoardingCard>
                <FormLabel component="legend">Blue or Green?</FormLabel>
                <Field component={RadioGroup} name="radioValue">
                  <Field
                    component={Toggle}
                    label="Green"
                    value="green"
                    type="radio"
                    checked={values['radioValue'] === 'green'}
                    description="description"
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
                  <Field
                    component={Toggle}
                    type="radio"
                    value="blue"
                    label="Blue, with long label. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
                    description="description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    tooltip="With optional info tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    checked={values['radioValue'] === 'blue'}
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
                  <Field
                    component={Toggle}
                    disabled
                    type="radio"
                    value="disabled"
                    label="Disabled"
                    description="description disabled lorem ipsum"
                    checked={values['radioValue'] === 'disabled'}
                  />
                </Field>
              </OnBoardingCard>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </OnBoardingSection>
  );
}
function RoleInput(): JSX.Element {
  // const entityGroups = [
  //   { organizations: [{ name: 'Impact Ag', id: 1 }] },
  //   { individuals: [{ name: 'Toby Grogan', id: 2 }] },
  // ];

  const entities = [
    { name: 'Impact Ag', id: 1, type: 'Organization' },
    { name: 'Toby Grogan', id: 2, type: 'Individual' },
  ];

  return (
    <OnBoardingSection title="Role form" formContainer>
      <Formik
        initialValues={{
          role: '',
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.resetForm();
        }}
      >
        {({ handleChange, values }) => {
          console.log(values);
          return (
            <Form>
              <OnBoardingCard>
                <Field
                  label="Role"
                  component={RoleField}
                  options={entities}
                  getOptionLabel={entity => entity.name}
                  name="role"
                />
              </OnBoardingCard>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </OnBoardingSection>
  );
}

export const toggle = (): JSX.Element => <ToggleVariants />;
export const rolesInput = (): JSX.Element => <RoleInput />;
