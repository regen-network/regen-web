import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { Label } from 'web-components/lib/components/label';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';

const LabeledDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Label sx={{ color: 'info.main', fontSize: { xs: 12, sm: 14 } }}>
      {label}
    </Label>
    <Typography sx={{ fontSize: { xs: 16, sm: 18 } }}>{children}</Typography>
  </Box>
);

export const BatchDetails: React.FC = () => {
  const { batchDenom } = useParams();
  // const walletContext = useWallet();
  // const accountAddress = walletContext.wallet?.address;

  return (
    <Section>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Title variant="h2">Credit Batch Details</Title>
        <OutlinedButton size="small">view in portfolio</OutlinedButton>
      </Box>
      <LabeledDetail label="Batch Denom">{batchDenom}</LabeledDetail>
    </Section>
  );
};
