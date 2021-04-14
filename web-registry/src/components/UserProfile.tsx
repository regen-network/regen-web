import React, { useCallback, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import axios from 'axios';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Description from 'web-components/lib/components/description';
import Banner from 'web-components/lib/components/banner';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import getApiUri from '../lib/apiUri';

const useStyles = makeStyles((theme: Theme) => ({
  resend: {
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(33)} 0 0`,
      fontSize: theme.spacing(4.5),
    },
  },
}));

const messageExpired: string = 'Access expired.';

// TODO check login state
export default function ConfirmEmail(): JSX.Element {
  const classes = useStyles();

  // Get any URL parameters from auth0 after email verification
  const search = new URLSearchParams(window.location.search);
  const success = search.get('success');
  const message = search.get('message');
  const email = search.get('email');

  let title: string = 'User Profile';
  const showForm: boolean =
    success === null ||
    success === 'true' ||
    (success === 'false' && message === 'This URL can be used only once');
  if (!showForm) {
    if (message === messageExpired) {
      title = 'This email confirmation link has expired.';
    } else if (message) {
      title = message;
    } else {
      title = 'Your email address could not be verified.';
    }
  }

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
    <OnBoardingSection formContainer title={title}>
      {success === 'true' && <Banner text="Email address confirmed!" />}
      {success === 'false' && message === messageExpired && (
        <>
          <OnBoardingCard>
            <Description className={classes.resend}>
              <Link onClick={resendEmail}>Resend</Link> confirmation email.
            </Description>
          </OnBoardingCard>
          {!isSubmitting && error && <ErrorBanner text={error.toString()} />}
          {!isSubmitting && status && <Banner text={status} />}
        </>
      )}
      {/* TODO: add user profile form here https://github.com/regen-network/regen-registry/issues/351 */}
      {showForm && <div>form</div>}
    </OnBoardingSection>
  );
}
