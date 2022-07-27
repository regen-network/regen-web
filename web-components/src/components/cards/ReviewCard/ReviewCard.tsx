import React from 'react';
<<<<<<< HEAD
import { Box, SxProps, Theme } from '@mui/material';

import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';
import { EditButton } from '../../buttons/EditButton';
=======
import { SxProps } from '@mui/material';

import { Flex } from '../../box';
import { EditButton } from '../../buttons/EditButton';
import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';

import type { Theme } from '~/theme/muiTheme';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

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
