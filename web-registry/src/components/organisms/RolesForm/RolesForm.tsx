import { useEffect, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { getPartiesByAccountIdQuery } from '../../../lib/queries/react-query/registry-server/graphql/getPartiesByAccountIdById/getPartiesByAccountIdQuery';
import { getPartiesByNameOrAddrQuery } from '../../../lib/queries/react-query/registry-server/graphql/getPartiesByNameOrAddr/getPartiesByNameOrAddrQuery';
import { useWallet } from '../../../lib/wallet/wallet';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { ProfileModalSchemaType } from './components/ProfileModal/ProfileModal.schema';
import { RoleField } from './components/RoleField/RoleField';
import { useSaveProfile } from './hooks/useSaveProfile';
import { rolesFormSchema, RolesFormSchemaType } from './RolesForm.schema';

interface RolesFormProps {
  submit: (values: RolesFormSchemaType) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: RolesFormSchemaType;
}

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  submit,
  onNext,
  onPrev,
}) => {
  const form = useZodForm({
    schema: rolesFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isSubmitting, isDirty, isValid } = useFormState({
    control: form.control,
  });
  const { isDirtyRef } = useProjectEditContext();

  const { confirmSave, isEdit } = useProjectEditContext();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  /* Fields watch */

  const projectDeveloper = useWatch({
    control: form.control,
    name: 'projectDeveloper',
  });
  const verifier = useWatch({
    control: form.control,
    name: 'verifier',
  });

  /* Setter */

  const setProjectDeveloper = (value: ProfileModalSchemaType | null): void => {
    form.setValue('projectDeveloper', value, { shouldDirty: true });
  };
  const setVerifier = (value: ProfileModalSchemaType | null): void => {
    form.setValue('verifier', value, { shouldDirty: true });
  };

  const { accountId } = useWallet();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: partiesByAccountId } = useQuery(
    getPartiesByAccountIdQuery({
      client: graphqlClient,
      id: accountId,
      enabled: !!accountId && !!graphqlClient,
    }),
  );

  const [projectDeveloperValue, setProjectDeveloperValue] = useState('');
  const { data: partiesProjectDeveloper } = useQuery(
    getPartiesByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!projectDeveloperValue,
      input: projectDeveloperValue,
    }),
  );

  const [verifierValue, setVerifierValue] = useState('');
  const { data: partiesVerifier } = useQuery(
    getPartiesByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!verifierValue,
      input: verifierValue,
    }),
  );

  const saveProfile = useSaveProfile();

  return (
    <Form form={form}>
      <OnBoardingCard>
        <RoleField
          label="Project Developer"
          optional
          description="The individual or organization that is in charge of managing the project and will appear on the project page."
          setValue={setProjectDeveloper}
          value={projectDeveloper}
          setDebouncedValue={setProjectDeveloperValue}
          partiesByAccountId={partiesByAccountId}
          parties={partiesProjectDeveloper}
          saveProfile={saveProfile}
          accountId={accountId}
          {...form.register('projectDeveloper')}
        />
        <RoleField
          label="Verifier"
          optional
          description="A third party who provides a independent, impartial assessment of project plan and project reports (that is not the monitor)."
          setValue={setVerifier}
          value={verifier}
          setDebouncedValue={setVerifierValue}
          partiesByAccountId={partiesByAccountId}
          parties={partiesVerifier}
          saveProfile={saveProfile}
          accountId={accountId}
          {...form.register('verifier')}
        />
        <TextField
          type="text"
          label="Admin"
          disabled
          {...form.register('admin')}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        onSave={form.handleSubmit(async data => {
          try {
            await submit(data);
            if (isEdit && confirmSave) confirmSave();
          } catch (e) {
            setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
          }
        })}
        onPrev={onPrev}
        onNext={onNext}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
      />
    </Form>
  );
};

export { RolesForm };
