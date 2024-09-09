import { Trans } from '@lingui/macro';

import { Label } from 'web-components/src/components/typography';

export const DragAndDropLabel = () => (
  <Trans>
    <Label size="xs" mb={2}>
      drag and drop
    </Label>
    <span className="mb-4 text-xs">or</span>
  </Trans>
);
