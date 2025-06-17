import React, { useCallback, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import Link from '@mui/material/Link';
import axios from 'axios';

import Banner from 'web-components/src/components/banner';
import ErrorBanner from 'web-components/src/components/banner/ErrorBanner';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';
import { Body } from 'web-components/src/components/typography';

import { apiUri } from '../../lib/apiUri';

function VerifyEmail(): JSX.Element {
  const { _ } = useLingui();
  const search = new URLSearchParams(window.location.search);
  const email = search.get('email');
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const resendEmail = useCallback(() => {
    setSubmitting(true);
    axios
      .post(`${apiUri}/marketplace/v1/auth/verification-email`, {
        email,
      })
      .then(resp => {
        setSubmitting(false);
        setStatus(_(msg`Email resent! Please check your inbox.`));
        setError(null);
      })
      .catch(err => {
        setSubmitting(false);
        setError(err);
        setStatus(null);
      });
  }, [_, email]);

  return (
    <OnBoardingSection
      formContainer
      title={_(msg`Please confirm your email address`)}
    >
      <OnBoardingCard>
        <Body size="lg">
          <Trans>We've just sent a confirmation email to:</Trans>{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </Body>
        <br />
        <Body size="lg">
          <Trans>
            Click on the confirmation link to return to Regen Network.
          </Trans>
        </Body>
      </OnBoardingCard>
      <Body size="xl" sx={{ cursor: 'pointer', pt: [33, 0], px: [2.5, 10] }}>
        <Trans>
          Don’t see anything? <Link onClick={resendEmail}>Resend email</Link>.
        </Trans>
      </Body>
      {!isSubmitting && error && <ErrorBanner text={error.toString()} />}
      {!isSubmitting && status && <Banner text={status} />}
    </OnBoardingSection>
  );
}

export { VerifyEmail };
