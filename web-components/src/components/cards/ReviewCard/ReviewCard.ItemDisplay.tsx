import React from 'react';

import { Subtitle, Body } from '../../typography';

export interface ItemDisplayProps {
  name?: string;
  value?: string | number;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ name, value }) => {
  return (
    <>
      <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
        {name}
      </Subtitle>
      <Body size="lg">{value}</Body>
    </>
  );
};

export { ItemDisplay };
