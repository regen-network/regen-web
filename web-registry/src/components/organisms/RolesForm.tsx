import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik, FormikErrors } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/TextField';
import {
  invalidAddress,
  isValidAddress,
  requiredMessage,
} from 'web-components/lib/components/inputs/validation';
import { IndividualFormValues } from 'web-components/lib/components/modal/IndividualModal';
import { OrganizationFormValues } from 'web-components/lib/components/modal/OrganizationModal';
import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';
import { Subtitle } from 'web-components/lib/components/typography';

import {
  defaultProjectContext,
  getCompactedPath,
  getProjectPageBaseData,
  validate,
} from 'lib/rdf';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import {
  FormValues,
  RoleField,
} from 'components/molecules/RoleField/RoleField';

import {
  GetOrganizationProfileByEmailQuery,
  ShaclGraphByUriQuery,
  useReallyCreateOrganizationMutation,
  useReallyCreateUserMutation,
  useUpdateAddressByIdMutation,
  useUpdateOrganizationByIdMutation,
  useUpdatePartyByIdMutation,
  useUpdateUserByIdMutation,
} from '../../generated/graphql';
import getApiUri from '../../lib/apiUri';
import { useProjectEditContext } from '../../pages/ProjectEdit';
import { ProjectPageFooter } from '../molecules';

interface RolesFormProps {
  submit: (values: RolesValues) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: RolesValues;
  graphData?: ShaclGraphByUriQuery;
}

export interface RolesValues {
  'regen:projectDeveloper'?: ProfileFormValues;
  admin?: string;
}

