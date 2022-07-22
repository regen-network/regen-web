import React from 'react';
import { SxProps } from '@mui/material';

import type { Theme } from '~/theme/muiTheme';

import { Flex } from '../../box';
import { EditButton } from '../../buttons/EditButton';
import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';

export interface ReviewCardProps {
  title: string;
  onEditClick: () => void;
  sx?: SxProps<Theme>;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  onEditClick,
  children,
  sx,
}) => {
  return (
    <OnBoardingCard sx={sx}>
      <Flex
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label size="sm">{title}</Label>
        <EditButton onClick={onEditClick} />
      </Flex>
      {children}
    </OnBoardingCard>
  );
};
