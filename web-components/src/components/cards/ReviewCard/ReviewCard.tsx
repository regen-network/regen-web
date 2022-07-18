import React from 'react';
import { Box } from '@mui/material';

import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';
import { EditButton } from '../../buttons/EditButton';

export interface ReviewCardProps {
  title: string;
  onEditClick: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  onEditClick,
  children,
}) => {
  return (
    <OnBoardingCard
      sx={[
        {
          mt: 5,
          mb: 0,
        },
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
