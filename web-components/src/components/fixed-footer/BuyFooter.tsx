import React from 'react';
import { Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import CurrentCreditsIcon from '../icons/CurrentCreditsIcon';
import ContainedButton from '../buttons/ContainedButton';
import FixedFooter from './';
import { BodyText, Title } from '../typography';

export interface CreditPrice {
  unitPrice: number;
  currency: string;
}

interface BuyFooterProps {
  creditPrice?: CreditPrice;
  href?: string;
  onClick?: () => void;
}

export default function BuyFooter({
  creditPrice,
  href,
  onClick,
}: BuyFooterProps): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <FixedFooter>
      {creditPrice && (
        <Grid item sx={{ pr: { sm: 5 } }}>
          <BodyText>
            <Title as="span" variant="h5">
              ${creditPrice.unitPrice}
            </Title>
            <BodyText as="span" size="lg" mobileSize="xs" color="info.dark">
              {' '}
              / credit {creditPrice.currency}
            </BodyText>
          </BodyText>
        </Grid>
      )}
      <Grid item>
        <ContainedButton onClick={onClick}>
          <CurrentCreditsIcon
            height={matches ? '1.625rem' : '1.375rem'}
            width={matches ? '1.75rem' : '1.5rem'}
            color={theme.palette.primary.main}
          />
          <Box component="span" sx={{ pl: [1.5, 3.5] }}>
            buy credits
          </Box>
        </ContainedButton>
      </Grid>
    </FixedFooter>
  );
}
