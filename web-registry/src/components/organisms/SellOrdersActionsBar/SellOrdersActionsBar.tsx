import { Box } from '@mui/material';

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
};

export const SellOrdersActionsBar = ({
  isSellButtonDisabled,
  isBuyButtonDisabled,
  onSellButtonClick,
  onBuyButtonClick,
}: Params): JSX.Element => (
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
            onClick={onBuyButtonClick}
            disabled={isBuyButtonDisabled}
          >
            {'BUY CREDITS'}
          </ContainedButton>
        </span>
      </InfoTooltip>
    </Box>
  </StickyBar>
);
