import React from 'react';
import { Box } from '@mui/material';

import { Subtitle } from '../typography';

export interface ItemProps {
  name: string;
  imgSrc: string;
}
export default function Item({ name, imgSrc }: ItemProps): JSX.Element {
  return (
    <Box pl={5}>
      <Box
        component="img"
        src={imgSrc}
        alt={name}
        sx={{ borderRadius: '5px' }}
      />
      <Subtitle
        size="sm"
        sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      >
        {name}
      </Subtitle>
    </Box>
  );
}
