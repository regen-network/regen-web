import React from 'react';
<<<<<<< HEAD
import { Box, SxProps, Theme } from '@mui/material';

import { Label } from '../../typography';
import OnBoardingCard from '../OnBoardingCard';
import { EditButton } from '../../buttons/EditButton';

=======
import { SxProps } from '@mui/material';
import { Flex } from '../../box';

import { Label } from '../../typography';
import { EditButton } from '../../buttons/EditButton';

import OnBoardingCard from '../OnBoardingCard';
import type { Theme } from '~/theme/muiTheme';

>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
export interface ReviewCardProps {
  title: string;
  onEditClick: () => void;
  sx?: SxProps<Theme>;
}

<<<<<<< HEAD
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
=======
export const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  onEditClick,
  children,
  sx,
}) => {
  return (
    <OnBoardingCard sx={sx}>
      <Flex
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label size="sm">{title}</Label>
        <EditButton onClick={onEditClick} />
<<<<<<< HEAD
      </Box>
=======
      </Flex>
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
      {children}
    </OnBoardingCard>
  );
};
<<<<<<< HEAD

export { ReviewCard };
=======
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
