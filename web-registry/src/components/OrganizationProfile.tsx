import React, { useState, useEffect } from 'react';
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
  useUpdateAddressByIdMutation,
} from '../generated/graphql';

const OrganizationProfile: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [initialFieldValues, setInitialFieldValues] = useState<OrgProfileFormValues | undefined>();
  const userEmail = user?.email;

  const { data: orgProfile } = useGetOrganizationProfileByEmailQuery({
    skip: !userEmail,
    errorPolicy: 'ignore',
    variables: { email: userEmail },
  });
  const userByEmail = orgProfile?.userByEmail;
  const userOrg =
    orgProfile?.userByEmail?.organizationMembersByMemberId.nodes[0]?.organizationByOrganizationId;

  useEffect(() => {
    if (!userByEmail || !userOrg) return;
    const location = userOrg?.partyByPartyId?.addressByAddressId?.feature
      ? JSON.parse(userOrg.partyByPartyId.addressByAddressId.feature)
      : '';

    setInitialFieldValues({
      location,
      description: userOrg?.partyByPartyId?.description?.trim() || '',
      displayName: userOrg.partyByPartyId?.name || '',
      legalName: userOrg?.legalName || '',
      logo: userOrg?.partyByPartyId?.image || '',
    });
  }, [userByEmail, userOrg]);

  const [createOrg] = useReallyCreateOrganizationMutation({
    errorPolicy: 'ignore',
  });

  const [updateAddress] = useUpdateAddressByIdMutation({
    errorPolicy: 'ignore',
  });

  const [updateOrgByPartyId] = useUpdateOrganizationByPartyIdMutation({
    errorPolicy: 'ignore',
  });

  const [updatePartyById] = useUpdatePartyByIdMutation({
    errorPolicy: 'ignore',
  });

  function handleSkip(): void {
    console.log('TODO: save that a user bypassed this step / is personal? Or just go to next'); // eslint-disable-line no-console
  }

  async function submitOrgProfile(values: OrgProfileFormValues): Promise<void> {
    try {
      // if there is no current organization associated with this user
      // if (userByEmail?.partyByPartyId.wal)
      if (!userOrg) {
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
        if (userByEmail?.partyId) {
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
        }
        if (userOrg.partyByPartyId?.addressByAddressId?.id) {
          await updateAddress({
            variables: {
              input: {
                id: userOrg.partyByPartyId.addressByAddressId.id,
                addressPatch: {
                  feature: JSON.stringify(values.location),
                },
              },
            },
          });
        }
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
        initialValues={initialFieldValues}
        submit={submitOrgProfile}
        mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        skip={handleSkip}
        goBack={() => history.push('/user-profile')}
      />
    </OnBoardingSection>
  );
};

export default OrganizationProfile;
