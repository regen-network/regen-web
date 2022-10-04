import React from 'react';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';

export const MetaDetail: React.FC<{ label: string }> = ({
  label,
  children,
}) => (
  <LabeledDetail label={label} labelSize="xs">
    <Body mobileSize="md" styleLinks={false}>
      {children}
    </Body>
  </LabeledDetail>
);
