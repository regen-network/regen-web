import React from 'react';

import { parseText } from 'web-components/lib/utils/textParser';
import { Body, Label } from 'web-components/lib/components/typography';
import { Box } from '@mui/material';

interface LineItemProps {
  label: string;
  data: string | JSX.Element;
}

const LineItem = ({ label, data }: LineItemProps): JSX.Element => {
  return (
    <Box mt={4}>
      <Label size="xs" sx={{ color: 'primary.contrastText', mb: 2 }}>
        {label}
      </Label>
      <Body mobileSize="md">{parseText(data)}</Body>
    </Box>
  );
};

export { LineItem };
