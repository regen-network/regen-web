import { useEffect } from 'react';

import type { Option } from 'web-components/src/components/inputs/SelectTextField';

interface Props {
  /** The ID of the project to be matched. */
  projectId: string;
  /** The list of available project options to search through. */
  projectOptions: Option[];
  /** Callback function to be triggered when a matching option is found. */
  saveProjectOptionSelected: (isFound: Option) => void;
}

/**
 * Triggers a callback whenever a selected ID matches an option from a list.
 *
 * @param props - See {@link Props}
 * @returns {void}
 */
export default function useSaveProjectSelectedOption({
  projectId,
  projectOptions,
  saveProjectOptionSelected,
}: Props): void {
  useEffect(() => {
    if (!projectId) return;
    const isFound = projectOptions?.find(
      item => item.value.toString() === projectId.toString(),
    );
    if (isFound) saveProjectOptionSelected(isFound);
    // adding projectOptions to dep array would cause infinite re-renders because it's an array,
    // it's ok since at the time projectId changes, projectOptions has became stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, saveProjectOptionSelected]);
}
