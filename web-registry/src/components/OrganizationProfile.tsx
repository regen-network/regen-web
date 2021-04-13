import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OrganizationProfileForm, {
  OrgProfileFormValues,
} from 'web-components/lib/components/form/OrganizationProfileForm';

const useStyles = makeStyles((theme: Theme) => ({}));

const GET_ORGANIZATION_PROFILE = gql``;

const OrganizationProfile: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  // const [status, setStatus] = useState<string | null>(null);

  function handleSkip(): void {
    console.log('TODO - save that a user bypassed this step / is personal? Or just go to next'); // eslint-disable-line no-console
  }

  async function submitOrgProfile(values: OrgProfileFormValues): Promise<void> {
    try {
      console.log('values :>> ', values);
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }

  const classes = useStyles();
  return (
    <OnBoardingSection formContainer title="Organization Profile">
      {/* {message && <Banner text={message} />} */}
      {!isSubmitting && error && <ErrorBanner text={error.toString()} />}
      {/* {!isSubmitting && status && <Banner text={status} />} */}
      <OrganizationProfileForm
        submit={submitOrgProfile}
        mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        skip={handleSkip}
        goBack={() => history.push('/user-profile')}
      />
    </OnBoardingSection>
  );
};

export default OrganizationProfile;
