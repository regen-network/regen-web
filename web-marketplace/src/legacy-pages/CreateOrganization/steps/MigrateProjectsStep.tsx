import { useLingui } from '@lingui/react';

import { Body } from 'web-components/src/components/typography';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { FormRef } from 'components/molecules/Form/Form';
import { MigrateProjects } from 'components/organisms/MigrateProjects/MigrateProjects';

import {
  CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION,
  CREATE_ORG_MIGRATE_PROJECTS_NOTE,
} from '../CreateOrganization.constants';
import { FormStateSetter } from '../CreateOrganization.types';
import { useMigrateProjects } from '../hooks/useMigrateProjects/useMigrateProjects';

type MigrateStepsStepProps = {
  projects: NormalizeProject[];
  formRef?: FormRef;
} & FormStateSetter;

export const MigrateProjectsStep = ({
  setIsValid,
  setIsSubmitting,
  projects,
  formRef,
}: MigrateStepsStepProps) => {
  const { _ } = useLingui();

  const { migrateProjects } = useMigrateProjects(projects);

  return (
    <div>
      <div className="text-center pb-30 sm:pb-40 max-w-[560px] mx-auto">
        <Body size="lg">{_(CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION)}</Body>
        <Body className="font-bold pt-20" size="lg">
          {_(CREATE_ORG_MIGRATE_PROJECTS_NOTE)}
        </Body>
      </div>

      <MigrateProjects
        projects={projects}
        onSubmit={migrateProjects}
        setIsSubmitting={setIsSubmitting}
        setIsValid={setIsValid}
        formRef={formRef}
      />
    </div>
  );
};
