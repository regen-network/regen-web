import { useEffect, useMemo, useState } from 'react';
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
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);
  const defaultProjectOption = useMemo(() => getDefaultProjectOption(_), [_]);

  useEffect(() => {
    if (!projects.length) return;

    const options =
      projects.map((project: Project) => {
        const projectId = project.id;
        const projectName = startCase(project?.metadata?.['schema:name'] || '');
        const projectNameWithId = `${projectName} (${projectId})`;
        return {
          label: projectName ? projectNameWithId : projectId,
          value: projectId,
        };
      }) || [];

    setProjectOptions([defaultProjectOption, ...options]);
  }, [defaultProjectOption, projects, setProjectOptions]);

  return projectOptions;
}
