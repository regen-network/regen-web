import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import {
  AXELAR_USDC_DENOM,
  EEUR_DENOM,
  EVMOS_DENOM,
  GRAVITY_USDC_DENOM,
  REGEN_DENOM,
} from 'config/allowedBaseDenoms';

import AxlUsdcIcon from 'web-components/src/components/icons/coins/AxlUsdcIcon';
import EeurIcon from 'web-components/src/components/icons/coins/EeurIcon';
import EvmosIcon from 'web-components/src/components/icons/coins/EvmosIcon';
import GravUsdcIcon from 'web-components/src/components/icons/coins/GravUsdcIcon';
import { RegenTokenIcon } from 'web-components/src/components/icons/RegenTokenIcon';

export interface Props {
  baseDenom?: string;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}

const DenomIcon = ({ baseDenom, sx = [], iconSx }: Props): JSX.Element => {
  return (
    <Box component="span" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {baseDenom === GRAVITY_USDC_DENOM && <GravUsdcIcon sx={iconSx} />}
      {baseDenom === AXELAR_USDC_DENOM && <AxlUsdcIcon sx={iconSx} />}
      {baseDenom === EEUR_DENOM && <EeurIcon sx={iconSx} />}
      {baseDenom === REGEN_DENOM && <RegenTokenIcon sx={iconSx} />}
      {baseDenom === EVMOS_DENOM && <EvmosIcon sx={iconSx} />}
    </Box>
  );
};

export { DenomIcon };
