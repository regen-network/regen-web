import {
  AXELAR_USDC_DENOM,
  EEUR_DENOM,
  GRAVITY_USDC_DENOM,
  REGEN_DENOM,
} from 'config/allowedDenoms';

export const DENOM_LABEL_MAPPING: Record<string, string> = {
  [GRAVITY_USDC_DENOM]: 'gravUSDC',
  [AXELAR_USDC_DENOM]: 'axlUSDC',
  [EEUR_DENOM]: 'EEUR',
  [REGEN_DENOM]: 'REGEN',
};
