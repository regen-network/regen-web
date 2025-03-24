import { Trans } from '@lingui/macro';

import { Label } from 'web-components/src/components/typography';

/** Label component for drag-and-drop UI, with internationalization support.
 * Usually used in FileDrop web-component.
 */
export const DragAndDropLabel = () => (
  <Trans>
    <Label size="xs" mb={2}>
      drag and drop
    </Label>
    <span className="mb-4 text-xs">or</span>
  </Trans>
);
