import React from 'react';
import { Box, SxProps } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';

import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';
import { EditButton } from '../../buttons/EditButton';

export interface ReviewCardProps {
  sx?: SxProps<Theme>;
  title: string;
  onEditClick: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  sx,
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
          // '&:first-of-type': {
          //   mt: 0,
          // },
        },
        // ...(Array.isArray(sx) ? sx : [sx]),
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
