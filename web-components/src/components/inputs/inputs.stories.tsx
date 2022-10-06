import { useEffect, useState } from 'react';
import { Button, FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { RadioGroup } from 'formik-mui';

import OnBoardingCard from '../cards/OnBoardingCard';
import { DatePickField } from './DatePickField';
import { RoleField } from './RoleField';
import TextField from './TextField';
import Toggle from './Toggle';
// import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
// import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';

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

function RoleInput(): JSX.Element {
  const entitiesInit = [
    {
      '@type': 'regen:Organization',
      'schema:legalName': 'Impact Ag',
      id: 1,
    },
    {
      '@type': 'regen:Individual',
      'schema:name': 'Toby Grogan',
      id: 2,
    },
  ];

  const [entities, setEntities] = useState<any>(entitiesInit);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    const entityOptions = entities.map((e: any) => {
      return {
        ...e,
        label: e['schema:name'] || e['schema:legalName'],
      };
    });

    setOptions(entityOptions);
  }, [entities]);

  const saveEntity = (updatedEntity: any): Promise<any> => {
    if (!updatedEntity.id) {
      updatedEntity.id = entities[entities.length - 1].id + 1;
      const newEntities = [
        ...entities,
        { ...updatedEntity, id: updatedEntity.id },
      ];
      setEntities(newEntities);
    } else {
      const updatedEntities = entities.map((existingEntity: any) =>
        existingEntity.id === updatedEntity.id
          ? { ...updatedEntity }
          : existingEntity,
      );
      setEntities(updatedEntities);
    }
    return Promise.resolve(updatedEntity);
  };

  return (
    <Formik
      initialValues={{
        personOrOrgId: '',
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }}
    >
      {() => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                component={RoleField}
                options={options}
                name="personOrOrgId"
                mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
                onSaveOrganization={saveEntity}
                onSaveIndividual={saveEntity}
              />
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
export const rolesInput = (): JSX.Element => <RoleInput />;

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
