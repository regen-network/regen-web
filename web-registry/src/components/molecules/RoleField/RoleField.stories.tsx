import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';

import { RoleField } from './RoleField';

export default {
  title: 'Registry/Molecules/Role Field',
  component: RoleField,
};

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

export const rolesInput = (): JSX.Element => <RoleInput />;
