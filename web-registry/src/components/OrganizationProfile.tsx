import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { FormControl, RadioGroup, FormControlLabel, Radio, Collapse, Zoom } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import FormLabel from 'web-components/lib/components/form/ControlledFormLabel';
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

const useStyles = makeStyles((theme: Theme) => ({
  topCard: {
    marginBottom: 0,
  },
  radio: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    margin: `${theme.spacing(4)} 0 0`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  radioActive: {
    backgroundColor: theme.palette.grey[50],
    transform: 'scale(1.01)',
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.secondary.light}`,
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
  radioBtn: {
    padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`,
  },
}));

type AcctType = 'user' | 'organization';

const OrganizationProfile: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const [acctType, setAcctType] = useState<AcctType>('user');
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
    setAcctType('organization');
    setInitialFieldValues({
      location: userOrg?.partyByPartyId?.addressByAddressId?.feature || {},
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
    if (acctType === 'user') {
      handleSkip();
    }
    try {
      if (!userOrg) {
        await createOrg({
          variables: {
            input: {
              description: values.description,
              legalName: values.legalName,
              displayName: values.displayName,
              orgAddress: values.location,
              walletAddr: userByEmail?.partyByPartyId?.walletByWalletId?.addr || '',
              image: values.logo,
              ownerId: orgProfile?.userByEmail?.id,
            },
          },
        });
      } else {
        if (userOrg?.partyId) {
          await updateOrgByPartyId({
            variables: {
              input: {
                partyId: userOrg.partyId,
                organizationPatch: {
                  legalName: values.legalName,
                },
              },
            },
          });
          await updatePartyById({
            variables: {
              input: {
                id: userOrg.partyId,
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
                  feature: values.location,
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

  const styles = useStyles();
  const isIndividual = acctType === 'user';
  const isOrg = acctType === 'organization';

  if (!userByEmail) return null;

  return (
    <OnBoardingSection formContainer title="Organization Profile">
      {!isSubmitting && error && <ErrorBanner text={error.toString()} />}

      <OnBoardingCard className={styles.topCard}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel>Are you part of an organization?</FormLabel>
          <RadioGroup
            aria-label="isOrganization"
            name="isOrganization"
            value={acctType}
            onChange={({ target: { value } }) => setAcctType(value as AcctType)}
          >
            <FormControlLabel
              className={clsx(styles.radio, isIndividual && styles.radioActive)}
              value="user"
              control={<Radio className={styles.radioBtn} />}
              label="No, I will register projects only as an individual"
            />
            <FormControlLabel
              className={clsx(styles.radio, isOrg && styles.radioActive)}
              value="organization"
              control={<Radio className={styles.radioBtn} />}
              label="Yes, I am part of an organization which will be associated with my project(s)"
            />
          </RadioGroup>
        </FormControl>
      </OnBoardingCard>

      <PopIn isOpen={acctType === 'organization'}>
        <OrganizationProfileForm
          initialValues={initialFieldValues}
          submit={submitOrgProfile}
          mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
          skip={handleSkip}
          goBack={() => history.push('/user-profile')}
        />
      </PopIn>
    </OnBoardingSection>
  );
};

const PopIn: React.FC<{ isOpen: boolean }> = ({ children, isOpen }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Zoom in={isOpen}>
        <div>
          <Collapse in={isOpen} collapsedHeight={0}>
            <div>{children}</div>
          </Collapse>
        </div>
      </Zoom>
    </div>
  );
};

export default OrganizationProfile;
