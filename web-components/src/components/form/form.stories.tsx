import React, { useState } from 'react';
import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
// import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import LoginForm from 'web-components/lib/components/form/LoginForm';

import Toggle from './Toggle';
import OnBoardingCard from '../cards/OnBoardingCard';
import { FormLabel } from '@material-ui/core';

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
              active content active content active content active content active content active content active
              content active content active content
            </div>
          }
          description="description lorem ipsum"
        />
        <Toggle
          onChange={e => setValue4(e.target.checked)}
          checkBox
          name="disabled"
          label="Disabled Toggle"
          isActive={false}
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
        <Toggle
          disabled
          onChange={e => setValueRadio(e.target.name)}
          name="disabled"
          label="Disabled"
          description="description disabled lorem ipsum"
          isActive={radioValue === 'disabled'}
        />
      </OnBoardingCard>
    </OnBoardingSection>
  );
}

export const toggle = (): JSX.Element => <ToggleVariants />;
