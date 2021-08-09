import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import { CreditsIssue } from './CreditsIssue';
import { CreditsTransfer } from './CreditsTransfer';
import { CreditsRetire } from './CreditsRetire';
import { BuyerCreate } from './BuyerCreate';

const CreditsPortal: React.FC = () => {
  return (
    <Box>
      <BuyerCreate />
      <CreditsIssue />
      <CreditsTransfer />
      <CreditsRetire />
    </Box>
  );
};

export { CreditsPortal };
