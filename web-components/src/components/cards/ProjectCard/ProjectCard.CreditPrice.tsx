import { Box, SxProps } from '@mui/material';

import GradientBadge from '../../../components/gradient-badge';
import InfoTooltipWithIcon from '../../../components/tooltip/InfoTooltipWithIcon';
import { Body, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import {
  AVG_PRICE_LABEL,
  CREDITS_AVAILABLE,
  ERROR_CARD_PRICE,
  ESTIMATED_ISSUANCE,
  PRICE,
  SOLD_OUT,
} from './ProjectCard.constants';
import { ProjectPrefinancing, PurchaseInfo } from './ProjectCard.types';

type Props = {
  purchaseInfo?: PurchaseInfo;
  isSoldOut?: boolean;
  priceTooltip?: string;
  creditsTooltip?: string;
  sx?: SxProps<Theme>;
  projectPrefinancing?: ProjectPrefinancing;
};

export const CreditPrice = ({
  purchaseInfo,
  priceTooltip,
  creditsTooltip,
  isSoldOut,
  projectPrefinancing,
  sx,
}: Props) => {
  const avgPricePerTonLabel = purchaseInfo?.sellInfo?.avgPricePerTonLabel;
  const isPrefinanceProject = projectPrefinancing?.isPrefinanceProject;

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
            {isPrefinanceProject ? PRICE : AVG_PRICE_LABEL}
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
              : projectPrefinancing?.price ?? '-'}
          </Body>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Subtitle
          size="xs"
          mobileSize="xxs"
          color="info.main"
          sx={{ mb: 1, fontWeight: 800, textTransform: 'uppercase' }}
        >
          {isPrefinanceProject ? ESTIMATED_ISSUANCE : CREDITS_AVAILABLE}
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
            purchaseInfo?.sellInfo?.creditsAvailable ??
            projectPrefinancing?.estimatedIssuance ??
            '0'
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
