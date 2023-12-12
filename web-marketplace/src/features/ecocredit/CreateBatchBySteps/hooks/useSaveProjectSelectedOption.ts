import { useEffect } from 'react';

import type { Option } from 'web-components/src/components/inputs/SelectTextField';

import type { ProjectWithMetadataObj as Project } from '../../../../types/ledger/ecocredit';

interface Props {
  projectId: string;
  projectOptions: Option[];
  projects: Project[];
  saveProjectOptionSelected: (isFound: Option) => void;
}

export default function useSaveProjectSelectedOption({
  projectId,
  projectOptions,
  projects,
  saveProjectOptionSelected,
}: Props): void {
  useEffect(() => {
    if (!projectId || !projects.length) return;

    const isFound = projectOptions?.find(
      item => item.value.toString() === projectId.toString(),
    );
    if (isFound) saveProjectOptionSelected(isFound);
  }, [projectId, projectOptions, projects, saveProjectOptionSelected]);
}
