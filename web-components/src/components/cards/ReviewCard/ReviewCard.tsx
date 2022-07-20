import React from 'react';
import { SxProps } from '@mui/material';
import { Flex } from '../../box';

import { Label } from '../../typography';
import { EditButton } from '../../buttons/EditButton';

import OnBoardingCard from '../OnBoardingCard';
import type { Theme } from '~/theme/muiTheme';

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
