import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';
import { useNavigateNext } from 'web-marketplace/src/legacy-pages/ProjectCreate/hooks/useNavigateNext';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import { Loading } from 'web-components/src/components/loading';

import { AccountType } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';

import { ProjectPageFooter } from 'components/molecules';
import {
  ORG,
  UNNAMED,
  USER,
} from 'components/organisms/DashboardNavigation/DashboardNavigation.constants';
import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';
import { ProjectAccountSelector } from 'components/organisms/ProjectAccountSelector/ProjectAccountSelector';
import { OnboardingFormTemplate } from 'components/templates/ProjectFormTemplate/OnboardingFormTemplate';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';

import { useCreateProjectContext } from '../ProjectCreate/ProjectCreate';

export const ProjectAccount = (): JSX.Element | null => {
  const { _ } = useLingui();
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const fromPath = searchParams.get('from');
  const fromDashboard = !!fromPath;
  const isOrganizationParam = searchParams.get('isOrganization') === 'true';
  const { activeAccount } = useAuth();
  const dao = useDaoOrganization();
  const {
    projectCreatorAddress,
    setProjectCreatorAddress,
    setIsOrganizationAccount,
  } = useCreateProjectContext();

  const personalAccount = useMemo(
    (): AccountOption | null =>
      activeAccount
        ? {
            name: activeAccount.name || _(UNNAMED),
            address: activeAccount.addr || '',
            type: USER,
            image:
              activeAccount.image ||
              getDefaultAvatar({
                ...activeAccount,
                type: activeAccount.type ?? AccountType.User,
              }),
            displayName: _(msg`Personal`),
          }
        : null,
    [activeAccount, _],
  );
  const organizationAccount = useMemo(
    (): AccountOption | null =>
      dao
        ? {
            name: dao.organizationByDaoAddress?.name || _(UNNAMED),
            address: dao.address ?? '',
            type: ORG,
            image: getDefaultAvatar({
              type: AccountType.Organization,
            }),
            displayName: _(msg`Organization`),
          }
        : null,
    [dao, _],
  );

  // If user has a DAO organization, they have permission to create projects for it
  // (useDaoOrganization only returns DAOs where the user has an assignment)
  const shouldSkip =
    !dao || !activeAccount || !personalAccount || !organizationAccount;

  // Track if we've initialized from dashboard state
  const initializedRef = useRef(false);
  const [isStateReady, setIsStateReady] = useState(false);

  // Initialize selected address - run when accounts become available
  useEffect(() => {
    // Don't run if we've already initialized or accounts aren't ready
    if (initializedRef.current) return;

    if (fromDashboard) {
      // Coming from dashboard - use the passed params
      const isOrg = isOrganizationParam;
      const address = isOrg
        ? organizationAccount?.address
        : personalAccount?.address;

      if (address) {
        initializedRef.current = true;
        setSelectedAddress(address);
        setProjectCreatorAddress(address);
        setIsOrganizationAccount(isOrg);
        setIsStateReady(true);
      }
    } else if (projectCreatorAddress) {
      // Already have a selection (e.g., from localStorage)
      initializedRef.current = true;
      setSelectedAddress(projectCreatorAddress);
      setIsStateReady(true);
    } else if (organizationAccount?.address) {
      // Default to organization if available
      initializedRef.current = true;
      setSelectedAddress(organizationAccount.address);
      setProjectCreatorAddress(organizationAccount.address);
      setIsOrganizationAccount(true);
      setIsStateReady(true);
    }
  }, [
    fromDashboard,
    isOrganizationParam,
    organizationAccount?.address,
    personalAccount?.address,
    projectCreatorAddress,
    setProjectCreatorAddress,
    setIsOrganizationAccount,
  ]);

  const addressToCheck = projectCreatorAddress || activeAccount?.addr;

  const { isIssuer, isLoadingIsIssuer } = useQueryIsIssuer({
    address: addressToCheck,
  });

  const step = isIssuer ? 'choose-credit-class' : 'basic-info';

  const { navigateNext } = useNavigateNext({
    step,
    projectId,
  });

  const [selectedAddress, setSelectedAddress] = useState<string>('');

  // Navigate away if user should skip this step, but only after:
  // 1. Issuer check completes
  // 2. State is properly initialized (for dashboard redirects)
  useEffect(() => {
    const canNavigate =
      !isLoadingIsIssuer &&
      (shouldSkip || (fromDashboard && isStateReady));
    if (canNavigate) {
      navigateNext();
    }
  }, [shouldSkip, isLoadingIsIssuer, navigateNext, fromDashboard, isStateReady]);

  // Show loading while:
  // 1. Checking issuer status
  // 2. Processing dashboard redirect (waiting for state to be ready)
  // 3. User should skip this page
  const showLoading =
    isLoadingIsIssuer || (fromDashboard && !isStateReady) || shouldSkip;

  if (showLoading) {
    return (
      <OnboardingFormTemplate activeStep={0} title={''}>
        <Loading />
      </OnboardingFormTemplate>
    );
  }

  const accounts: [AccountOption, AccountOption] = [
    personalAccount,
    organizationAccount,
  ];

  const handleAccountSelect = (address: string) => {
    const selected = accounts.find(opt => opt.address === address);
    if (selected) {
      setSelectedAddress(address);
      setProjectCreatorAddress(address);
      setIsOrganizationAccount(selected.type === ORG);
    }
  };

  return (
    <OnboardingFormTemplate
      activeStep={0}
      title={_(msg`Choose where to create this project`)}
    >
      <OnBoardingCard sx={{ overflow: 'visible' }}>
        <ProjectAccountSelector
          label={_(msg`Account`)}
          accounts={accounts}
          selectedAddress={selectedAddress}
          onSelect={handleAccountSelect}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        isValid={true}
        isSubmitting={false}
        dirty={false}
        onSave={navigateNext}
      />
    </OnboardingFormTemplate>
  );
};
