import React from 'react';

import { MetaDetail, Props } from '../MetaDetail/MetaDetail';

export const BatchMetadataMetaDetail: React.FC<
  Omit<Props, 'labelColor' | 'bodySize'>
> = props => <MetaDetail labelColor="info.main" bodySize="md" {...props} />;
