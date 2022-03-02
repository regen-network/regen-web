import React from 'react';
import { Box } from '@mui/material';

import { StyledTableContainer } from 'web-components/lib/components/table';
import Title from 'web-components/lib/components/title';

import { ReactComponent as CloudData } from '../../assets/svgs/cloud-data.svg';

const NoEcocredits: React.FC<{ title: string }> = ({ title }) => {
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
        <CloudData />
        <Title variant="h4" sx={{ mt: 5 }}>
          {title}
        </Title>
      </Box>
    </StyledTableContainer>
  );
};

export { NoEcocredits };
