import { Box, SxProps } from '@mui/material';

import GradientBadge from '../../../components/gradient-badge';
import InfoTooltipWithIcon from '../../../components/tooltip/InfoTooltipWithIcon';
import { Body, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import {
  AVG_PRICE_LABEL,
  ERROR_CARD_PRICE,
  SOLD_OUT,
} from './ProjectCard.constants';
import { PurchaseInfo } from './ProjectCard.types';

type Props = {
  purchaseInfo?: PurchaseInfo;
  isSoldOut?: boolean;
  priceTooltip?: string;
  creditsTooltip?: string;
  sx?: SxProps<Theme>;
};

export const CreditPrice = ({
  purchaseInfo,
  priceTooltip,
  creditsTooltip,
  isSoldOut,
  sx,
}: Props) => {
  const avgPricePerTonLabel = purchaseInfo?.sellInfo?.avgPricePerTonLabel;

  return (
    <Box
      sx={[
        {
          display: 'flex',
          justifyContent: 'space-between',
        },
        ...sxToArray(sx),
      ]}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Subtitle
            size="xs"
            mobileSize="xxs"
            color="info.main"
            sx={{
              mr: 1,
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {AVG_PRICE_LABEL}
          </Subtitle>
          {priceTooltip && (
            <InfoTooltipWithIcon
              title={priceTooltip}
              sx={{ width: 20, height: 20 }}
              outlined
            />
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          {purchaseInfo?.sellInfo?.denomLogo}
          <Body
            size="md"
            mobileSize="sm"
            sx={{
              fontWeight: 700,
              ml: purchaseInfo?.sellInfo?.denomLogo ? 2 : 0,
              color:
                purchaseInfo?.sellInfo && !avgPricePerTonLabel
                  ? 'error.dark'
                  : 'primary.contrastText',
            }}
          >
            {purchaseInfo?.sellInfo
              ? avgPricePerTonLabel ?? ERROR_CARD_PRICE
              : '-'}
          </Body>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Subtitle
          size="xs"
          mobileSize="xxs"
          color="info.main"
          sx={{ mb: 1, fontWeight: 800 }}
        >
          {'CREDITS AVAILABLE'}
        </Subtitle>
        <Body
          size="md"
          mobileSize="sm"
          sx={{
            fontWeight: 700,
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isSoldOut ? (
            <GradientBadge label={SOLD_OUT} />
          ) : (
            purchaseInfo?.sellInfo?.creditsAvailable ?? '0'
          )}
          {creditsTooltip && (
            <InfoTooltipWithIcon
              title={creditsTooltip}
              sx={{ ml: 1, width: 20, height: 20 }}
              outlined
            />
          )}
        </Body>
      </Box>
    </Box>
  );
};
