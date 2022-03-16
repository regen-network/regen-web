import React from 'react';
import Box from '@mui/material/Box';

import Description from 'web-components/lib/components/description';
import { Label } from 'web-components/lib/components/label';

interface LineItemProps {
  label: string;
  data: string | JSX.Element;
}

export const LineItemLabelAbove: React.FC<LineItemProps> = ({
  label,
  data,
}) => {
  if (!data) return null;
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '50%' },
        pr: 4,
        mb: { xs: 8.75, sm: 12 },
      }}
    >
      <Label
        sx={{
          fontSize: { sm: '12px' },
          color: 'primary.contrastText',
          marginBottom: 3,
        }}
      >
        {label}
      </Label>
      {typeof data === 'string' ? (
        <Description sx={{ fontSize: { xs: '18px', sm: '22px' } }}>
          {data}
        </Description>
      ) : (
        <>{data}</>
      )}
    </Box>
  );
};
