import React from 'react';
import { Box, SxProps } from '@mui/material';

import { RenderActionButtonsFunc } from 'web-components/lib/components/table/ActionsTable';
import { Label } from 'web-components/lib/components/typography';

<<<<<<< HEAD
import { EcocreditsTable, BasketsTable } from './';
import type { BatchInfoWithBalance } from '../../types/ledger/ecocredit';
import { BasketTokens } from '../../hooks/useBasketTokens';
import { DashboardTemplate } from '../templates';
=======
import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import { BasketTokens } from 'hooks/useBasketTokens';

import { BasketsTable, EcocreditsTable } from './';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

export interface PortfolioProps {
  credits?: BatchInfoWithBalance[];
  basketTokens: BasketTokens[];
  renderCreditActionButtons?: RenderActionButtonsFunc;
  renderBasketActionButtons?: RenderActionButtonsFunc;
}

const sxs = {
  title: {
    color: 'info.dark',
    mb: { xs: 4.25, sm: 8.5 },
  } as SxProps,
};

export const Portfolio: React.FC<PortfolioProps> = ({
  credits,
  basketTokens,
  renderCreditActionButtons,
  renderBasketActionButtons,
}) => {
  return (
    <DashboardTemplate>
      <Box sx={{ pt: 12.75 }}>
        <Label sx={sxs.title}>ecocredits</Label>
        <EcocreditsTable
          credits={credits}
          renderActionButtons={renderCreditActionButtons}
        />
      </Box>
      <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
        <Label sx={sxs.title}>basket tokens</Label>
        <BasketsTable
          basketTokens={basketTokens}
          renderActionButtons={renderBasketActionButtons}
        />
      </Box>
    </DashboardTemplate>
  );
};
