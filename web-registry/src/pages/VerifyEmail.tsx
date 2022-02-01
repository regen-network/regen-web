import React, { useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import axios from 'axios';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Description from 'web-components/lib/components/description';
import Banner from 'web-components/lib/components/banner';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import getApiUri from '../lib/apiUri';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
  },
  resend: {
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(10)}`,
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(33)} ${theme.spacing(2.5)} 0`,
      fontSize: theme.spacing(4.5),
    },
  },
}));

function VerifyEmail(): JSX.Element {
  const classes = useStyles();
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
        <Description className={classes.description}>
          We've just sent a confirmation email to:{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </Description>
        <br />
        <Description className={classes.description}>
          Click on the confirmation link to return to Regen Network.
        </Description>
      </OnBoardingCard>
      <Description className={classes.resend}>
        Don’t see anything? <Link onClick={resendEmail}>Resend email</Link>.
      </Description>
      {!isSubmitting && error && <ErrorBanner text={error.toString()} />}
      {!isSubmitting && status && <Banner text={status} />}
    </OnBoardingSection>
  );
}

export { VerifyEmail };
