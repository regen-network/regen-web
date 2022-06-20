import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { useParams } from 'react-router-dom';
import { Bech32Address } from '@keplr-wallet/cosmos';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import {
  RoleField,
  FormValues,
} from 'web-components/lib/components/inputs/RoleField';
import { Subtitle } from 'web-components/lib/components/typography';
import {
  requiredMessage,
  invalidAddress,
} from 'web-components/lib/components/inputs/validation';
import TextField from 'web-components/lib/components/inputs/TextField';
import { IndividualFormValues } from 'web-components/lib/components/modal/IndividualModal';
import { OrganizationFormValues } from 'web-components/lib/components/modal/OrganizationModal';
import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';

import {
  validate,
  getProjectPageBaseData,
  defaultProjectContext,
  getCompactedPath,
} from '../../lib/rdf';
import { ProjectPageFooter } from '../molecules';
import {
  useReallyCreateUserMutation,
  useReallyCreateOrganizationMutation,
  useUpdateUserByIdMutation,
  useUpdatePartyByIdMutation,
  useUpdateOrganizationByIdMutation,
  useUpdateAddressByIdMutation,
  GetOrganizationProfileByEmailQuery,
  ShaclGraphByUriQuery,
} from '../../generated/graphql';
import { useProjectEditContext } from '../../pages/ProjectEdit';
import getApiUri from '../../lib/apiUri';
import { chainInfo } from '../../lib/wallet';

interface RolesFormProps {
  submit: (values: RolesValues) => Promise<void>;
  initialValues?: RolesValues;
  projectCreator?: GetOrganizationProfileByEmailQuery;
  creditClassId?: string | null;
  graphData?: ShaclGraphByUriQuery;
}

export interface RolesValues {
  'regen:landOwner'?: FormValues | ProfileFormValues;
  'regen:landSteward'?: FormValues | ProfileFormValues;
  'regen:projectDeveloper'?: FormValues | ProfileFormValues;
  'regen:projectOriginator'?: FormValues | ProfileFormValues;
  admin?: string;
}

