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

import { Flex } from 'web-components/lib/components/box';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import EditIcon from 'web-components/lib/components/icons/EditIcon';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { RoleSubmitProps } from 'pages/Roles/hooks/useRolesSubmit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { getAccountsByNameOrAddrQuery } from '../../../lib/queries/react-query/registry-server/graphql/getAccountsByNameOrAddr/getAccountsByNameOrAddrQuery';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { AdminModal } from './components/AdminModal/AdminModal';
import { ProfileModalSchemaType } from './components/ProfileModal/ProfileModal.schema';
import { RoleField } from './components/RoleField/RoleField';
import { useSaveProfile } from './hooks/useSaveProfile';
import { rolesFormSchema, RolesFormSchemaType } from './RolesForm.schema';

interface RolesFormProps {
  submit: (props: RoleSubmitProps) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: RolesFormSchemaType;
  isOnChain: boolean;
}

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  submit,
  onNext,
  onPrev,
  isOnChain,
}) => {
  const form = useZodForm({
    schema: rolesFormSchema(isOnChain),
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
  const { formRef, shouldNavigateRef } = useCreateProjectContext();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

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
  const admin = useWatch({
    control: form.control,
    name: 'admin',
  });

  /* Setter */

  const setProjectDeveloper = (value: ProfileModalSchemaType | null): void => {
    form.setValue('projectDeveloper', value, { shouldDirty: true });
  };
  const setVerifier = (value: ProfileModalSchemaType | null): void => {
    form.setValue('verifier', value, { shouldDirty: true });
  };
  const setAdmin = (value: string): void => {
    form.setValue('admin', value, { shouldDirty: true });
  };

  const { activeAccountId, authenticatedAccountIds, authenticatedAccounts } =
    useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: adminAccountData } = useQuery(
    getAccountByAddrQuery({
      addr: admin,
      client: graphqlClient,
      enabled: !!admin && admin !== initialValues?.admin && !!graphqlClient,
    }),
  );

  const [projectDeveloperValue, setProjectDeveloperValue] = useState('');
  const { data: accountsProjectDeveloper } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!projectDeveloperValue,
      input: projectDeveloperValue,
    }),
  );

  const [verifierValue, setVerifierValue] = useState('');
  const { data: accountsVerifier } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!verifierValue,
      input: verifierValue,
    }),
  );

  const saveProfile = useSaveProfile();

  return (
    <Form
      form={form}
      formRef={formRef}
      onSubmit={async values => {
        try {
          await submit({
            values,
            adminAccountId: adminAccountData?.accountByAddr?.id,
            shouldNavigate: shouldNavigateRef?.current,
          });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        } catch (e) {
          setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        }
      }}
    >
      <OnBoardingCard>
        <RoleField
          label="Project Developer"
          optional
          description="The individual or organization that is in charge of managing the project and will appear on the project page."
          setValue={setProjectDeveloper}
          value={projectDeveloper}
          setDebouncedValue={setProjectDeveloperValue}
          authenticatedAccounts={authenticatedAccounts}
          authenticatedAccountIds={authenticatedAccountIds}
          accounts={accountsProjectDeveloper}
          saveProfile={saveProfile}
          activeAccountId={activeAccountId}
          {...form.register('projectDeveloper')}
        />
        <RoleField
          label="Verifier"
          optional
          description="A third party who provides a independent, impartial assessment of project plan and project reports (that is not the monitor)."
          setValue={setVerifier}
          value={verifier}
          setDebouncedValue={setVerifierValue}
          authenticatedAccounts={authenticatedAccounts}
          authenticatedAccountIds={authenticatedAccountIds}
          accounts={accountsVerifier}
          saveProfile={saveProfile}
          activeAccountId={activeAccountId}
          {...form.register('verifier')}
        />
        {isOnChain && admin && (
          <Flex alignItems="flex-end" sx={{ mt: { xs: 8.25, sm: 10 } }}>
            <TextField
              type="text"
              label="Admin"
              disabled
              {...form.register('admin')}
            />
            <EditIcon
              onClick={() => setAdminModalOpen(true)}
              sx={{
                width: 24,
                height: 24,
                cursor: 'pointer',
                ml: { xs: 2, sm: 4.25 },
                mb: { xs: 2.5, sm: 4.25 },
              }}
            />
            {adminModalOpen && (
              <AdminModal
                initialValues={{
                  currentAddress: initialValues?.admin || '',
                  newAddress: initialValues?.admin === admin ? '' : admin,
                }}
                onClose={() => setAdminModalOpen(false)}
                onSubmit={value => {
                  setAdmin(value.newAddress);
                  setAdminModalOpen(false);
                }}
              />
            )}
          </Flex>
        )}
      </OnBoardingCard>
      <ProjectPageFooter
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
