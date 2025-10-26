import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useLingui } from '@lingui/react';

import { Loading } from 'web-components/src/components/loading';
import { Body } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';

import { useFetchProjectByAdmin } from 'pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';
import { MigrateProjects } from 'components/organisms/MigrateProjects/MigrateProjects';

import {
  CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION,
  CREATE_ORG_MIGRATE_PROJECTS_NOTE,
} from '../CreateOrganization.constants';
import { useMigrateProjects } from '../hooks/useMigrateProjects/useMigrateProjects';
import { FormStateSetter } from '../CreateOrganization.types';

type MigrateStepsStepProps = FormStateSetter;

export const MigrateProjectsStep = ({
  setIsValid,
  setIsSubmitting,
}: MigrateStepsStepProps) => {
  const { _ } = useLingui();
  const { activeAccountId, activeAccount } = useAuth();

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: activeAccountId,
    adminAddress: activeAccount?.addr,
  });

  const migrateProjects = useMigrateProjects(adminProjects);

  return (
    <div>
      <div className="text-center pb-30 sm:pb-40 max-w-[560px] mx-auto">
        <Body size="lg">{_(CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION)}</Body>
        <Body className="font-bold pt-20" size="lg">
          {_(CREATE_ORG_MIGRATE_PROJECTS_NOTE)}
        </Body>
      </div>

      {isLoadingAdminProjects ? (
        <Loading />
      ) : (
        <MigrateProjects
          projects={adminProjects}
          onSubmit={migrateProjects}
          setIsSubmitting={setIsSubmitting}
          setIsValid={setIsValid}
        />
      )}
    </div>
  );
};
