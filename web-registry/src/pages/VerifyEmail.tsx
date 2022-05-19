import React, { useCallback, useState } from 'react';
import Link from '@mui/material/Link';
import axios from 'axios';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Banner from 'web-components/lib/components/banner';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { Body } from 'web-components/lib/components/typography';
import getApiUri from '../lib/apiUri';

function VerifyEmail(): JSX.Element {
  const search = new URLSearchParams(window.location.search);
  const email = search.get('email');
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const resendEmail = useCallback(() => {
    setSubmitting(true);
    axios
      .post(`${getApiUri()}/auth/verification-email`, {
        email,
      })
      .then(resp => {
        setSubmitting(false);
        setStatus('Email resent! Please check your inbox.');
        setError(null);
      })
      .catch(err => {
        setSubmitting(false);
        setError(err);
        setStatus(null);
      });
  }, [email]);

  return (
    <OnBoardingSection formContainer title="Please confirm your email address">
      <OnBoardingCard>
        <Body size="lg">
          We've just sent a confirmation email to:{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </Body>
        <br />
        <Body size="lg">
          Click on the confirmation link to return to Regen Network.
        </Body>
      </OnBoardingCard>
      <Body size="xl" sx={{ cursor: 'pointer', pt: [33, 0], px: [2.5, 10] }}>
        Don’t see anything? <Link onClick={resendEmail}>Resend email</Link>.
      </Body>
      {!isSubmitting && error && <ErrorBanner text={error.toString()} />}
      {!isSubmitting && status && <Banner text={status} />}
    </OnBoardingSection>
  );
}

export { VerifyEmail };
