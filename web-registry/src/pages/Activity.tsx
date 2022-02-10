import React from 'react';
import Box from '@mui/material/Box';
import Section from 'web-components/lib/components/section';

import { CreditActivityTable, CreditTotals } from '../components/organisms';

const Activity: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="Activity" titleVariant="h3" titleAlign="left">
        <CreditTotals />
        <CreditActivityTable />
      </Section>
    </Box>
  );
};

export { Activity };
