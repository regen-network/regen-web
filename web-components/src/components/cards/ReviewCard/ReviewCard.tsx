import React from 'react';
import { SxProps } from '@mui/material';

import { Flex, FlexCol } from '../../box';
import { EditButton } from '../../buttons/EditButton';
import { Label } from '../../typography';
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
  sx = [],
}) => {
  return (
    <OnBoardingCard
      sx={[{ mt: [2.5, 2.5], mb: [0, 0] }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label size="sm">{title}</Label>
        <EditButton onClick={onEditClick} />
      </Flex>
      <FlexCol sx={{ mt: [4, 7], pb: 4, gap: [8, 10] }}>{children}</FlexCol>
    </OnBoardingCard>
  );
};
