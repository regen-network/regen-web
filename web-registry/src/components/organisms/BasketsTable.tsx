import React from 'react';
import { Box, Grid } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatNumber } from 'web-components/lib/utils/format';

import { BasketTokens } from '../../hooks/useBasketTokens';
import { NoCredits } from '../molecules';
import { ReactComponent as BasketIcon } from '../../assets/svgs/rNCT.svg';

export const BasketsTable: React.FC<{
  baskets: BasketTokens[];
  renderActionButtons?: RenderActionButtonsFunc;
}> = ({ baskets, renderActionButtons }) => {
  if (!baskets?.length) {
    return <NoCredits title="No basket tokens to display" />;
  }
  return (
    <ActionsTable
      tableLabel="baskets table"
      renderActionButtons={renderActionButtons}
      headerRows={[
        <Box
          sx={{
            minWidth: {
              xs: 'auto',
              sm: '11rem',
              lg: '13rem',
            },
          }}
        >
          Asset
        </Box>,
        'Balance',
      ]}
      rows={baskets.map((row, i) => {
        return [
          <Grid container wrap="nowrap">
            <Grid item>
              <BasketIcon />
            </Grid>
            <Grid item sx={{ ml: 3.5, fontWeight: 700 }} alignSelf="center">
              <Box sx={{ fontSize: theme => theme.spacing(4.5) }}>
                {row.basket.name}
              </Box>
              <Box sx={{ color: 'info.main' }}>
                {row.displayDenom.toLocaleString()}
              </Box>
            </Grid>
          </Grid>,
          row.balance?.balance?.amount
            ? formatNumber(
                parseInt(row.balance?.balance?.amount) /
                  Math.pow(10, row.basket.exponent),
              )
            : 0,
        ];
      })}
    />
  );
};
