import React from 'react';
import { Box, SxProps } from '@mui/material';
import Image from 'next/image';
import { sxToArray } from 'utils/mui/sxToArray';

import { StyledTableContainer } from 'web-components/src/components/table';
import { Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import cloudData from '../../../public/svg/cloud-data.svg';

const NoCredits: React.FC<
  React.PropsWithChildren<{
    title: string;
    icon?: JSX.Element;
    sx?: SxProps<Theme>;
    className?: string;
  }>
> = ({ title, icon, sx = [], className }) => {
  return (
    <StyledTableContainer>
      <Box
        className={className}
        sx={[
          {
            minHeight: 230,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
          ...sxToArray(sx),
        ]}
      >
        {icon ?? <Image src={cloudData} alt="" />}
        <Title variant="h4" sx={{ mt: 5 }}>
          {title}
        </Title>
      </Box>
    </StyledTableContainer>
  );
};

export { NoCredits };
