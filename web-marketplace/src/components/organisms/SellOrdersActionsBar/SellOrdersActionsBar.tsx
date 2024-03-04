import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Buy1Event } from 'web-marketplace/src/lib/tracker/types';
import { useTracker } from 'web-marketplace/src/lib/tracker/useTracker';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import {
  AVG_PRICE_LABEL,
  PREFINANCE_BUTTON,
  PRICE,
} from 'web-components/src/components/cards/ProjectCard/ProjectCard.constants';
import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Label, Subtitle } from 'web-components/src/components/typography';

import {
  BOOK_CALL,
  BUY_DISABLED_TOOLTIP,
} from './SellOrdersActionsBar.constants';

type Params = {
  isBuyButtonDisabled: boolean;
  isCommunityCredit: boolean;
  onBookCallButtonClick: () => void;
  onBuyButtonClick: () => void;
  onChainProjectId?: string | null;
  projectName?: string;
  onChainCreditClassId?: string;
  creditClassName?: string;
  avgPricePerTonLabel?: string;
  avgPricePerTonTooltip?: string;
  isPrefinanceProject?: boolean | null;
  prefinancePrice?: string;
  children?: ReactNode;
};

export const SellOrdersActionsBar = ({
  isBuyButtonDisabled,
  isCommunityCredit,
  onBookCallButtonClick,
  onBuyButtonClick,
  onChainProjectId,
  projectName,
  onChainCreditClassId,
  creditClassName,
  avgPricePerTonLabel,
  avgPricePerTonTooltip,
  isPrefinanceProject,
  prefinancePrice,
  children,
}: Params): JSX.Element => {
  const location = useLocation();
  const { track } = useTracker();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StickyBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        {(prefinancePrice || (avgPricePerTonLabel && !!onChainProjectId)) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              mr: { xs: 2, sm: 5 },
              py: { xs: 1, sm: 1.25 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Label size="xs" sx={{ color: 'info.main', mr: 1 }}>
                {isPrefinanceProject ? PRICE : AVG_PRICE_LABEL}
              </Label>
              {!isPrefinanceProject && (
                <InfoTooltipWithIcon
                  title={avgPricePerTonTooltip}
                  outlined
                  sx={{ width: 18, height: 18 }}
                />
              )}
            </Box>
            <Subtitle>{prefinancePrice ?? avgPricePerTonLabel}</Subtitle>
          </Box>
        )}
        {(!isCommunityCredit || !onChainProjectId) && (
          <OutlinedButton
            onClick={onBookCallButtonClick}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              mr: { xs: 2, sm: 5 },
              display: {
                xs: isPrefinanceProject ? 'none' : 'block',
                sm: 'block',
              },
            }}
            className={isPrefinanceProject ? PREFINANCE_BUTTON.className : ''}
          >
            {BOOK_CALL}
          </OutlinedButton>
        )}
        {(!!onChainProjectId || !!onChainCreditClassId) && (
          <InfoTooltip
            title={isBuyButtonDisabled ? BUY_DISABLED_TOOLTIP : ''}
            arrow
            placement="top"
          >
            <span>
              <ContainedButton
                startIcon={<CurrentCreditsIcon height="18px" width="18px" />}
                onClick={() => {
                  track<Buy1Event>('buy1', {
                    url: location.pathname,
                    buttonLocation: 'stickyNav',
                    projectName,
                    projectId: onChainProjectId,
                    creditClassId: onChainCreditClassId,
                    creditClassName,
                  });
                  onBuyButtonClick();
                }}
                disabled={isBuyButtonDisabled}
                sx={{ height: '100%' }}
              >
                {isMobile ? 'BUY' : 'BUY CREDITS'}
              </ContainedButton>
            </span>
          </InfoTooltip>
        )}
        {children}
      </Box>
    </StickyBar>
  );
};
