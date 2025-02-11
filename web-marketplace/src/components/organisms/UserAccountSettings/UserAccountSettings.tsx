import { useFormState } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { EmailConfirmationModal } from 'web-components/src/components/modal/EmailConfirmationModal/EmailConfirmationModal';
import { Body, Subtitle } from 'web-components/src/components/typography';

import {
  EMAIL_CONFIRMATION_ARIA_LABEL,
  EMAIL_CONFIRMATION_CODE_HELPER,
  EMAIL_CONFIRMATION_DESCRIPTION,
  EMAIL_CONFIRMATION_TITLE,
} from 'lib/constants/shared.constants';

import { Link } from 'components/atoms';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
} from '../LoginButton/LoginButton.constants';
import { getResendCodeButtonLink } from '../LoginButton/utils/getResendCodeButtonLink';
import { getResendCodeLabel } from '../LoginButton/utils/getResendCodeLabel';
import { emailFormSchema } from '../LoginModal/LoginModal.schema';
import { ConnectField } from './UserAccountSettings.ConnectField';
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
  custodialAddress,
  emailConfirmationData,
}: UserAccountSettingsProps) => {
  const { _ } = useLingui();
  const {
    isConfirmationModalOpen,
    email,
    emailModalError,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    onEmailSubmit,
  } = emailConfirmationData;

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
            label={_(msg`Login Email`)}
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
                <Trans>connect</Trans>
              </ContainedButton>
            </div>
          )}
        </div>
      </Form>
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
          onClick: onConfirmationModalClose,
        }}
        signInButton={{
          text: _(EMAIL_CONFIRMATION_SUBMIT),
          disabled: true,
          onClick: () => void 0,
        }}
        mailLink={{ text: email, href: '#' }}
        onClose={onConfirmationModalClose}
        open={isConfirmationModalOpen}
        error={emailModalError}
        onCodeChange={onMailCodeChange}
      />
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">
            <Trans>Social Accounts</Trans>
          </Subtitle>
          <Body size="sm" color="info.dark-grey">
            <Trans>
              Use your social account to log in to Regen Marketplace.&nbsp;
            </Trans>
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
          <Subtitle size="lg">
            <Trans>Wallet integration</Trans>
          </Subtitle>
          <Body size="sm" color="info.dark-grey">
            <Trans>
              Connect a wallet address to be able to perform on chain tasks such
              as buying and selling credits, and creating projects on Regen
              Ledger.&nbsp;
            </Trans>
            {/* TODO: add link when we have the content ready */}
            {/* <a>Learn more»</a> */}
          </Body>
        </div>

        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
        <ConnectField name="Keplr" {...walletProvider} />
      </div>
      {custodialAddress && (
        <div className="flex flex-col gap-30">
          <div className="flex flex-col gap-10">
            <Subtitle size="lg">
              <Trans>Regen impact address</Trans>
            </Subtitle>
            <Body size="sm" color="info.dark-grey">
              <Trans>
                In order to buy and retire ecocredits using credit card payment,
                we may generate a dedicated hosted wallet address to use as the
                recipient of the retired blockchain credits. Please do not send
                funds or tradable credits to this address, as you will not have
                the ability to initiate transactions from this account.
                <Link
                  className="inline ml-5"
                  href="https://guides.regen.network/guides/regen-marketplace-buyers-guides/ecocredits/buy-ecocredits"
                >
                  Learn more»
                </Link>
              </Trans>
            </Body>
          </div>
          <ConnectField address={custodialAddress} />
        </div>
      )}
    </div>
  );
};
