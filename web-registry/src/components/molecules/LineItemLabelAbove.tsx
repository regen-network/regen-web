import React from 'react';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

import { Body, Label } from 'web-components/lib/components/typography';

export interface LineItemLabelAboveProps {
  sx?: SxProps<Theme>;
  label: string;
  data?: string | JSX.Element | number;
}

// TODO should this be consolidated with the LineItem component?
const LineItemLabelAbove: React.FC<
  React.PropsWithChildren<LineItemLabelAboveProps>
> = ({ sx, label, data }) => {
  if (!data) return null;
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '50%' },
        pr: [0, 8],
        mb: 8,
        ...sx,
      }}
    >
      <Label
        size="xs"
        sx={{
          fontSize: { xs: '12px' },
          color: 'primary.contrastText',
          mb: 3,
        }}
      >
        {label}
      </Label>
      {typeof data === 'string' ? <Body size="xl">{data}</Body> : <>{data}</>}
    </Box>
  );
};

export { LineItemLabelAbove };
