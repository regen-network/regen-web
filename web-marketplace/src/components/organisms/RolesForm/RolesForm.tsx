import { useEffect, useMemo, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { ERRORS, errorsMapping } from 'config/errors';
import { useAtom, useSetAtom } from 'jotai';

import { Flex } from 'web-components/src/components/box';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  INVALID_REGEN_ADDRESS,
  REQUIRED_MESSAGE,
} from 'lib/constants/shared.constants';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';
import { RoleSubmitProps } from 'pages/Roles/hooks/useRolesSubmit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { getAccountsByNameOrAddrQuery } from '../../../lib/queries/react-query/registry-server/graphql/getAccountsByNameOrAddr/getAccountsByNameOrAddrQuery';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { useHandleUpload } from '../MediaForm/hooks/useHandleUpload';
import { AdminModal } from './components/AdminModal/AdminModal';
import { DIFFERENT_ADDRESSES_ERROR_MSG } from './components/AdminModal/AdminModal.constants';
import {
  getAddressSchema,
  getOptionalAddressSchema,
} from './components/AdminModal/AdminModal.schema';
import {
  getProfileModalSchema,
  ProfileModalSchemaType,
} from './components/ProfileModal/ProfileModal.schema';
import { RoleField } from './components/RoleField/RoleField';
import { useSaveProfile } from './hooks/useSaveProfile';
import { getRolesFormSchema, RolesFormSchemaType } from './RolesForm.schema';

interface RolesFormProps {
  submit: (props: RoleSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues?: RolesFormSchemaType;
  isOnChain: boolean;
  projectId?: string;
}

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  projectId,
  submit,
  onPrev,
  isOnChain,
}) => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { formRef, shouldNavigateRef, isDraftRef } = useCreateProjectContext();
  const addressSchema = useMemo(
    () =>
      getAddressSchema({
        invalidRegenAddress: _(INVALID_REGEN_ADDRESS),
        requiredMessage: _(REQUIRED_MESSAGE),
        differentAddressesErrorMessage: _(DIFFERENT_ADDRESSES_ERROR_MSG),
      }),
    [_],
  );
  const optionalAddressSchema = useMemo(
    () =>
      getOptionalAddressSchema({
        invalidRegenAddress: _(INVALID_REGEN_ADDRESS),
      }),
    [_],
  );
  const profileModalSchema = useMemo(
    () =>
      getProfileModalSchema({
        optionalAddressSchema,
      }),
    [optionalAddressSchema],
  );
  const rolesFormSchema = useMemo(
    () =>
      getRolesFormSchema({
        isOnChain,
        addressSchema,
        optionalAddressSchema,
        profileModalSchema,
      }),
    [isOnChain, addressSchema, optionalAddressSchema, profileModalSchema],
  );
  const form = useZodForm({
    schema: rolesFormSchema,
    draftSchema: rolesFormSchema, // same schema since all fields are optional
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
      addr: admin as string,
      client: graphqlClient,
      enabled: !!admin && admin !== initialValues?.admin && !!graphqlClient,
      languageCode: selectedLanguage,
    }),
  );

  const [projectDeveloperValue, setProjectDeveloperValue] = useState('');
  const { data: accountsProjectDeveloper } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!projectDeveloperValue,
      input: projectDeveloperValue,
      languageCode: selectedLanguage,
    }),
  );

  const [verifierValue, setVerifierValue] = useState('');
  const { data: accountsVerifier } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!verifierValue,
      input: verifierValue,
      languageCode: selectedLanguage,
    }),
  );

  const saveProfile = useSaveProfile();
  const saveAndExit = useProjectSaveAndExit();

  const [offChainProjectId, setOffChainProjectId] = useState(projectId);
  const { handleUpload } = useHandleUpload({
    offChainProjectId,
    apiServerUrl: apiUri,
    setOffChainProjectId,
  });

  return (
    <Form
      form={form}
      formRef={formRef}
      isDraftRef={isDraftRef}
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
          setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        }
      }}
    >
      <OnBoardingCard>
        <RoleField
          label={_(msg`Project Developer`)}
          optional
          description={_(
            msg`The individual or organization that is in charge of managing the project and will appear on the project page.`,
          )}
          setValue={setProjectDeveloper}
          value={projectDeveloper}
          setDebouncedValue={setProjectDeveloperValue}
          authenticatedAccounts={authenticatedAccounts}
          authenticatedAccountIds={authenticatedAccountIds}
          accounts={accountsProjectDeveloper}
          saveProfile={saveProfile}
          activeAccountId={activeAccountId}
          onUpload={handleUpload}
          {...form.register('projectDeveloper')}
        />
        <RoleField
          label={_(msg`Verifier`)}
          optional
          description={_(
            msg`A third party who provides a independent, impartial assessment of project plan and project reports (that is not the monitor).`,
          )}
          setValue={setVerifier}
          value={verifier}
          setDebouncedValue={setVerifierValue}
          authenticatedAccounts={authenticatedAccounts}
          authenticatedAccountIds={authenticatedAccountIds}
          accounts={accountsVerifier}
          saveProfile={saveProfile}
          activeAccountId={activeAccountId}
          onUpload={handleUpload}
          {...form.register('verifier')}
        />
        {isOnChain && admin && (
          <Flex alignItems="flex-end" sx={{ mt: { xs: 8.25, sm: 10 } }}>
            <TextField
              type="text"
              label={_(msg`Admin`)}
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
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
        saveAndExit={saveAndExit}
      />
    </Form>
  );
};

export { RolesForm };
