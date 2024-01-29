import React from 'react';
import { Box, Grid } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import NoBasketTokensIcon from 'web-components/src/components/icons/NoBasketTokensIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/src/components/table/ActionsTable';
import { formatNumber } from 'web-components/src/utils/format';

import { ReactComponent as BasketIcon } from '../../assets/svgs/rNCT.svg';
import { BasketTokens } from '../../hooks/useBasketTokens';
import { NoCredits } from '../molecules';

type BasketTableProps = {
  basketTokens: BasketTokens[];
  renderActionButtons?: RenderActionButtonsFunc;
};

export const BasketsTable: React.FC<React.PropsWithChildren<BasketTableProps>> =
  ({ basketTokens, renderActionButtons }) => {
    if (!basketTokens?.length) {
      return (
        <NoCredits
          title="No basket tokens to display"
          icon={<NoBasketTokensIcon sx={{ width: 100, height: 100 }} />}
        />
      );
    }

    return (
      <ActionsTable
        tableLabel="baskets table"
        renderActionButtons={renderActionButtons}
        headerRows={[
          /* eslint-disable react/jsx-key */
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
          'Amount available',
        ]}
        rows={basketTokens.map((row, i) => {
          return [
            <Grid container wrap="nowrap">
              <Grid item>
                <BasketIcon />
              </Grid>
              <Grid
                item
                sx={{ ml: 3.5, pb: 2, fontWeight: 700 }}
                alignSelf="center"
              >
                <Box sx={{ fontSize: theme => theme.spacing(4.5) }}>
                  {row.basket?.name}
                </Box>
                <Box sx={{ color: 'info.main' }}>
                  {row.metadata?.metadata?.display.toLocaleString()}
                </Box>
              </Grid>
            </Grid>,
            row.balance?.balance?.amount
              ? formatNumber({
                  num:
                    parseInt(row.balance?.balance?.amount) /
                    Math.pow(10, row.basket?.exponent ?? 0),
                  ...quantityFormatNumberOptions,
                })
              : 0,
          ];
          /* eslint-enable react/jsx-key */
        })}
      />
    );
  };
