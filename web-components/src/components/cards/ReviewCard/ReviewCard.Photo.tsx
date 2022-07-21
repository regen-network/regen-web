<<<<<<< HEAD
import React from 'react';
=======
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
import { CardMedia, CardMediaProps } from '@mui/material';

import Card from '../Card';

const Photo = ({ src, sx = [] }: CardMediaProps): JSX.Element => {
  return (
    <Card
      sx={{
<<<<<<< HEAD
        mt: 9,
        mb: 2,
=======
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
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
