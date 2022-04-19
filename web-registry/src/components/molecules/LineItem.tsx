import React from 'react';

import { parseText } from 'web-components/lib/utils/textParser';
import { BodyText, ButtonText } from 'web-components/lib/components/typography';
import { Box } from '@mui/material';

interface LineItemProps {
  label: string;
  data: string | JSX.Element;
}

const LineItem = ({ label, data }: LineItemProps): JSX.Element => {
  return (
    <Box mt={4}>
      <ButtonText size="xs" sx={{ color: 'primary.contrastText', mb: 2 }}>
        {label}
      </ButtonText>
      <BodyText mobileSize="md">{parseText(data)}</BodyText>
    </Box>
  );
};

export { LineItem };
