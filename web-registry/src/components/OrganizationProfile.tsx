import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import { makeStyles, Theme } from '@material-ui/core/styles';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OrganizationProfileForm, {
  OrgProfileFormValues,
} from 'web-components/lib/components/form/OrganizationProfileForm';

import {
  useGetOrganizationProfileByEmailQuery,
  useUpdatePartyByIdMutation,
  useReallyCreateOrganizationMutation,
  useUpdateOrganizationByPartyIdMutation,
} from '../generated/graphql';

const OrganizationProfile: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const userEmail = user?.email;

  const { data: orgProfile } = useGetOrganizationProfileByEmailQuery({
    skip: !userEmail,
    errorPolicy: 'ignore',
    variables: { email: userEmail },
  });
  const userByEmail = orgProfile?.userByEmail;

  const [createOrg] = useReallyCreateOrganizationMutation({
    errorPolicy: 'ignore',
  });

  const [updateOrgByPartyId] = useUpdateOrganizationByPartyIdMutation({
    errorPolicy: 'ignore',
  });

  const [updatePartyById] = useUpdatePartyByIdMutation({
    errorPolicy: 'ignore',
  });

  function handleSkip(): void {
    console.log('TODO - save that a user bypassed this step / is personal? Or just go to next'); // eslint-disable-line no-console
  }

  async function submitOrgProfile(values: OrgProfileFormValues): Promise<void> {
    try {
      // if there is no current organization associated with this user
      // if (userByEmail?.partyByPartyId.wal)
      if (!userByEmail?.organizationMembersByMemberId?.nodes?.[0]) {
        await createOrg({
          variables: {
            input: {
              description: values.description,
              legalName: values.legalName,
              displayName: values.displayName,
              orgAddress: JSON.stringify(values.location),
              walletAddr: userByEmail?.partyByPartyId?.walletByWalletId?.addr,
              image: values.logo,
              ownerId: orgProfile?.userByEmail?.id,
            },
          },
        });
      } else {
        await updatePartyById({
          variables: {
            input: {
              id: userByEmail.partyId,
              partyPatch: {
                description: values.description,
                name: values.displayName,
                image: values.logo,
              },
            },
          },
        });
        await updateOrgByPartyId({
          variables: {
            input: {
              partyId: userByEmail.partyId,
              organizationPatch: {
                legalName: values.legalName,
              },
            },
          },
        });
      }
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }

  if (!userByEmail) return null;
  return (
    <OnBoardingSection formContainer title="Organization Profile">
      {!isSubmitting && error && <ErrorBanner text={error.toString()} />}
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
