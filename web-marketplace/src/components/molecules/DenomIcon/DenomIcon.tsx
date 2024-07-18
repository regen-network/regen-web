import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import {
  AXELAR_USDC_DENOM,
  EEUR_DENOM,
  EVMOS_DENOM,
  GRAVITY_USDC_DENOM,
  REGEN_DENOM,
  USD_DENOM,
  USDC_DENOM,
} from 'web-marketplace/src/config/allowedBaseDenoms';

import AxlUsdcIcon from 'web-components/src/components/icons/coins/AxlUsdcIcon';
import EeurIcon from 'web-components/src/components/icons/coins/EeurIcon';
import EvmosIcon from 'web-components/src/components/icons/coins/EvmosIcon';
import GravUsdcIcon from 'web-components/src/components/icons/coins/GravUsdcIcon';
import USFlagIcon from 'web-components/src/components/icons/flags/USFlagIcon';
import { RegenTokenIcon } from 'web-components/src/components/icons/RegenTokenIcon';

export interface Props {
  baseDenom?: string;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  className?: string;
}

const DenomIcon = ({
  baseDenom,
  sx = [],
  iconSx,
  className = '',
}: Props): JSX.Element => {
  return (
    <Box component="span" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {baseDenom === GRAVITY_USDC_DENOM && (
        <GravUsdcIcon sx={iconSx} className={className} />
      )}
      {baseDenom === AXELAR_USDC_DENOM && (
        <AxlUsdcIcon sx={iconSx} className={className} />
      )}
      {baseDenom === EEUR_DENOM && (
        <EeurIcon sx={iconSx} className={className} />
      )}
      {baseDenom === REGEN_DENOM && (
        <RegenTokenIcon sx={iconSx} className={className} />
      )}
      {baseDenom === EVMOS_DENOM && (
        <EvmosIcon sx={iconSx} className={className} />
      )}
      {/* TO-DO clarify whether these below are denoms or we should 
          create a separate collection of icons for them */}
      {baseDenom === USD_DENOM && <USFlagIcon className={className} />}
      {/* If this one belongs here merge with GRAVITY_USDC_DENOM above */}
      {baseDenom === USDC_DENOM && (
        <GravUsdcIcon sx={iconSx} className={className} />
      )}
    </Box>
  );
};

export { DenomIcon };
