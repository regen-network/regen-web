import React from 'react';
import {
  CardMedia,
  CardMediaProps,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import Card from '../Card';

const Photo: React.FC<CardMediaProps> = ({ src }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        mt: 9,
        mb: 2,
        height: [216, 293],
      }}
    >
      <CardMedia component="img" src={src} height={isMobile ? 216 : 293} />
    </Card>
  );
};

export { Photo };
