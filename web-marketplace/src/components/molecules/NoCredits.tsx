import React from 'react';
import { Box, SxProps } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import { StyledTableContainer } from 'web-components/lib/components/table';
import { Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { ReactComponent as CloudData } from '../../assets/svgs/cloud-data.svg';

const NoCredits: React.FC<
  React.PropsWithChildren<{
    title: string;
    icon?: JSX.Element;
    sx?: SxProps<Theme>;
  }>
> = ({ title, icon, sx = [] }) => {
  return (
    <StyledTableContainer>
      <Box
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
        {icon ?? <CloudData />}
        <Title variant="h4" sx={{ mt: 5 }}>
          {title}
        </Title>
      </Box>
    </StyledTableContainer>
  );
};

export { NoCredits };
