import { Button, FormLabel } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { RadioGroup } from 'formik-mui';

import OnBoardingCard from '../cards/OnBoardingCard';
import { DatePickField } from './DatePickField';
import SelectTextField from './SelectTextField';
import TextField from './TextField';
import Toggle from './Toggle';

export default {
  title: 'Inputs',
  component: TextField,
};

function ToggleVariants(): JSX.Element {
  return (
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
                    active content active content active content active content
                    active content active content active content active content
                    active content
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
                  tooltip="The seller of these credits has chosen to only allow for immediate retiring of credits. These credits cannot be purchased as a tradable asset."
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
  );
}

export const toggle = (): JSX.Element => <ToggleVariants />;

export const datePickField = (): JSX.Element => (
  <Formik
    initialValues={{
      date: '',
    }}
    onSubmit={(values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }}
  >
    {() => {
      return (
        <Form>
          <Field component={DatePickField} name="date" label="Date" />
        </Form>
      );
    }}
  </Formik>
);

export const selectTextField = (): JSX.Element => (
  <Formik
    initialValues={{
      batchDenom: 'option-2',
    }}
    onSubmit={(values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }}
  >
    {() => {
      return (
        <Form>
          <Field
            name="batchDenom"
            label="Choose ecocredits batch"
            description="This is the geographical location where the credits will retire."
            component={SelectTextField}
            options={[
              { label: 'option 1', value: 'option-1' },
              { label: 'option 2', value: 'option-2' },
            ]}
            native={false}
          />
        </Form>
      );
    }}
  </Formik>
);
