import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { EmailConfirmationModal } from 'web-components/src/components/modal/EmailConfirmationModal/EmailConfirmationModal';
import { Body } from 'web-components/src/components/typography';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import {
  EMAIL_CONFIRMATION_ARIA_LABEL,
  EMAIL_CONFIRMATION_CODE_HELPER,
  EMAIL_CONFIRMATION_DESCRIPTION,
  EMAIL_CONFIRMATION_TITLE,
} from 'lib/constants/shared.constants';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
} from 'components/organisms/LoginButton/LoginButton.constants';
import { getResendCodeButtonLink } from 'components/organisms/LoginButton/utils/getResendCodeButtonLink';
import { getResendCodeLabel } from 'components/organisms/LoginButton/utils/getResendCodeLabel';
import { useEmailConfirmationData } from 'components/organisms/LoginFlow/hooks/useEmailConfirmationData';
import { emailFormSchema } from 'components/organisms/LoginModal/LoginModal.schema';
import { EMAIL_ADDED } from 'components/organisms/UserAccountSettings/UserAccountSettings.constants';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import {
  CREATE_ORG_EMAIL_PENDING_MESSAGE,
  CREATE_ORG_PERSONAL_INFO_EMAIL_HELPER,
  CREATE_ORG_PERSONAL_INFO_EMAIL_LABEL,
  CREATE_ORG_PERSONAL_INFO_NAME_LABEL,
  CREATE_ORG_PERSONAL_INFO_NAME_REQUIRED,
  PERSONAL_INFO_FORM_ID,
} from '../CreateOrganization.constants';
import type { FormStateSetter } from '../CreateOrganization.types';
import type { OrganizationMultiStepData } from '../hooks/useOrganizationFlow';

type PersonalInfoStepProps = FormStateSetter;

