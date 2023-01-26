import React from 'react';
import { Box, SxProps } from '@mui/material';

import {
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import { Label } from 'web-components/lib/components/typography';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { nctBasket } from 'lib/ledger';

import { BasketTokens } from 'hooks/useBasketTokens';

import { BasketsTable, EcocreditsTable } from './';

export interface PortfolioProps {
  credits?: BatchInfoWithBalance[];
  basketTokens: BasketTokens[];
  renderCreditActionButtons?: RenderActionButtonsFunc;
  renderBasketActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
}

const sxs = {
  title: {
    color: 'info.dark',
    mb: { xs: 4.25, sm: 8.5 },
  } as SxProps,
};

export const Portfolio: React.FC<React.PropsWithChildren<PortfolioProps>> = ({
  credits,
  basketTokens,
  renderCreditActionButtons,
  renderBasketActionButtons,
  onTableChange,
  initialPaginationParams,
  isIgnoreOffset = false,
}) => {
  return (
    <Box>
      <Box>
        <Label sx={sxs.title}>ecocredits</Label>
        <EcocreditsTable
          credits={credits}
          renderActionButtons={renderCreditActionButtons}
          onTableChange={onTableChange}
          initialPaginationParams={initialPaginationParams}
          isIgnoreOffset={isIgnoreOffset}
        />
      </Box>

      {nctBasket && (
        <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
          <Label sx={sxs.title}>basket tokens</Label>
          <BasketsTable
            basketTokens={basketTokens}
            renderActionButtons={renderBasketActionButtons}
          />
        </Box>
      )}
    </Box>
  );
};
