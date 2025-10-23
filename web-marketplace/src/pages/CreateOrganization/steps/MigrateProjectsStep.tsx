import { useLingui } from '@lingui/react';

import { Body } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';

import { useFetchProjectByAdmin } from 'pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';

import {
  CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION,
  CREATE_ORG_MIGRATE_PROJECTS_NOTE,
} from '../CreateOrganization.constants';
import { MigrateProjects } from 'components/organisms/MigrateProjects/MigrateProjects';
import { Loading } from 'web-components/src/components/loading';
import { useMigrateProjects } from '../hooks/useMigrateProjects/useMigrateProjects';
import { forwardRef } from 'react';
import { MultiStepFormApi } from '../CreateOrganization.types';

export const MigrateProjectsStep = forwardRef<MultiStepFormApi>(
  (_props, ref) => {
    const { _ } = useLingui();
    const { activeAccountId, activeAccount } = useAuth();

    const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
      adminAccountId: activeAccountId,
      adminAddress: activeAccount?.addr,
    });

    const migrateProjects = useMigrateProjects();

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
            ref={ref}
            projects={adminProjects}
            onSubmit={migrateProjects}
          />
        )}
      </div>
    );
  },
);
