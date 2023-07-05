import React from 'react';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';

import { MetaDetail, Props } from '../MetaDetail/MetaDetail';

export const BatchMetadataMetaDetail: React.FC<
  Omit<Props, 'labelColor' | 'bodySize'>
> = props => (
  // <LabeledDetail label={label} labelSize="xs">
  //   <Body mobileSize="md" styleLinks={false}>
  //     {data}
  //   </Body>
  // </LabeledDetail>
  <MetaDetail labelColor="info.main" bodySize="md" {...props} />
);
