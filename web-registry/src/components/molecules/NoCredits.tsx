import React from 'react';
import { Box } from '@mui/material';

import { StyledTableContainer } from 'web-components/lib/components/table';
import { Title } from 'web-components/lib/components/typography';

import { ReactComponent as CloudData } from '../../assets/svgs/cloud-data.svg';

const NoCredits: React.FC<{
  title: string;
  icon?: JSX.Element;
}> = ({ title, icon }) => {
  return (
    <StyledTableContainer>
      <Box
        sx={{
          minHeight: 230,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
