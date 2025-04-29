import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

import { getFormattedNumber } from 'src/utils/format';

import GradientBadge from '../../../components/gradient-badge';
import InfoTooltipWithIcon from '../../../components/tooltip/InfoTooltipWithIcon';
import { Body, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import {
  ProjectCardBodyTextsMapping,
  ProjectPrefinancing,
  PurchaseInfo,
} from './ProjectCard.types';

type Props = {
  purchaseInfo?: PurchaseInfo;
  isSoldOut?: boolean;
  priceTooltip?: string;
  creditsTooltip?: string;
  sx?: SxProps<Theme>;
  projectPrefinancing?: ProjectPrefinancing;
  bodyTexts: ProjectCardBodyTextsMapping;
  creditsChildren?: ReactNode;
};

export const CreditPrice = ({
  purchaseInfo,
  priceTooltip,
  creditsTooltip,
  isSoldOut,
  projectPrefinancing,
  bodyTexts,
  creditsChildren,
  sx,
}: Props) => {
  const avgPricePerTonLabel = purchaseInfo?.sellInfo?.avgPricePerTonLabel;
  const isPrefinanceProject = projectPrefinancing?.isPrefinanceProject;
  const creditsAvailable =
    purchaseInfo?.sellInfo?.creditsAvailable ??
    projectPrefinancing?.estimatedIssuance ??
    '0';

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
      {!creditsChildren && (
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
              {isPrefinanceProject ? bodyTexts.price : bodyTexts.avgPriceLabel}
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
                ? avgPricePerTonLabel ?? bodyTexts.errorCardPrice
                : projectPrefinancing?.price ?? '-'}
            </Body>
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, height: 20 }}>
          <Subtitle
            size="xs"
            mobileSize="xxs"
            color="info.main"
            sx={{
              mr: isPrefinanceProject ? 1 : 0,
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {isPrefinanceProject
              ? bodyTexts.estimatedIssuance
              : bodyTexts.creditsAvailable}
          </Subtitle>
          {isPrefinanceProject && (
            <InfoTooltipWithIcon
              title={bodyTexts.estimatedIssuanceTooltip}
              sx={{ width: 20, height: 20 }}
              outlined
            />
          )}
        </Box>
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
          {isSoldOut && !isPrefinanceProject ? (
            <GradientBadge
              className="text-sc-button-text-icon-dark"
              label={bodyTexts.soldOut}
              variant={'green'}
            />
          ) : (
            <>
              {creditsChildren
                ? creditsChildren
                : getFormattedNumber(
                    typeof creditsAvailable === 'string'
                      ? parseFloat(creditsAvailable)
                      : creditsAvailable,
                  )}
              {isSoldOut && (
                <GradientBadge
                  className="ml-5"
                  label={bodyTexts.soldOut}
                  variant="green"
                />
              )}
            </>
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