export const PersonalInfoStep = ({
  setIsSubmitting,
  setIsValid,
}: PersonalInfoStepProps) => {
  const { _ } = useLingui();
  const { activeAccount, privActiveAccount } = useAuth();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const { data, handleSaveNext } = useMultiStep<OrganizationMultiStepData>();
  const [pendingValues, setPendingValues] =
    useState<PersonalInfoFormValues | null>(null);

  const {
    email: modalEmail,
    emailModalError,
    isConfirmationModalOpen,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    onEmailSubmit,
  } = useEmailConfirmationData({
    emailConfirmationText: _(EMAIL_ADDED),
    showSuccessBanner: false,
    onVerificationSuccess: async () => {
      // Refresh profile data to get the updated email
      await refreshProfileData();

      // Process pending values immediately after email verification
      if (pendingValues) {
        const currentName = (
          (getValues('name') as string | undefined) ?? ''
        ).trim();
        const contactName =
          currentName.length > 0 ? currentName : pendingValues.name;

        const payload: OrganizationMultiStepData = {
          ...(data ?? {}),
          contactName,
          contactEmail: pendingValues.email,
        };

        await updateProfileName(contactName);
        handleSaveNext(payload);
        setPendingValues(null);
      }
    },
  });

  const accountName = activeAccount?.name?.trim() ?? '';
  const accountEmail = privActiveAccount?.email?.trim() ?? '';

  const defaultValues = useMemo<PersonalInfoFormValues>(
    () => ({
      name: (data?.contactName ?? accountName) || '',
      email: accountEmail || data?.contactEmail || '',
    }),
    [accountName, accountEmail, data?.contactEmail, data?.contactName],
  );

  const refreshProfileData = useCallback(async () => {
    if (wallet?.address) {
      await reactQueryClient.invalidateQueries({
        queryKey: getAccountByAddrQueryKey({ addr: wallet.address }),
      });
    }
    if (activeAccount?.id) {
      await reactQueryClient.invalidateQueries({
        queryKey: getAccountByIdQueryKey({ id: activeAccount.id }),
      });
    }
  }, [activeAccount?.id, reactQueryClient, wallet?.address]);

  const updateProfileName = useCallback(
    async (name: string) => {
      const trimmedName = name.trim();
      if (!activeAccount?.id || trimmedName.length === 0) return;

      await updateAccountById({
        variables: {
          input: {
            id: activeAccount.id,
            accountPatch: {
              name: trimmedName,
            },
          },
        },
      });

      await refreshProfileData();
    },
    [activeAccount?.id, refreshProfileData, updateAccountById],
  );

  const { name: defaultName, email: defaultEmail } = defaultValues;
  const hasAccountEmail = accountEmail.length > 0;

  const personalInfoSchema = useMemo(
    () =>
      emailFormSchema.extend({
        name: z
          .string()
          .trim()
          .min(1, { message: _(CREATE_ORG_PERSONAL_INFO_NAME_REQUIRED) }),
      }),
    [_],
  );

  type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

  const form = useZodForm({
    schema: personalInfoSchema,
    defaultValues,
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: {
      errors,
      isSubmitting: formIsSubmitting,
      isValid: formIsValid,
      dirtyFields,
      submitCount,
    },
  } = form;

  useEffect(() => {
    const currentValues = getValues() as PersonalInfoFormValues;
    const nextValues = {
      name: currentValues.name || defaultName || '',
      email: defaultEmail,
    };

    // Only reset if email changed and we're not in the middle of email verification
    if (currentValues.email !== nextValues.email && !pendingValues) {
      reset(nextValues);
      void trigger();
    }
  }, [defaultEmail, defaultName, getValues, reset, trigger, pendingValues]);

  useEffect(() => {
    setIsValid(formIsValid);
  }, [formIsValid, setIsValid]);

  useEffect(() => {
    const waitingForConfirmation = pendingValues !== null && !accountEmail;
    setIsSubmitting(formIsSubmitting || waitingForConfirmation);
  }, [formIsSubmitting, pendingValues, accountEmail, setIsSubmitting]);

  const handleConfirmationModalClose = () => {
    onConfirmationModalClose();
    setPendingValues(null);
  };

  const onSubmit: Parameters<typeof handleSubmit>[0] = async values => {
    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
    };

    if (!hasAccountEmail) {
      await onEmailSubmit({
        email: trimmedValues.email,
        callback: () => {
          setPendingValues({
            name: trimmedValues.name,
            email: trimmedValues.email,
          });
        },
      });
      return;
    }

    await updateProfileName(trimmedValues.name);

    const payload: OrganizationMultiStepData = {
      ...(data ?? {}),
      contactName: trimmedValues.name,
      contactEmail: accountEmail || trimmedValues.email,
    };
    handleSaveNext(payload);
  };

  const showNameError = !!errors.name && (dirtyFields.name || submitCount > 0);
  const showEmailError =
    !hasAccountEmail &&
    !!errors.email &&
    (dirtyFields.email || submitCount > 0);

  return (
    <div className="max-w-[560px] mx-auto border border-solid border-bc-neutral-300 rounded-xl p-50 bg-bc-neutral-0">
      <Form id={PERSONAL_INFO_FORM_ID} form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-50">
          <TextField
            label={_(CREATE_ORG_PERSONAL_INFO_NAME_LABEL)}
            {...register('name')}
            error={showNameError}
            helperText={showNameError ? errors.name?.message : undefined}
          />
          <TextField
            label={_(CREATE_ORG_PERSONAL_INFO_EMAIL_LABEL)}
            {...register('email')}
            className="mt-0"
            disabled={hasAccountEmail}
            error={showEmailError}
            helperText={showEmailError ? errors.email?.message : undefined}
            description={_(CREATE_ORG_PERSONAL_INFO_EMAIL_HELPER)}
          />
        </div>
      </Form>
      {pendingValues && !accountEmail && (
        <Body className="text-center" size="sm">
          {_(CREATE_ORG_EMAIL_PENDING_MESSAGE)}
        </Body>
      )}
      <EmailConfirmationModal
        ariaLabel={_(EMAIL_CONFIRMATION_ARIA_LABEL)}
        title={_(EMAIL_CONFIRMATION_TITLE)}
        description={_(EMAIL_CONFIRMATION_DESCRIPTION)}
        helperText={_(EMAIL_CONFIRMATION_CODE_HELPER)}
        resendText={getResendCodeLabel({ resendTimeLeft, _ })}
        resendButtonLink={getResendCodeButtonLink({
          resendTimeLeft,
          onResendPasscode,
          _,
        })}
        cancelButton={{
          text: _(EMAIL_CONFIRMATION_CANCEL),
          onClick: handleConfirmationModalClose,
        }}
        signInButton={{
          text: _(EMAIL_CONFIRMATION_SUBMIT),
          disabled: false,
          onClick: () => {
            // The verification is handled by onMailCodeChange when 6 digits are entered
            // This button doesn't need to do anything as the modal will close automatically
          },
        }}
        mailLink={{ text: modalEmail, href: '#' }}
        onClose={handleConfirmationModalClose}
        open={isConfirmationModalOpen}
        error={emailModalError}
        onCodeChange={onMailCodeChange}
      />
    </div>
  );
};