const rolesErrorMessage = 'You must add one of the following roles.';

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  graphData,
  ...props
}) => {
  const apiUri = getApiUri();
  const { projectId } = useParams();
  const [entities, setEntities] = useState<
    Array<FormValues | ProfileFormValues>
  >([]);
  const { confirmSave, isEdit } = useProjectEditContext();

  const [createUser] = useReallyCreateUserMutation();
  const [createOrganization] = useReallyCreateOrganizationMutation();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const [updateAddressById] = useUpdateAddressByIdMutation();

  // TODO Once Keplr login is implemented, add the off-chain profile associated
  // to the current wallet address (creatorEntity) to the initial entities that can be picked up in the RoleField
  // useEffect(() => {
  //   let initEntities: Array<FormValues> = [];

  //   if (initialValues) {
  //     // Remove 'admin' key from initialValues object
  //     // because we don't want to add it to the entities yet.
  //     // We might want to change that once Keplr login is implemented
  //     // and the admin address is associated with an actual user/org profile.
  //     const filteredValues: RolesValues = Object.keys(initialValues)
  //       .filter(key => key !== 'admin')
  //       .reduce((cur, key: string) => {
  //         return Object.assign(cur, {
  //           [key]: initialValues[key as keyof RolesValues],
  //         });
  //       }, {});

  //     let values = Object.values(filteredValues);
  //     if (creatorEntity) {
  //       values = [creatorEntity, ...values];
  //     }
  //     initEntities = values.filter(
  //       // Remove duplicates and empty values
  //       (v, i, self) =>
  //         self.findIndex(t => t.id === v.id) === i && !!v?.['@type'],
  //     );
  //   } else if (creatorEntity) {
  //     initEntities = [creatorEntity];
  //   }
  //   setEntities(initEntities);
  // }, [initialValues, projectCreator]);

  // TODO
  const update = async (updatedEntity: ProfileFormValues): Promise<void> => {
    // if either of those change
    await updatePartyById({
      variables: {
        input: {
          id: updatedEntity.partyId,
          partyPatch: {
            name: updatedEntity['schema:name'],
            image: updatedEntity['schema:image']?.['@value'],
            description: updatedEntity['schema:description'],
          },
        },
      },
    });
    // if wallet address changes
    // await updateWalletById({
    //   variables: { input: { addr: updatedEntity['regen:address'] } },
    // });
  };

  const validateEntity = async <T extends ProfileFormValues | FormValues>(
    e: T,
  ): Promise<{ [key in keyof T]?: string }> => {
    const errors: { [key in keyof T]?: string } = {};
    // We perform a separate validation for regen address
    // because SHACL doesn't support bech32 address validation
    const p = e as ProfileFormValues;
    if (p['regen:address']) {
      const isValid = isValidAddress(
        p['regen:address'],
        chainInfo.bech32Config.bech32PrefixAccAddr,
      );
      if (!isValid) {
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

  // TODO
  const validateProject = async (
    values: RolesValues,
  ): Promise<FormikErrors<RolesValues>> => {
    const errors: FormikErrors<RolesValues> = {};
    // if (graphData?.shaclGraphByUri?.graph) {
    //   const projectPageData = {
    //     ...getProjectPageBaseData(creditClassId),
    //     ...values,
    //   };
    //   const report = await validate(
    //     graphData.shaclGraphByUri.graph,
    //     projectPageData,
    //     'http://regen.network/ProjectPageRolesGroup',
    //   );
    //   if (!report.conforms) {
    //     errors['regen:landOwner'] = rolesErrorMessage;
    //     errors['regen:landSteward'] = rolesErrorMessage;
    //     errors['regen:projectDeveloper'] = rolesErrorMessage;
    //     errors['regen:projectOriginator'] = rolesErrorMessage;
    //   }
    // }
    return errors;
  };

  const saveIndividual = async (
    updatedEntity: ProfileFormValues,
  ): Promise<FormValues> => {
    if (!updatedEntity.id) {
      // Create
      try {
        // TODO only create party and associated wallet since we can't create a user without an email address
        const userRes = await createUser({
          variables: {
            input: {
              // email: '', // keep empty for now until we have Keplr login
              name: updatedEntity['schema:name'],
              image: updatedEntity['schema:image']?.['@value'],
              description: updatedEntity['schema:description'],
              walletAddr: updatedEntity['regen:address'],
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
          await update(updatedEntity);
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
    updatedEntity: ProfileFormValues,
  ): Promise<FormValues> => {
    if (!updatedEntity.id) {
      // Create
      try {
        const orgRes = await createOrganization({
          variables: {
            input: {
              legalName: updatedEntity['schema:name'],
              displayName: updatedEntity['schema:name'],
              image: updatedEntity['schema:image']?.['@value'],
              walletAddr: updatedEntity['regen:address'],
            },
          },
        });
        if (orgRes?.data?.reallyCreateOrganization?.organization?.id) {
          updatedEntity.id =
            orgRes?.data?.reallyCreateOrganization?.organization?.id;
          updatedEntity.partyId =
            orgRes?.data?.reallyCreateOrganization?.organization?.partyId;
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
          await update(updatedEntity);
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
            'regen:projectDeveloper': initialValues?.['regen:projectDeveloper'],
          }
        }
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          setSubmitting(true);
          try {
            await props.submit(values);
            setSubmitting(false);
            setTouched({}); // reset to untouched
            if (isEdit && confirmSave) confirmSave();
          } catch (e) {
            setSubmitting(false);
          }
        }}
        validate={validateProject}
      >
        {({ submitForm, isValid, isSubmitting }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard>
                <Field
                  component={RoleField}
                  label="Project Developer"
                  optional
                  description="The individual or organization that is in charge of managing the project and will appear on the project page"
                  name="regen:projectDeveloper"
                  options={entities}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  onSaveProfile={saveProfile}
                  validateEntity={validateEntity}
                  apiServerUrl={apiUri}
                  projectId={projectId}
                  profile
                />
                <Field
                  name="admin"
                  type="text"
                  label="Admin"
                  component={TextField}
                  disabled
                />
              </OnBoardingCard>
              <ProjectPageFooter
                onSave={submitForm}
                onPrev={props.onPrev}
                onNext={props.onNext}
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
