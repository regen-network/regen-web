import { useEffect, useState } from 'react';
import { startCase } from 'lodash';

import type { Option } from 'web-components/src/components/inputs/SelectTextField';

import type { ProjectWithMetadataObj as Project } from '../../../../types/ledger/ecocredit';

const defaultProjectOption = { value: '', label: 'Choose Project' };

export default function useUpdateProjectOptions(projects: Project[]): Option[] {
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

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
  }, [projects, setProjectOptions]);

  return projectOptions;
}
