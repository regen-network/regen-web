import { Box, SxProps, Theme } from '@mui/material';

import AxlUsdcIcon from 'web-components/lib/components/icons/coins/AxlUsdcIcon';
import EeurIcon from 'web-components/lib/components/icons/coins/EeurIcon';
import GravUsdcIcon from 'web-components/lib/components/icons/coins/GravUsdcIcon';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';

export interface Props {
  denom: string;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}

const DenomIcon = ({ denom, sx = [], iconSx = [] }: Props): JSX.Element => {
  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {denom === 'ugusdc' && <GravUsdcIcon sx={iconSx} />}
      {denom === 'uaxlusdc' && <AxlUsdcIcon sx={iconSx} />}
      {denom === 'ueeur' && <EeurIcon sx={iconSx} />}
      {denom === 'uregen' && <RegenTokenIcon sx={iconSx} />}
    </Box>
  );
};

export { DenomIcon };
