import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAnalytics } from 'use-analytics';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import CurrentCreditsIcon from 'web-components/lib/components/icons/CurrentCreditsIcon';
import { StickyBar } from 'web-components/lib/components/sticky-bar/StickyBar';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';

import {
  BUY_DISABLED_TOOLTIP,
  SELL_DISABLED_TOOLTIP,
} from './SellOrdersActionsBar.constants';

type Params = {
  isSellButtonDisabled: boolean;
  isBuyButtonDisabled: boolean;
  onSellButtonClick: () => void;
  onBuyButtonClick: () => void;
  onChainProjectId?: string | null;
  projectName?: string;
  onChainCreditClassId?: string;
  creditClassName?: string;
};

export const SellOrdersActionsBar = ({
  isSellButtonDisabled,
  isBuyButtonDisabled,
  onSellButtonClick,
  onBuyButtonClick,
  onChainProjectId,
  projectName,
  onChainCreditClassId,
  creditClassName,
}: Params): JSX.Element => {
  const location = useLocation();
  const { track } = useAnalytics();
  return (
    <StickyBar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <InfoTooltip
          title={isSellButtonDisabled ? SELL_DISABLED_TOOLTIP : ''}
          arrow
          placement="top"
        >
          <span>
            <OutlinedButton
              onClick={onSellButtonClick}
              disabled={isSellButtonDisabled}
              sx={{ mr: 5 }}
            >
              {'SELL'}
            </OutlinedButton>
          </span>
        </InfoTooltip>
        <InfoTooltip
          title={isBuyButtonDisabled ? BUY_DISABLED_TOOLTIP : ''}
          arrow
          placement="top"
        >
          <span>
            <ContainedButton
              startIcon={<CurrentCreditsIcon height="18px" width="18px" />}
              onClick={() => {
                // if any of the values used in event data are undefined,
                // then they are not included in the tracking data.
                // this is a feature of the track API.
                track('buy1', {
                  url: location.pathname,
                  buttonLocation: 'stickyNav',
                  projectName,
                  projectId: onChainProjectId,
                  creditClassName,
                  creditClassId: onChainCreditClassId,
                });
                onBuyButtonClick();
              }}
              disabled={isBuyButtonDisabled}
            >
              {'BUY CREDITS'}
            </ContainedButton>
          </span>
        </InfoTooltip>
      </Box>
    </StickyBar>
  );
};