const rolesErrorMessage = 'You must add one of the following roles.';

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
        '@type': 'regen:Organization',
        id: org.id,
        partyId: org.partyId,
        'schema:legalName': org.legalName,
        'schema:telephone': user.phoneNumber || undefined,
        'schema:email': user.email,
        'regen:responsiblePerson': user.partyByPartyId?.name,
        'regen:sharePermission': true,
        'schema:location': org.partyByPartyId?.addressByAddressId?.feature,
        projectCreator: true,
      };
    } else {
      return {
        '@type': 'regen:Individual',
        id: user.id,
        partyId: user.partyId,
        'schema:name': user.partyByPartyId?.name,
        'schema:telephone': user.phoneNumber || undefined,
        'schema:email': user.email,
        'regen:sharePermission': true,
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
  creditClassId,
  graphData,
}) => {
  const apiUri = getApiUri();
  const { projectId } = useParams();
  const [entities, setEntities] = useState<
    Array<FormValues | ProfileFormValues>
  >([]);
  const { confirmSave, isEdit } = useProjectEditContext();

  // In case of on chain credit class id, we show a unified version
  // of the organization/individual form, the profile form.
  // The profile info will get displayed on the project page by default.
  const profile = !!creditClassId;

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
      // Remove 'admin' key from initialValues object
      // because we don't want to add it to the entities yet.
      // We might want to change that once Keplr login is implemented
      // and the admin address is associated with an actual user/org profile.
      const filteredValues: RolesValues = Object.keys(initialValues)
        .filter(key => key !== 'admin')
        .reduce((cur, key: string) => {
          return Object.assign(cur, {
            [key]: initialValues[key as keyof RolesValues],
          });
        }, {});

      let values = Object.values(filteredValues);
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

  const validateEntity = async <T extends ProfileFormValues | FormValues>(
    e: T,
  ): Promise<{ [key in keyof T]?: string }> => {
    const errors: { [key in keyof T]?: string } = {};
    // We perform a separate validation for regen address
    // because SHACL doesn't support bech32 address validation
    const p = e as ProfileFormValues;
    if (p['regen:address']) {
      try {
        Bech32Address.validate(
          p['regen:address'],
          chainInfo.bech32Config.bech32PrefixAccAddr,
        );
      } catch (e) {
        const addrPath = 'regen:address' as keyof T;
        errors[addrPath] = invalidAddress;
      }
    }
    if (graphData?.shaclGraphByUri?.graph) {
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        { ...defaultProjectContext, ...e },
        'http://regen.network/ProjectPageRolesGroup',
      );
      for (const result of report.results) {
        const path: string = result.path.value;
        const compactedPath = getCompactedPath(path) as keyof T | undefined;
        if (compactedPath) {
          errors[compactedPath] = requiredMessage;
        }
      }
    }
    return errors;
  };

  const validateProject = async (
    values: RolesValues,
  ): Promise<FormikErrors<RolesValues>> => {
    const errors: FormikErrors<RolesValues> = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const projectPageData = {
        ...getProjectPageBaseData(creditClassId),
        ...values,
      };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        projectPageData,
        'http://regen.network/ProjectPageRolesGroup',
      );
      if (!report.conforms) {
        errors['regen:landOwner'] = rolesErrorMessage;
        errors['regen:landSteward'] = rolesErrorMessage;
        errors['regen:projectDeveloper'] = rolesErrorMessage;
        errors['regen:projectOriginator'] = rolesErrorMessage;
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
              email: updatedEntity['schema:email'],
              name: updatedEntity['schema:name'],
              phoneNumber: updatedEntity['schema:telephone'],
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
            updatedEntity['schema:email'],
            updatedEntity['schema:name'],
            updatedEntity['schema:telephone'],
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
              email: updatedEntity['schema:email'],
              name: updatedEntity['regen:responsiblePerson'],
              phoneNumber: updatedEntity['schema:telephone'],
            },
          },
        });
        if (ownerRes?.data?.reallyCreateUser?.user?.id) {
          const orgRes = await createOrganization({
            variables: {
              input: {
                ownerId: ownerRes?.data?.reallyCreateUser?.user?.id,
                legalName: updatedEntity['schema:legalName'],
                orgAddress: updatedEntity['schema:location'],
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
                legalName: updatedEntity['schema:legalName'],
              },
            },
          },
        });
        await updateAddressById({
          variables: {
            input: {
              id: updatedEntity.addressId,
              addressPatch: {
                feature: updatedEntity['schema:location'],
              },
            },
          },
        });
        if (updatedEntity.ownerId && updatedEntity.ownerPartyId) {
          await updateUser(
            updatedEntity.id,
            updatedEntity.ownerPartyId,
            updatedEntity['schema:email'],
            updatedEntity['regen:responsiblePerson'],
            updatedEntity['schema:telephone'],
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

  const saveProfile = async (
    updatedEntity: ProfileFormValues,
  ): Promise<ProfileFormValues> => {
    if (!updatedEntity.id) {
      const id = entities.length + 1;
      updatedEntity.id = id.toString();
      const newEntities = [...entities, { ...updatedEntity }];
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
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'regen:landOwner': initialValues?.['regen:landOwner'],
            'regen:landSteward': initialValues?.['regen:landSteward'],
            'regen:projectDeveloper': initialValues?.['regen:projectDeveloper'],
            'regen:projectOriginator':
              initialValues?.['regen:projectOriginator'],
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
              <OnBoardingCard>
                {!creditClassId && (
                  <Subtitle
                    size="lg"
                    sx={{
                      color: 'primary.contrastText',
                      mb: { xs: 10, sm: 12 },
                    }}
                  >
                    {rolesErrorMessage}
                  </Subtitle>
                )}
                {!creditClassId && (
                  <Field
                    component={RoleField}
                    label="Land Owner"
                    optional
                    description="The individual or organization that owns this land."
                    name="regen:landOwner"
                    options={entities}
                    mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onSaveOrganization={saveOrganization}
                    onSaveIndividual={saveIndividual}
                    validateEntity={validateEntity}
                    apiServerUrl={apiUri}
                    projectId={projectId}
                  />
                )}
                {!creditClassId && (
                  <Field
                    component={RoleField}
                    label="Land Steward"
                    optional
                    description="The individual or organization that is performing the work on the ground. This can be a farmer, rancher, conservationist, forester, fisherman, etc."
                    name="regen:landSteward"
                    options={entities}
                    mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onSaveOrganization={saveOrganization}
                    onSaveIndividual={saveIndividual}
                    validateEntity={validateEntity}
                    apiServerUrl={apiUri}
                    projectId={projectId}
                  />
                )}
                <Field
                  component={RoleField}
                  label="Project Developer"
                  optional
                  description={`The individual or organization that is in charge of managing the project and ${
                    profile
                      ? 'will appear on the project page'
                      : 'is the main point of contact with Regen Registry'
                  }.`}
                  name="regen:projectDeveloper"
                  options={entities}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  onSaveProfile={saveProfile}
                  validateEntity={validateEntity}
                  profile={profile}
                  apiServerUrl={apiUri}
                  projectId={projectId}
                />
                {!creditClassId && (
                  <Field
                    component={RoleField}
                    label="Project Originator"
                    optional
                    description="The individual or organization that helps initiate the project."
                    name="regen:projectOriginator"
                    options={entities}
                    mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onSaveOrganization={saveOrganization}
                    onSaveIndividual={saveIndividual}
                    validateEntity={validateEntity}
                    apiServerUrl={apiUri}
                    projectId={projectId}
                  />
                )}
                {creditClassId && (
                  <Field
                    name="admin"
                    type="text"
                    label="Admin"
                    component={TextField}
                    disabled
                  />
                )}
              </OnBoardingCard>
              <ProjectPageFooter
                onSave={submitForm}
                saveDisabled={!isValid || isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RolesForm };
