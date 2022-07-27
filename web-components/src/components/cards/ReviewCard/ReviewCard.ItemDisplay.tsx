import React, { ReactNode } from 'react';
import { SxProps } from '@mui/material';

import { FlexCol } from '../../box';
import { Body, Subtitle } from '../../typography';

import type { Theme } from '~/theme/muiTheme';

export const ItemDisplay = (props: {
  name: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element => {
  const { name, children, sx = [] } = props;
  return (
    <FlexCol sx={[{ gap: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Subtitle size="lg">{name}</Subtitle>
      <Body size="lg">{children}</Body>
    </FlexCol>
  );
};
