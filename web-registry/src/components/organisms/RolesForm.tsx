import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/TextField';
import {
  invalidAddress,
  isValidAddress,
  requiredMessage,
} from 'web-components/lib/components/inputs/validation';
import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';

import { DEFAULT_PROJECT_CONTEXT, getCompactedPath, validate } from 'lib/rdf';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import {
  FormValues,
  RoleField,
} from 'components/molecules/RoleField/RoleField';

import { ShaclGraphByUriQuery } from '../../generated/graphql';
import getApiUri from '../../lib/apiUri';
import { useProjectEditContext } from '../../pages/ProjectEdit';
import { ProjectPageFooter } from '../molecules';

interface RolesFormProps {
  submit: (values: RolesValues) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: RolesValues;
  graphData?: ShaclGraphByUriQuery;
  projectId?: string;
}

export interface RolesValues {
  'regen:projectDeveloper'?: ProfileFormValues;
  admin?: string;
}

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  graphData,
  projectId,
  ...props
}) => {
  const apiUri = getApiUri();
  const [entities, setEntities] = useState<
    Array<FormValues | ProfileFormValues>
  >([]);
  const { confirmSave, isEdit } = useProjectEditContext();

  // TODO Once Keplr login is implemented, add the off-chain profile associated
  // to the current wallet address to the initial entities that can be picked up in the RoleField
  useEffect(() => {
    let initEntities: Array<FormValues> = [];

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
      initEntities = values.filter(
        // Remove duplicates and empty values
        (v, i, self) =>
          self.findIndex(t => t.id === v.id) === i && !!v?.['@type'],
      );
    }
    setEntities(initEntities);
  }, [initialValues]);

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
    // TODO might need to update, see regen-registry/issues/1501
    if (graphData?.shaclGraphByUri?.graph) {
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        { '@context': DEFAULT_PROJECT_CONTEXT, ...p },
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

  // TODO regen-registry/issues/1501
  const validateProject = async (
    values: RolesValues,
  ): Promise<FormikErrors<RolesValues>> => {
    const errors: FormikErrors<RolesValues> = {};
    // if (graphData?.shaclGraphByUri?.graph) {
    //   const projectPageData = {
    //     ...getProjectBaseData(creditClassId),
    //     ...values,
    //   };
    //   const report = await validate(
    //     graphData.shaclGraphByUri.graph,
    //     projectPageData,
    //     'http://regen.network/ProjectPageRolesGroup',
    //   );
    //   if (!report.conforms) {
    //     errors['regen:projectDeveloper'] = rolesErrorMessage;
    //   }
    // }
    return errors;
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
          try {
            await props.submit(values);
            setTouched({}); // reset to untouched
            if (isEdit && confirmSave) confirmSave();
          } catch (e) {
            setSubmitting(false);
          }
        }}
        validate={validateProject}
      >
        {({ submitForm, isValid, isSubmitting, dirty }) => {
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
                  onSaveProfile={saveProfile}
                  validateEntity={validateEntity}
                  apiServerUrl={apiUri}
                  projectId={projectId}
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
                isValid={isValid}
                isSubmitting={isSubmitting}
                dirty={dirty}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RolesForm };
