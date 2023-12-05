import { useFormState } from 'react-hook-form';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { EmailConfirmationModal } from 'web-components/lib/components/modal/EmailConfirmationModal/EmailConfirmationModal';
import { Body, Subtitle } from 'web-components/lib/components/typography';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
} from '../LoginButton/LoginButton.constants';
import { getResendCodeButtonLink } from '../LoginButton/utils/getResendCodeButtonLink';
import { getResendCodeLabel } from '../LoginButton/utils/getResendCodeLabel';
import { useEmailConfirmationData } from '../LoginFlow/hooks/useEmailConfirmationData';
import { emailFormSchema } from '../LoginModal/LoginModal.schema';
import { ConnectedEmailErrorModal } from './UserAccountSettings.ConnectedEmailErrorModal';
import { ConnectField } from './UserAccountSettings.ConnectField';
import { EMAIL_ADDED } from './UserAccountSettings.constants';
import { UserAccountSettingsProps } from './UserAccountSettings.types';

/** UserAccountSettings is a component for displaying and managing a user's
 * account settings.
 *
 * The component doesn't specify its own width, background color or padding, so
 * it should be wrapped in a container that provides those styles.
 */
export const UserAccountSettings = ({
  email: initialEmail,
  socialProviders,
  walletProvider,
}: UserAccountSettingsProps) => {
  const {
    isConfirmationModalOpen,
    email,
    emailModalError,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    onEmailSubmit,
    isConnectedEmailErrorModalOpen,
    onConnectedEmailErrorModalClose,
  } = useEmailConfirmationData({ emailConfirmationText: EMAIL_ADDED });
  const form = useZodForm({
    schema: emailFormSchema,
    defaultValues: {
      email: initialEmail,
    },
    mode: 'onBlur',
  });
  const { errors } = useFormState({
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-50">
      <Form form={form} onSubmit={onEmailSubmit}>
        <div className="flex items-end justify-end gap-10">
          <TextField
            label="Login Email"
            disabled={!!initialEmail}
            {...form.register('email')}
            error={!!errors['email']}
            helperText={errors['email']?.message}
          />
          {!initialEmail && (
            <div>
              <ContainedButton
                sx={{ height: { xs: 50, sm: 60 }, width: '100%' }}
                type="submit"
              >
                connect
              </ContainedButton>
            </div>
          )}
        </div>
      </Form>
      <EmailConfirmationModal
        resendText={getResendCodeLabel({ resendTimeLeft })}
        resendButtonLink={getResendCodeButtonLink({
          resendTimeLeft,
          onResendPasscode,
        })}
        cancelButton={{
          text: EMAIL_CONFIRMATION_CANCEL,
          onClick: onConfirmationModalClose,
        }}
        signInButton={{
          text: EMAIL_CONFIRMATION_SUBMIT,
          disabled: true,
          onClick: () => void 0,
        }}
        mailLink={{ text: email, href: '#' }}
        onClose={onConfirmationModalClose}
        open={isConfirmationModalOpen}
        error={emailModalError}
        onCodeChange={onMailCodeChange}
      />
      <ConnectedEmailErrorModal
        open={isConnectedEmailErrorModalOpen}
        onClose={onConnectedEmailErrorModalClose}
        email={email}
      />
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Social Accounts</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Use your social account to log in to Regen Marketplace.&nbsp;
            {/* TODO: add link when we have the content ready */}
            {/* <a>Learn more»</a> */}
          </Body>
        </div>
        <div className="flex flex-col">
          {socialProviders.map(provider => (
            <div
              key={`${provider.name}`}
              className="border-0 border-b border-solid border-grey-300 py-20
            first:pt-0 last:pb-0 last:border-b-0"
            >
              <ConnectField {...provider} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Wallet integration</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Connect a wallet address to be able to perform on chain tasks such
            as buying and selling credits, and creating projects on Regen
            Ledger.&nbsp;
            {/* TODO: add link when we have the content ready */}
            {/* <a>Learn more»</a> */}
          </Body>
        </div>
        <ConnectField name="Keplr" {...walletProvider} />
      </div>
    </div>
  );
};
