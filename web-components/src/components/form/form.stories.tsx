import React, { useState } from 'react';
import { FormLabel, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
// import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import LoginForm from 'web-components/lib/components/form/LoginForm';

import Toggle from './Toggle';
import OnBoardingCard from '../cards/OnBoardingCard';

export default {
  title: 'Components|Forms',
  component: LoginForm,
};

const submit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};

export const userProfile = (): JSX.Element => (
  <OnBoardingSection formContainer title="User Profile">
    <UserProfileForm apiUrl="" submit={() => null} />
  </OnBoardingSection>
);

// export const organizationProfile = (): JSX.Element => (
//   <OnBoardingSection title="Organization Profile">
//     <OrganizationProfileForm
//       apiUrl=""
//       mapToken={process.env.STORYBOOK_MAPBOX_TOKEN || process.env.REACT_APP_MAPBOX_TOKEN}
//       submit={() => null}
//       goBack={() => null}
//       skip={() => null}
//     />
//   </OnBoardingSection>
// );

export const signUpForm = (): JSX.Element => (
  <LoginForm
    submit={submit}
    termsLink="https://www.regen.network/terms-service/"
    loginFromSignup={() => null}
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);

export const loginForm = (): JSX.Element => (
  <LoginForm
    submit={submit}
    termsLink="https://www.regen.network/terms-service/"
    signupFromLogin="/"
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);

function ToggleVariants(): JSX.Element {
  const [radioValue, setValueRadio] = useState('');

  return (
    <OnBoardingSection title="Toggle Variants" formContainer>
      <Formik
        initialValues={{
          value: false,
          value2: false,
          value3: false,
          value4: false,
          radioValue: '',
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleChange, values }) => {
          return (
            <Form>
              <OnBoardingCard>
                <Field
                  label="No-till"
                  checkBox
                  component={Toggle}
                  onChange={handleChange}
                  name="value"
                  isActive={values['value']}
                  description="Growing crops or pasture without disturbing the soil through tillage."
                />
                <Field
                  label="Toggle with active content"
                  checkBox
                  component={Toggle}
                  onChange={handleChange}
                  name="value2"
                  isActive={values['value2']}
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
                {/* <Toggle
                  label="Toggle with active content"
                  checkBox
                  onChange={formik.handleChange}
                  name="value2"
                  isActive={formik.values['value2']}
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
                  checkBox
                  label="Toggle with description and active content"
                  onChange={formik.handleChange}
                  name="value3"
                  isActive={formik.values['value3']}
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
                  checkBox
                  label="Toggle with description, content, and active content"
                  onChange={formik.handleChange}
                  name="value4"
                  isActive={formik.values['value4']}
                  tooltip="and also a tooltip"
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
                  description="description lorem ipsum"
                />
                <Toggle
                  checkBox
                  name="disabled"
                  label="Disabled Toggle"
                  onChange={formik.handleChange}
                  isActive={false}
                  disabled
                  tooltip="with a tooltip"
                  description="description disabled lorem ipsum"
                /> */}
              </OnBoardingCard>
              {/* <OnBoardingCard>
                <FormLabel component="legend">Blue or Green?</FormLabel>
                <Toggle
                  label="Green"
                  name="green"
                  onChange={e => formik.handleChange('radioValue')(e)}
                  // isActive={radioValue === 'green'}
                  // onChange={formik.handleChange}
                  isActive={formik.values['radioValue'] === 'green'}
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
                  onChange={e => formik.handleChange('radioValue')(e)}
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
                <Toggle
                  disabled
                  onChange={e => setValueRadio(e.target.name)}
                  name="disabled"
                  label="Disabled"
                  description="description disabled lorem ipsum"
                  isActive={radioValue === 'disabled'}
                />
              </OnBoardingCard> */}
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
