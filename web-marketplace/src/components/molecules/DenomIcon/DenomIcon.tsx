import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { IBC_DENOM_PREFIX } from 'utils/ibc/getDenomTrace';
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
import UsdcIcon from 'web-components/src/components/icons/coins/UsdcIcon';
import USFlagIcon from 'web-components/src/components/icons/flags/USFlagIcon';
import { RegenTokenIcon } from 'web-components/src/components/icons/RegenTokenIcon';

export interface Props {
  baseDenom?: string;
  bankDenom?: string;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  className?: string;
}

const DenomIcon = ({
  baseDenom,
  bankDenom,
  sx = [],
  iconSx,
  className = '',
}: Props): JSX.Element => {
  const ibcDenom = bankDenom?.includes(IBC_DENOM_PREFIX);

  return (
    <Box component="span" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {baseDenom === GRAVITY_USDC_DENOM && (
        <GravUsdcIcon sx={iconSx} className={className} />
      )}
      {baseDenom === AXELAR_USDC_DENOM &&
        // On mainnet, AXELAR_USDC_DENOM and USDC_DENOM baseDenom have the same value: uusd
        // so we also use the bank denom to check whether it's USDC.axl (IBC) or native USDC
        ibcDenom && <AxlUsdcIcon sx={iconSx} className={className} />}
      {baseDenom === EEUR_DENOM && (
        <EeurIcon sx={iconSx} className={className} />
      )}
      {baseDenom === REGEN_DENOM && (
        <RegenTokenIcon sx={iconSx} className={className} />
      )}
      {baseDenom === EVMOS_DENOM && (
        <EvmosIcon sx={iconSx} className={className} />
      )}
      {baseDenom === USD_DENOM && <USFlagIcon className={className} />}
      {baseDenom === USDC_DENOM && !ibcDenom && (
        <UsdcIcon className={className} />
      )}
    </Box>
  );
};

export { DenomIcon };
