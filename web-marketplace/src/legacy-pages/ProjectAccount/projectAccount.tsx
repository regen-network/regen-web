import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';
import { useNavigateNext } from 'web-marketplace/src/legacy-pages/ProjectCreate/hooks/useNavigateNext';
import { z } from 'zod';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';

import { AccountType } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';

import { ProjectPageFooter } from 'components/molecules';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';
import { ProjectAccountSelector } from 'components/organisms/ProjectAccountSelector/ProjectAccountSelector';
import { OnboardingFormTemplate } from 'components/templates/ProjectFormTemplate/OnboardingFormTemplate';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';

import { useCreateProjectContext } from '../ProjectCreate/ProjectCreate';

export const ProjectAccount = (): JSX.Element | null => {
  const { _ } = useLingui();
  const { projectId } = useParams();
  const { activeAccount } = useAuth();
  const dao = useDaoOrganization();
  const { isIssuer } = useQueryIsIssuer({
    address: activeAccount?.addr,
  });
  const { navigateNext } = useNavigateNext({
    step: isIssuer ? 'choose-credit-class' : 'basic-info',
    projectId,
  });
  const {
    projectCreatorAddress,
    setProjectCreatorAddress,
    setIsOrganizationAccount,
    formRef,
    isDraftRef,
  } = useCreateProjectContext();

  const form = useZodForm({
    schema: z.object({}),
    defaultValues: {},
    isDraftRef,
    mode: 'onBlur',
  });

  // Get the user's role and check if they have permission to create projects for the org
  const organizationRole = dao?.assignmentsByDaoAddress?.nodes?.find(
    node => node?.accountId === activeAccount?.id,
  )?.roleName;

  // Skip this step if user doesn't have a DAO organization or is not admin or owner for the org
  if (
    !dao ||
    !activeAccount ||
    !(organizationRole === 'owner' || organizationRole === 'admin')
  ) {
    navigateNext();
    return null;
  }

  // Build the two account options: personal and organization
  const personalAccount: AccountOption = {
    name: activeAccount.name || '',
    address: activeAccount.addr || '',
    type: 'user' as const,
    image:
      activeAccount.image ||
      getDefaultAvatar({
        ...activeAccount,
        type: activeAccount.type ?? AccountType.User,
      }),
    displayName: _(msg`Personal`),
  };

  const organizationAccount: AccountOption = {
    name: dao.organizationByDaoAddress?.name || '',
    address: dao.address ?? '',
    type: 'org' as const,
    image: getDefaultAvatar({
      type: AccountType.Organization,
    }),
    displayName: _(msg`Organization`),
  };

  const accounts: [AccountOption, AccountOption] = [
    personalAccount,
    organizationAccount,
  ];

  // Set default selected account to organization on first render
  const defaultSelectedAddress =
    projectCreatorAddress || organizationAccount.address;

  const handleAccountSelect = (address: string) => {
    const selected = accounts.find(opt => opt.address === address);
    if (selected) {
      setProjectCreatorAddress(address);
      setIsOrganizationAccount(selected.type === 'org');
    }
  };

  return (
    <OnboardingFormTemplate
      activeStep={0}
      title={_(msg`Choose where to create this project`)}
    >
      <Form
        form={form}
        formRef={formRef}
        isDraftRef={isDraftRef}
        onSubmit={() => {
          navigateNext();
        }}
      >
        <OnBoardingCard sx={{ overflow: 'visible' }}>
          <ProjectAccountSelector
            label={_(msg`Account`)}
            accounts={accounts}
            selectedAddress={defaultSelectedAddress}
            onSelect={handleAccountSelect}
          />
        </OnBoardingCard>
        <ProjectPageFooter isValid={true} isSubmitting={false} dirty={false} />
      </Form>
    </OnboardingFormTemplate>
  );
};
