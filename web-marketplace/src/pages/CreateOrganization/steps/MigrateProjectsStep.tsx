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
import { MultiStepFormApi } from '../CreateOrganization.types';
import { useMigrateProjects } from '../hooks/useMigrateProjects/useMigrateProjects';

export const MigrateProjectsStep = forwardRef<MultiStepFormApi>(
  (_props, ref) => {
    const { _ } = useLingui();
    const { activeAccountId, activeAccount } = useAuth();

    const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
      adminAccountId: activeAccountId,
      adminAddress: activeAccount?.addr,
    });

    const migrateProjects = useMigrateProjects(adminProjects);

    const innerRef = useRef<MultiStepFormApi>(null);
    // console.log('innerREF', innerRef.current, innerRef.current?.isValid());
    // console.log('ref', ref?.current, ref?.current?.isValid());
    // useImperativeHandle(
    //   ref,
    //   () => ({
    //     trigger: (names?: string | string[]) =>
    //       innerRef.current?.trigger?.(names) ?? Promise.resolve(false),
    //     submit: () => innerRef.current?.submit?.() ?? Promise.resolve(),
    //     isSubmitting: () => innerRef.current?.isSubmitting?.() ?? false,
    //     isValid: () => innerRef.current?.isValid?.() ?? false,
    //   }),
    //   [],
    // );
    useImperativeHandle(
      ref,
      () => ({
        trigger: names =>
          innerRef.current?.trigger?.(names) ?? Promise.resolve(false),
        submit: () => innerRef.current?.submit?.() ?? Promise.resolve(),
        isSubmitting: () => innerRef.current?.isSubmitting?.() ?? false,
        isValid: () => innerRef.current?.isValid?.() ?? false,
      }),
      [],
    );

    return (
      <div>
        <div className="text-center pb-30 sm:pb-40 max-w-[560px] mx-auto">
          <Body size="lg">{_(CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION)}</Body>
          <Body className="font-bold pt-20" size="lg">
            {_(CREATE_ORG_MIGRATE_PROJECTS_NOTE)}
          </Body>
        </div>
        <MigrateProjects
          ref={innerRef}
          projects={adminProjects}
          onSubmit={migrateProjects}
        />
        {/* {isLoadingAdminProjects ? (
          <Loading />
        ) : (
          <MigrateProjects
            ref={ref}
            projects={adminProjects}
            onSubmit={migrateProjects}
          />
        )} */}
      </div>
    );
  },
);
