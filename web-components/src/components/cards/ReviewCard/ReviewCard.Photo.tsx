import React from 'react';
import { CardMedia, CardMediaProps } from '@mui/material';

import Card from '../Card';

const Photo = ({ src, sx = [] }: CardMediaProps): JSX.Element => {
  return (
    <Card
      sx={{
        mt: 9,
        mb: 2,
        height: [216, 293],
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      <CardMedia
        sx={{ height: { xs: 216, sm: 293 } }}
        component="img"
        src={src}
      />
    </Card>
  );
};

export { Photo };
