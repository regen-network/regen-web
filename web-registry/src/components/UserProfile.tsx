import React, { useCallback, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useMutation } from '@apollo/client';
import axios from 'axios';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Description from 'web-components/lib/components/description';
import Banner from 'web-components/lib/components/banner';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import UserProfileForm, { UserProfileValues } from 'web-components/lib/components/form/UserProfileForm';
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

const UPDATE_USER_BY_EMAIL = gql`
  mutation UpdateUserByEmail($input: UpdateUserByEmailInput!) {
    updateUserByEmail(input: $input) {
      user {
        id
      }
    }
  }
`;

export default function UserProfile(): JSX.Element {
  const { user } = useAuth0();
  const classes = useStyles();
  const [updateUserByEmail, { data, loading, error: updateUserError }] = useMutation(UPDATE_USER_BY_EMAIL, {
    errorPolicy: 'ignore',
  });

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

  async function submitUserProfile(values: UserProfileValues): Promise<void> {
    // if (user?.email) {
    try {
      await updateUserByEmail({
        variables: {
          input: {
            email: user.email,
            userPatch: {
              phoneNumber: values.phone,
              roleTitle: values.role,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
    // }
  }

  return (
    <OnBoardingSection title={title}>
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
      {showForm && <UserProfileForm submit={submitUserProfile} />}
    </OnBoardingSection>
  );
}
