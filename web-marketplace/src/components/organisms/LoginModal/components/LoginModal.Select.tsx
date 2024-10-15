import { useFormState } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Body, Label, Title } from 'web-components/src/components/typography';

import { Link } from 'components/atoms/Link';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { emailFormSchema, EmailFormSchemaType } from '../LoginModal.schema';
import { LoginProvider } from '../LoginModal.types';
import { LoginModalProviders } from './LoginModal.Providers';

export interface Props {
  wallets: LoginProvider[];
  socialProviders: LoginProvider[];
  onEmailSubmit: (values: EmailFormSchemaType) => Promise<void>;
  onlyWallets?: boolean;
}

const LoginModalSelect = ({
  wallets,
  socialProviders,
  onEmailSubmit,
  onlyWallets,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const form = useZodForm({
    schema: emailFormSchema,
    defaultValues: {
      email: undefined,
    },
    mode: 'onBlur',
  });
  const { errors } = useFormState({
    control: form.control,
  });

  return (
    <Box textAlign="center">
      <Title variant="h4" mb={5}>
        <Trans>Choose a log in method</Trans>
      </Title>
      {wallets.length > 0 && (
        <>
          <Body pb={7.5}>
            <Trans>
              Learn more about wallets in our{' '}
              <Link href="https://guides.regen.network/guides/wallets">
                user guide.
              </Link>
            </Trans>
          </Body>
          <LoginModalProviders providers={wallets} />
          {!onlyWallets && (
            <Grid container alignItems="center" pb={7.5} spacing={7.5} pt={5}>
              <Grid item xs={4}>
                <Box sx={{ height: '1px', backgroundColor: 'grey.100' }} />
              </Grid>
              <Grid item xs={4}>
                <Label size="xs" color="info.dark">
                  <Trans>or, log in with email / social</Trans>
                </Label>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ height: '1px', backgroundColor: 'grey.100' }} />
              </Grid>
            </Grid>
          )}
        </>
      )}
      {!onlyWallets && (
        <>
          <Body
            size="sm"
            sx={{
              fontStyle: 'italic',
              maxWidth: '356px',
              margin: '0 auto',
              pb: 7.5,
            }}
          >
            <Trans>
              NOTE: Only project page creation and user profile creation
              available with email / social log in.
            </Trans>
          </Body>
          <Form form={form} onSubmit={onEmailSubmit}>
            <Grid container columnSpacing={2} alignItems="flex-end" pb={7.5}>
              <Grid item xs={8}>
                <TextField
                  label={_(msg`Email`)}
                  {...form.register('email')}
                  error={!!errors['email']}
                  helperText={errors['email']?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <ContainedButton
                  sx={{ height: { xs: 50, sm: 60 }, width: '100%' }}
                  type="submit"
                >
                  <Trans>log in</Trans>
                </ContainedButton>
              </Grid>
            </Grid>
          </Form>
          <LoginModalProviders providers={socialProviders} />
        </>
      )}
      <Body
        size="sm"
        sx={{
          maxWidth: '338px',
          margin: '0 auto',
        }}
      >
        <Trans>
          By connecting to Regen Marketplace, you agree to our{' '}
          <Link href="https://regennetwork.notion.site/Platform-Terms-of-Service-b77faf978cd04e2e8d3c58f76841bad1">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="https://www.regen.network/privacy-policy">
            Privacy Policy
          </Link>
        </Trans>
      </Body>
    </Box>
  );
};

export { LoginModalSelect };
