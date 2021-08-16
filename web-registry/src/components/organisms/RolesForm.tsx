import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import cx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { RoleField } from 'web-components/lib/components/inputs/RoleField';
import Title from 'web-components/lib/components/title';

interface RolesFormProps {
  submit: (values: RolesValues) => Promise<void>;
  initialValues?: RolesValues;
}

export interface RolesValues {
  'http://regen.network/landOwner': string;
  'http://regen.network/landSteward': string;
  'http://regen.network/projectDeveloper': string;
  'http://regen.network/projectOriginator': string;
}

export interface RolesValuesErrors {
  'http://regen.network/landOwner': string;
  'http://regen.network/landSteward': string;
  'http://regen.network/projectDeveloper': string;
  'http://regen.network/projectOriginator': string;
}

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
  },
  description: {
    marginBottom: 0,
    fontSize: theme.typography.pxToRem(16),
  },
  field: {
    marginBottom: theme.spacing(12),
  },
  error: {
    marginTop: 0,
  },
}));

//TODO: delete
const entitiesInit = [
  { legalName: 'Impact Ag', id: 1 },
  { name: 'Toby Grogan', id: 2 },
];

const RolesForm: React.FC<RolesFormProps> = ({ submit, initialValues }) => {
  const [entities, setEntities] = useState<any>(entitiesInit);
  const [options, setOptions] = useState<any>([]);
  const styles = useStyles();

  useEffect(() => {
    const entityOptions = entities.map((e: any) => {
      return {
        ...e,
        label: e.name || e.legalName,
        type: e.legalName ? 'organization' : 'individual',
      };
    });

    setOptions(entityOptions);
  }, [entities]);

  const saveEntity = (updatedEntity: any): Promise<any> => {
    if (!updatedEntity.id) {
      updatedEntity.id = entities[entities.length - 1].id + 1;
      const newEntities = [...entities, { ...updatedEntity, id: updatedEntity.id }];
      setEntities(newEntities);
    } else {
      const updatedEntities = entities.map((exisitingEntity: any) =>
        exisitingEntity.id === updatedEntity.id ? { ...updatedEntity } : exisitingEntity,
      );
      setEntities(updatedEntities);
    }
    return Promise.resolve(updatedEntity);
  };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'http://regen.network/landOwner': initialValues?.['http://regen.network/landOwner'] || '',
            'http://regen.network/landSteward': initialValues?.['http://regen.network/landSteward'] || '',
            'http://regen.network/projectDeveloper':
              initialValues?.['http://regen.network/projectDeveloper'] || '',
            'http://regen.network/projectOriginator':
              initialValues?.['http://regen.network/projectOriginator'] || '',
          }
        }
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await submit(values);
            setSubmitting(false);
          } catch (e) {
            setSubmitting(false);
          }
        }}
      >
        {({ submitForm, isValid, isSubmitting }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Title className={cx(styles.title, styles.field)} variant="h6">
                  You must add one of the following roles.
                </Title>
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Land Owner"
                  optional
                  description="The individual or organization that owns this land."
                  name="['http://regen.network/landOwner']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveEntity}
                  onSaveIndividual={saveEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Land Steward"
                  optional
                  description="The individual or organization that is performing the work on the ground. This can be a farmer, rancher, conservationist, forester, fisherman, etc."
                  name="['http://regen.network/landSteward']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveEntity}
                  onSaveIndividual={saveEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Project Developer"
                  optional
                  description="The individual or organization that is in charge of managing the project and is the main point of contact with Regen Registry. "
                  name="['http://regen.network/projectDeveloper']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveEntity}
                  onSaveIndividual={saveEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Project Originator"
                  optional
                  description="The individual or organization that helps initiate the project."
                  name="['http://regen.network/projectOriginator']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveEntity}
                  onSaveIndividual={saveEntity}
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
                hideProgress={false} // TODO
                saveDisabled={!isValid || isSubmitting}
                percentComplete={0} // TODO
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RolesForm };
