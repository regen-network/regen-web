import { ReactNode } from 'react';
import { SxProps } from '@mui/material';

import type { Theme } from '../../../theme/muiTheme';
import { Flex } from '../../box';
import { Body, Subtitle } from '../../typography';

export const ItemDisplay = (props: {
  name?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element => {
  const { name, children, sx = [] } = props;
  return (
    <Flex col sx={[{ gap: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {!!name && <Subtitle size="lg">{name}</Subtitle>}
      <Body size="lg">{children}</Body>
    </Flex>
  );
};
