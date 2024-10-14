import { SvgIconProps } from '@mui/material/SvgIcon';

export interface RegionPaths {
  PACIFIC: string;
  ORINOCO: string;
  CARIBBEAN: string;
  AMAZON: string;
  ANDEAN: string;
}

export type Region = 'PACIFIC' | 'ORINOCO' | 'CARIBBEAN' | 'AMAZON' | 'ANDEAN';

export interface RegionIndicatorIconProps extends SvgIconProps {
  region: Region;
  isSelected?: boolean;
  className?: string;
}
