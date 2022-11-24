import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import {
  AXELAR_USDC_DENOM,
  EEUR_DENOM,
  GRAVITY_USDC_DENOM,
  REGEN_DENOM,
} from 'config/allowedBaseDenoms';

import AxlUsdcIcon from 'web-components/lib/components/icons/coins/AxlUsdcIcon';
import EeurIcon from 'web-components/lib/components/icons/coins/EeurIcon';
import GravUsdcIcon from 'web-components/lib/components/icons/coins/GravUsdcIcon';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';

export interface Props {
  denom?: string;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}

const DenomIcon = ({ denom, sx = [], iconSx }: Props): JSX.Element => {
  return (
    <Box component="span" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {denom === GRAVITY_USDC_DENOM && <GravUsdcIcon sx={iconSx} />}
      {denom === AXELAR_USDC_DENOM && <AxlUsdcIcon sx={iconSx} />}
      {denom === EEUR_DENOM && <EeurIcon sx={iconSx} />}
      {denom === REGEN_DENOM && <RegenTokenIcon sx={iconSx} />}
    </Box>
  );
};

export { DenomIcon };
