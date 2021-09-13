import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import cx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { RoleField } from 'web-components/lib/components/inputs/RoleField';
import { IndividualFormValues } from 'web-components/lib/components/modal/IndividualModal';
import { OrganizationFormValues } from 'web-components/lib/components/modal/OrganizationModal';

import Title from 'web-components/lib/components/title';

import {
  useReallyCreateUserMutation,
  useReallyCreateOrganizationMutation,
  useUpdateUserByIdMutation,
  useUpdatePartyByIdMutation,
  useUpdateOrganizationByIdMutation,
  useUpdateAddressByIdMutation,
} from '../../generated/graphql';

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
    fontFamily: theme.typography.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
  error: {
    marginTop: 0,
  },
}));

type FormValues = IndividualFormValues | OrganizationFormValues;
function isIndividual(e: FormValues): e is IndividualFormValues {
  if (e['@type'] === 'http://regen.network/Individual') {
    return true;
  }
  return false;
}

const RolesForm: React.FC<RolesFormProps> = ({ submit, initialValues }) => {
  const [entities, setEntities] = useState<any>([]); //TODO: typings
  const [options, setOptions] = useState<any>([]);
  const styles = useStyles();
  const [createUser] = useReallyCreateUserMutation();
  const [createOrganization] = useReallyCreateOrganizationMutation();
  const [updateUserById] = useUpdateUserByIdMutation();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const [updateOrganizationById] = useUpdateOrganizationByIdMutation();
  const [updateAddressById] = useUpdateAddressByIdMutation();

  // TODO: getEntities - delete the mocked out logic below. Issue #494

  useEffect(() => {
    const entityOptions = entities.map((e: FormValues) => {
      return {
        ...e,
        label: isIndividual(e) ? e['http://schema.org/name'] : e['http://schema.org/legalName'],
      };
    });

    setOptions(entityOptions);
  }, [entities]);

  const saveEntity = async (updatedEntity: FormValues): Promise<any> => {
    // TODO entity validation
    if (!updatedEntity.id) {
      try {
        if (isIndividual(updatedEntity)) {
          const userRes = await createUser({
            variables: {
              input: {
                email: updatedEntity['http://schema.org/email'],
                name: updatedEntity['http://schema.org/name'],
                phoneNumber: updatedEntity['http://schema.org/telephone'],
              },
            },
          });
          if (userRes?.data?.reallyCreateUser?.user?.id) {
            updatedEntity.id = userRes?.data?.reallyCreateUser?.user?.id;
          }
        } else {
          const ownerRes = await createUser({
            variables: {
              input: {
                email: updatedEntity['http://schema.org/email'],
                name: updatedEntity['http://regen.network/responsiblePerson'],
                phoneNumber: updatedEntity['http://schema.org/telephone'],
              },
            },
          });
          if (ownerRes?.data?.reallyCreateUser?.user?.id) {
            const orgRes = await createOrganization({
              variables: {
                input: {
                  ownerId: ownerRes?.data?.reallyCreateUser?.user?.id,
                  legalName: updatedEntity['http://schema.org/legalName'],
                  displayName: updatedEntity['http://schema.org/legalName'],
                  orgAddress: updatedEntity['http://schema.org/location'],
                  image: '', // temp value for now until EntityDisplay values are provided
                  walletAddr: '',
                },
              },
            });
            if (orgRes?.data?.reallyCreateOrganization?.organization?.id) {
              updatedEntity.id = orgRes?.data?.reallyCreateOrganization?.organization?.id;
              updatedEntity.ownerId = ownerRes?.data?.reallyCreateUser?.user?.id;
            }
          }
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/555
        console.log(e);
      }
      const newEntities = [...entities, { ...updatedEntity, id: updatedEntity.id }];
      setEntities(newEntities);
    } else {
      try {
        if (isIndividual(updatedEntity)) {
          await updateUserById({
            variables: {
              input: {
                email: updat,
                userPatch: {
                  phoneNumber: values.phone,
                  roleTitle: values.roleTitle,
                },
              },
            },
          });
        } else {
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/555
        console.log(e);
      }
      const updatedEntities = entities.map((existingEntity: any) =>
        existingEntity.id === updatedEntity.id ? { ...updatedEntity } : existingEntity,
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
        {({ values, submitForm, isValid, isSubmitting }) => {
          console.log(values);
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Title className={cx(styles.title, styles.field)}>
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
