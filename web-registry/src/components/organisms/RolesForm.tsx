import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Formik, Form, Field, FormikErrors } from 'formik';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import {
  RoleField,
  FormValues,
} from 'web-components/lib/components/inputs/RoleField';
import { Subtitle } from 'web-components/lib/components/typography';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import { IndividualFormValues } from 'web-components/lib/components/modal/IndividualModal';
import { OrganizationFormValues } from 'web-components/lib/components/modal/OrganizationModal';

import { validate, getProjectPageBaseData } from '../../lib/rdf';
import { ProjectPageFooter } from '../molecules';
import {
  useReallyCreateUserMutation,
  useReallyCreateOrganizationMutation,
  useUpdateUserByIdMutation,
  useUpdatePartyByIdMutation,
  useUpdateOrganizationByIdMutation,
  useUpdateAddressByIdMutation,
  useShaclGraphByUriQuery,
  GetOrganizationProfileByEmailQuery,
} from '../../generated/graphql';
import { useProjectEditContext } from '../../pages/ProjectEdit';

interface RolesFormProps {
  submit: (values: RolesValues) => Promise<void>;
  initialValues?: RolesValues;
  projectCreator?: GetOrganizationProfileByEmailQuery;
}

export interface RolesValues {
  'http://regen.network/landOwner'?: FormValues;
  'http://regen.network/landSteward'?: FormValues;
  'http://regen.network/projectDeveloper'?: FormValues;
  'http://regen.network/projectOriginator'?: FormValues;
}

const rolesErrorMessage = 'You must add one of the following roles.';

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
  },
  error: {
    marginTop: 0,
  },
}));

function getEntity(
  query?: GetOrganizationProfileByEmailQuery,
): FormValues | null {
  const user = query?.userByEmail;
  if (user) {
    const org =
      user?.organizationMembersByMemberId?.nodes[0]
        ?.organizationByOrganizationId;
    if (org) {
      return {
        '@type': 'http://regen.network/Organization',
        id: org.id,
        partyId: org.partyId,
        'http://schema.org/legalName': org.legalName,
        'http://schema.org/telephone': user.phoneNumber || undefined,
        'http://schema.org/email': user.email,
        'http://regen.network/responsiblePerson': user.partyByPartyId?.name,
        'http://regen.network/sharePermission': true,
        'http://schema.org/location':
          org.partyByPartyId?.addressByAddressId?.feature,
        projectCreator: true,
      };
    } else {
      return {
        '@type': 'http://regen.network/Individual',
        id: user.id,
        partyId: user.partyId,
        'http://schema.org/name': user.partyByPartyId?.name,
        'http://schema.org/telephone': user.phoneNumber || undefined,
        'http://schema.org/email': user.email,
        'http://regen.network/sharePermission': true,
        projectCreator: true,
      };
    }
  }
  return null;
}

