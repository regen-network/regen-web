import React from 'react';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';

export const MetaDetail: React.FC<React.PropsWithChildren<{ label: string }>> =
  ({ label, children }) => (
    <LabeledDetail
      sxLabel={{ color: 'primary.contrastText' }}
      label={label}
      labelSize="xs"
    >
      <Body size="xl" sx={{ mr: 1 }}>
        {children}
      </Body>
    </LabeledDetail>
  );
