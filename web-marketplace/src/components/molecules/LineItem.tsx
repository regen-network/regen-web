import React from 'react';
import { Box } from '@mui/material';

import { Body, Label } from 'web-components/src/components/typography';
import { parseText } from 'web-components/src/utils/textParser';

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
      <Body as="div" mobileSize="md">
        {parseText(data)}
      </Body>
    </Box>
  );
};

export { LineItem };
