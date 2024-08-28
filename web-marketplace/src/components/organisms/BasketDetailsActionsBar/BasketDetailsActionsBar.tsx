import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';

import { Link } from 'components/atoms';

import {
  BUY_BASKET_TOKENS,
  BUY_BASKET_TOKENS_TOOLTIP,
  BUY_BUTTON_LINK,
} from './BasketDetailsActionsBar.constants';

type Props = {
  isBuyButtonDisabled?: boolean;
  onBuyButtonClick?: () => void;
};

export const BasketDetailsActionsBar = ({
  isBuyButtonDisabled = false,
  onBuyButtonClick,
}: Props): JSX.Element => {
  const { _ } = useLingui();

  return (
    <StickyBar>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Box sx={{ mr: 5 }}>
          <InfoTooltipWithIcon title={_(BUY_BASKET_TOKENS_TOOLTIP)} outlined />
        </Box>
        <span>
          <ContainedButton
            startIcon={<CurrentCreditsIcon height="18px" width="18px" />}
            onClick={() => {
              onBuyButtonClick && onBuyButtonClick();
            }}
            href={BUY_BUTTON_LINK}
            LinkComponent={Link}
            disabled={isBuyButtonDisabled}
          >
            {_(BUY_BASKET_TOKENS)}
          </ContainedButton>
        </span>
      </Box>
    </StickyBar>
  );
};
