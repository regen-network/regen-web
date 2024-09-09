import React from 'react';
import { SxProps } from '@mui/material';

import type { Theme } from '../../../theme/muiTheme';
import { Flex } from '../../box';
import { EditButton } from '../../buttons/EditButton';
import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';

export interface ReviewCardProps {
  title: string;
  editText: string;
  onEditClick: () => void;
  sx?: SxProps<Theme>;
}

export const ReviewCard: React.FC<React.PropsWithChildren<ReviewCardProps>> = ({
  title,
  editText,
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
        <EditButton buttonText={editText} onClick={onEditClick} />
      </Flex>
      <Flex col sx={{ mt: [4, 7], pb: 4, gap: [8, 10] }}>
        {children}
      </Flex>
    </OnBoardingCard>
  );
};
