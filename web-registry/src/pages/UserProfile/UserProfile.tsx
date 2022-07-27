import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Link from '@mui/material/Link';
import axios from 'axios';

import Banner from 'web-components/lib/components/banner';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import UserProfileForm, {
  UserProfileValues,
} from 'web-components/lib/components/form/UserProfileForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { Body } from 'web-components/lib/components/typography';

import {
  useGetUserProfileByEmailQuery,
  useUpdatePartyByIdMutation,
  useUpdateUserByEmailMutation,
} from '../../generated/graphql';
import getApiUri from '../../lib/apiUri';

const messageExpired: string = 'Access expired.';

function UserProfile(): JSX.Element {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const userEmail = user?.email;

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

  const { data: userProfileData } = useGetUserProfileByEmailQuery({
    skip: !userEmail,
    variables: {
      email: userEmail as string,
    },
  });

  const [updateUserByEmail] = useUpdateUserByEmailMutation();
  const [updatePartyById] = useUpdatePartyByIdMutation();

  const [error, setError] = useState<unknown>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [initialFieldValues, setInitialFieldValues] = useState<
    UserProfileValues | undefined
  >();

  useEffect(() => {
    if (!userProfileData?.userByEmail) return;
    const { roleTitle, phoneNumber, partyByPartyId } =
      userProfileData.userByEmail;
    setInitialFieldValues({
      name: partyByPartyId?.name || '',
      roleTitle: roleTitle || '',
      description: partyByPartyId?.description?.trim() || '',
      phone: phoneNumber || '',
      photo: partyByPartyId?.image || '',
    });
  }, [userProfileData]);

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
    try {
      await updateUserByEmail({
        variables: {
          input: {
            email: userEmail as string,
            userPatch: {
              phoneNumber: values.phone,
              roleTitle: values.roleTitle,
            },
          },
        },
      });
      await updatePartyById({
        variables: {
          input: {
            id: userProfileData?.userByEmail?.partyId,
            partyPatch: {
              description: values.description,
              name: values.name,
              image: values.photo,
            },
          },
        },
      });
      search.set('message', 'User profile created!');
      navigate('/organization-profile'); // TODO: programmatically handle routing?
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <OnBoardingSection formContainer title={title}>
      {success === 'true' && <Banner text="Email address confirmed!" />}
      {success === 'false' && message === messageExpired && (
        <>
          <OnBoardingCard>
            <Body size="xl" sx={{ pt: [33, 0], cursor: 'pointer' }}>
              <Link onClick={resendEmail}>Resend</Link> confirmation email.
            </Body>
          </OnBoardingCard>
          {!isSubmitting && error instanceof Object && (
            <ErrorBanner text={error.toString()} />
          )}
          {!isSubmitting && status && <Banner text={status} />}
        </>
      )}
      {showForm && (
        <UserProfileForm
          submit={submitUserProfile}
          initialValues={initialFieldValues}
        />
      )}
    </OnBoardingSection>
  );
}

export { UserProfile };