const RolesForm: React.FC<RolesFormProps> = ({
  submit,
  initialValues,
  projectCreator,
}) => {
  const [entities, setEntities] = useState<Array<FormValues>>([]);
  const styles = useStyles();
  const { confirmSave, isEdit } = useProjectEditContext();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  const [createUser] = useReallyCreateUserMutation();
  const [createOrganization] = useReallyCreateOrganizationMutation();
  const [updateUserById] = useUpdateUserByIdMutation();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const [updateOrganizationById] = useUpdateOrganizationByIdMutation();
  const [updateAddressById] = useUpdateAddressByIdMutation();

  useEffect(() => {
    let initEntities: Array<FormValues> = [];
    const creatorEntity = getEntity(projectCreator);
    if (initialValues) {
      let values = Object.values(initialValues);
      if (creatorEntity) {
        values = [creatorEntity, ...values];
      }
      initEntities = values.filter(
        // Remove duplicates and empty values
        (v, i, self) =>
          self.findIndex(t => t.id === v.id) === i && !!v?.['@type'],
      );
    } else if (creatorEntity) {
      initEntities = [creatorEntity];
    }
    setEntities(initEntities);
  }, [initialValues, projectCreator]);

  const updateUser = async (
    id: string,
    partyId: string,
    email?: string,
    name?: string,
    phoneNumber?: string,
  ): Promise<void> => {
    await updateUserById({
      variables: {
        input: {
          id,
          userPatch: {
            email,
            phoneNumber,
          },
        },
      },
    });
    await updatePartyById({
      variables: {
        input: {
          id: partyId,
          partyPatch: {
            name,
          },
        },
      },
    });
  };

  const validateEntity = async (
    e: FormValues,
  ): Promise<FormikErrors<FormValues>> => {
    const errors: FormikErrors<FormValues> = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        e,
        'http://regen.network/ProjectPageRolesGroup',
      );
      for (const result of report.results) {
        const path: keyof FormValues = result.path.value;
        errors[path] = requiredMessage;
      }
    }
    return errors;
  };

  const validateProject = async (
    values: RolesValues,
  ): Promise<FormikErrors<RolesValues>> => {
    const errors: FormikErrors<RolesValues> = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const projectPageData = { ...getProjectPageBaseData(), ...values };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        projectPageData,
        'http://regen.network/ProjectPageRolesGroup',
      );
      if (!report.conforms) {
        errors['http://regen.network/landOwner'] = rolesErrorMessage;
        errors['http://regen.network/landSteward'] = rolesErrorMessage;
        errors['http://regen.network/projectDeveloper'] = rolesErrorMessage;
        errors['http://regen.network/projectOriginator'] = rolesErrorMessage;
      }
    }
    return errors;
  };

  const saveIndividual = async (
    updatedEntity: IndividualFormValues,
  ): Promise<FormValues> => {
    if (!updatedEntity.id) {
      // Create
      try {
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
          updatedEntity.partyId =
            userRes?.data?.reallyCreateUser?.user?.partyId;
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // eslint-disable-next-line no-console
        console.log(e);
      }
      const newEntities = [...entities, { ...updatedEntity }];
      setEntities(newEntities);
    } else {
      // Update
      try {
        if (updatedEntity.partyId) {
          await updateUser(
            updatedEntity.id,
            updatedEntity.partyId,
            updatedEntity['http://schema.org/email'],
            updatedEntity['http://schema.org/name'],
            updatedEntity['http://schema.org/telephone'],
          );
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // eslint-disable-next-line no-console
        console.log(e);
      }
      const updatedEntities = entities.map((existingEntity: FormValues) =>
        existingEntity.id === updatedEntity.id
          ? { ...updatedEntity }
          : existingEntity,
      );
      setEntities(updatedEntities);
    }
    return Promise.resolve(updatedEntity);
  };

  const saveOrganization = async (
    updatedEntity: OrganizationFormValues,
  ): Promise<FormValues> => {
    if (!updatedEntity.id) {
      // Create
      try {
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
                orgAddress: updatedEntity['http://schema.org/location'],
                displayName: '', // temp values for now until EntityDisplay values are provided
                image: '',
                walletAddr: '',
              },
            },
          });
          if (orgRes?.data?.reallyCreateOrganization?.organization?.id) {
            updatedEntity.id =
              orgRes?.data?.reallyCreateOrganization?.organization?.id;
            updatedEntity.partyId =
              orgRes?.data?.reallyCreateOrganization?.organization?.partyId;
            updatedEntity.addressId =
              orgRes?.data?.reallyCreateOrganization?.organization?.partyByPartyId?.addressId;
            updatedEntity.ownerId = ownerRes?.data?.reallyCreateUser?.user?.id;
            updatedEntity.ownerPartyId =
              ownerRes?.data?.reallyCreateUser?.user?.partyId;
          }
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // eslint-disable-next-line no-console
        console.log(e);
      }
      const newEntities = [...entities, { ...updatedEntity }];
      setEntities(newEntities);
    } else {
      // Update
      try {
        await updateOrganizationById({
          variables: {
            input: {
              id: updatedEntity.id,
              organizationPatch: {
                legalName: updatedEntity['http://schema.org/legalName'],
              },
            },
          },
        });
        await updateAddressById({
          variables: {
            input: {
              id: updatedEntity.addressId,
              addressPatch: {
                feature: updatedEntity['http://schema.org/location'],
              },
            },
          },
        });
        if (updatedEntity.ownerId && updatedEntity.ownerPartyId) {
          await updateUser(
            updatedEntity.id,
            updatedEntity.ownerPartyId,
            updatedEntity['http://schema.org/email'],
            updatedEntity['http://regen.network/responsiblePerson'],
            updatedEntity['http://schema.org/telephone'],
          );
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // eslint-disable-next-line no-console
        console.log(e);
      }
      const updatedEntities = entities.map((existingEntity: FormValues) =>
        existingEntity.id === updatedEntity.id ? updatedEntity : existingEntity,
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
            'http://regen.network/landOwner':
              initialValues?.['http://regen.network/landOwner'],
            'http://regen.network/landSteward':
              initialValues?.['http://regen.network/landSteward'],
            'http://regen.network/projectDeveloper':
              initialValues?.['http://regen.network/projectDeveloper'],
            'http://regen.network/projectOriginator':
              initialValues?.['http://regen.network/projectOriginator'],
          }
        }
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          setSubmitting(true);
          try {
            await submit(values);
            setSubmitting(false);
            setTouched({}); // reset to untouched
            if (isEdit && confirmSave) confirmSave();
          } catch (e) {
            setSubmitting(false);
          }
        }}
        validate={validateProject}
      >
        {({ submitForm, isValid, isSubmitting, touched }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Subtitle
                  size="lg"
                  sx={{ color: 'primary.contrastText', mb: { xs: 10, sm: 12 } }}
                >
                  You must add one of the following roles.
                </Subtitle>
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Land Owner"
                  optional
                  description="The individual or organization that owns this land."
                  name="['http://regen.network/landOwner']"
                  options={entities}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Land Steward"
                  optional
                  description="The individual or organization that is performing the work on the ground. This can be a farmer, rancher, conservationist, forester, fisherman, etc."
                  name="['http://regen.network/landSteward']"
                  options={entities}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Project Developer"
                  optional
                  description="The individual or organization that is in charge of managing the project and is the main point of contact with Regen Registry. "
                  name="['http://regen.network/projectDeveloper']"
                  options={entities}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Project Originator"
                  optional
                  description="The individual or organization that helps initiate the project."
                  name="['http://regen.network/projectOriginator']"
                  options={entities}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
              </OnBoardingCard>
              <ProjectPageFooter
                onSave={submitForm}
                saveDisabled={
                  !isValid || isSubmitting || !Object.keys(touched).length
                }
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RolesForm };
