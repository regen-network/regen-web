import { useEffect, useMemo } from 'react';

import type { Option } from 'web-components/src/components/inputs/SelectTextField';

interface Props {
  projectId: string;
  projectOptions: Option[];
  saveProjectOptionSelected: (isFound: Option) => void;
}

export default function useSaveProjectSelectedOption({
  projectId,
  projectOptions,
  saveProjectOptionSelected,
}: Props): void {
  const memProjectOptions = useMemo(() => projectOptions, [projectOptions]);
  useEffect(() => {
    if (!projectId) return;
    const isFound = memProjectOptions?.find(
      item => item.value.toString() === projectId.toString(),
    );
    if (isFound) saveProjectOptionSelected(isFound);
    // adding projectOptions to dep array would cause infinite re-renders because it's an array,
    // it's ok since at the time projectId changes, projectOptions has became stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, saveProjectOptionSelected]);
}
