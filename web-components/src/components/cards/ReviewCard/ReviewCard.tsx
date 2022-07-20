import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';
import { EditButton } from '../../buttons/EditButton';

export interface ReviewCardProps {
  title: string;
  onEditClick: () => void;
  sx?: SxProps<Theme>;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  onEditClick,
  children,
  sx = [],
}) => {
  return (
    <OnBoardingCard
      sx={[
        {
          mt: [2.5],
          mb: [0],
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label size="sm">{title}</Label>
        <EditButton onClick={onEditClick} />
      </Box>
      {children}
    </OnBoardingCard>
  );
};

export { ReviewCard };
