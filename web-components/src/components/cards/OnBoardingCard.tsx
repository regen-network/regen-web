import React from 'react';
import { SxProps, Theme } from '@mui/material';

import Card from './Card';

type Props = {
  className?: string;
  sx?: SxProps<Theme>;
};

const OnBoardingCard: React.FC<Props> = ({ children, className, sx = [] }) => {
  return (
    <Card
      borderColor="grey.100"
      className={className}
      sx={[
        {
          mx: 0,
          mt: [6.5, 9],
          mb: [10, 12],
          px: [2.5, 10],
          pt: [8.5, 13.5],
          pb: [10, 12.5],
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Card>
  );
};

export default OnBoardingCard;
