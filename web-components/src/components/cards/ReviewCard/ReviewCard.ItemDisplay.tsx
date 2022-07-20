import React from 'react';

import { Subtitle, Body } from '../../typography';

export interface ItemDisplayProps {
  name?: string;
  value?: string | number | JSX.Element;
}

const ItemDisplay: React.FC<{
  name: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}> = props => {
  const { name, children, sx = [] } = props;
  return (
    <Box
      sx={[
        { display: 'flex', flexDirection: 'column', gap: 2 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Subtitle size="lg">{name}</Subtitle>
      <Body size="lg">{children}</Body>
    </Box>
  );
};
