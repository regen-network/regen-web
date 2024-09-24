import React, { useMemo } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Grid } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import NoBasketTokensIcon from 'web-components/src/components/icons/NoBasketTokensIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/src/components/table/ActionsTable';
import { formatNumber } from 'web-components/src/utils/format';

import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';

import { ReactComponent as BasketIcon } from '../../assets/svgs/rNCT.svg';
import { BasketTokens } from '../../hooks/useBasketTokens';
import { NoCredits } from '../molecules';

type BasketTableProps = {
  basketTokens: BasketTokens[];
  renderActionButtons?: RenderActionButtonsFunc;
};

export const BasketsTable: React.FC<React.PropsWithChildren<BasketTableProps>> =
  ({ basketTokens, renderActionButtons }) => {
    const { _ } = useLingui();

    const labelDisplayedRows = useMemo(
      () =>
        getLabelDisplayedRows({
          _,
          rowsLength: basketTokens.length,
        }),
      [_, basketTokens],
    );

    if (!basketTokens?.length) {
      return (
        <NoCredits
          title={_(msg`No basket tokens to display`)}
          icon={<NoBasketTokensIcon sx={{ width: 100, height: 100 }} />}
        />
      );
    }

    return (
      <ActionsTable
        tableLabel={_(msg`baskets table`)}
        labelDisplayedRows={labelDisplayedRows}
        actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
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
            <Trans>Asset</Trans>
          </Box>,
          <Trans>Amount available</Trans>,
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
