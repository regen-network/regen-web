import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/TextField';
import {
  invalidRegenAddress,
  isValidAddress,
  requiredMessage,
} from 'web-components/lib/components/inputs/validation';
import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';

import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import { FormRef } from 'pages/ProjectEdit/ProjectEdit.types';
import {
  FormValues,
  RoleField,
} from 'components/molecules/RoleField/RoleField';

import { apiUri } from '../../lib/apiUri';
import { useProjectEditContext } from '../../pages/ProjectEdit';
import { ProjectPageFooter } from '../molecules';

interface RolesFormProps {
  submit: (values: RolesFormValues) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: RolesFormValues;
  projectId?: string;
}

export interface RolesFormValues {
  'regen:projectDeveloper'?: ProfileFormValues;
  admin?: string;
}

const RegenAddressSchema = Yup.string().test(
  'is-regen-address',
  invalidRegenAddress,
  value =>
    value
      ? isValidAddress(value, chainInfo.bech32Config.bech32PrefixAccAddr)
      : true,
);

const ProfileSchema = Yup.object().shape({
  'schema:name': Yup.string().required(requiredMessage),
  'regen:address': RegenAddressSchema,
});

const RolesFormSchema = Yup.object().shape({
  admin: RegenAddressSchema.required(requiredMessage),
});

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  projectId,
  ...props
}) => {
  const [entities, setEntities] = useState<
    Array<FormValues | ProfileFormValues>
  >([]);
  const { confirmSave, isEdit, formRef } = useProjectEditContext();

  // TODO Once Keplr login is implemented, add the off-chain profile associated
  // to the current wallet address to the initial entities that can be picked up in the RoleField
  useEffect(() => {
    let initEntities: Array<FormValues> = [];

    if (initialValues) {
      // Remove 'admin' key from initialValues object
      // because we don't want to add it to the entities yet.
      // We might want to change that once Keplr login is implemented
      // and the admin address is associated with an actual user/org profile.
      const filteredValues: RolesFormValues = Object.keys(initialValues)
        .filter(key => key !== 'admin')
        .reduce((cur, key: string) => {
          return Object.assign(cur, {
            [key]: initialValues[key as keyof RolesFormValues],
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
        innerRef={formRef as FormRef<RolesFormValues>}
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
        validationSchema={RolesFormSchema}
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
                  apiServerUrl={apiUri}
                  projectId={projectId}
                  profileValidationSchema={ProfileSchema}
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
