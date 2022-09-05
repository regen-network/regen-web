import { SxProps, Theme } from '@mui/material';

import { Label, LabelProps } from 'web-components/lib/components/typography';

import { DENOM_LABEL_MAPPING } from './DenomLabel.config';

export interface Props extends LabelProps {
  denom: string;
  sx?: SxProps<Theme>;
}

const DenomLabel = ({ denom, size, sx = [] }: Props): JSX.Element => {
  return (
    <Label size={size} sx={sx}>
      {DENOM_LABEL_MAPPING[denom]}
    </Label>
  );
};

export { DenomLabel };
