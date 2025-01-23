import { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { startCase } from 'lodash';

import type { Option } from 'web-components/src/components/inputs/SelectTextField';

import { TranslatorType } from 'lib/i18n/i18n.types';

import type { ProjectWithMetadataObj as Project } from '../../../../types/ledger/ecocredit';

const getDefaultProjectOption = (_: TranslatorType) => ({
  value: '',
  label: _(msg`Choose Project`),
});

export default function useUpdateProjectOptions(projects: Project[]): Option[] {
  const { _ } = useLingui();
  const defaultProjectOption = useMemo(() => getDefaultProjectOption(_), [_]);

  const projectOptions = useMemo(
    () =>
      projects.length
        ? [
            defaultProjectOption,
            ...(projects.map((project: Project) => {
              const projectId = project.id;
              const projectName = startCase(
                project?.metadata?.['schema:name'] || '',
              );
              const projectNameWithId = `${projectName} (${projectId})`;
              return {
                label: projectName ? projectNameWithId : projectId,
                value: projectId,
              };
            }) || []),
          ]
        : [],
    [defaultProjectOption, projects],
  );

  return projectOptions;
}
